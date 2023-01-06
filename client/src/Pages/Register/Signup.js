import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css";
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../Component/Images/logo.png"
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Signup() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const [ username, setUsername ]= useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [ file, setFile ] = useState(null);
  // console.log(user.user.Status)
  const userDetails = user.user
  
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    // Stockage des images ou vidéos sur Firebase
    const uploadTask = uploadBytesResumable(StorageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signup(dispatch, {email, password, username, profile: downloadURL});
          alert("Votre profile a bien été créer, veuillez vous connecter !")
          // window.location.reload(true)
          // window.localStorage.clear();
          navigate("/login",  {replace: true})
        })
        });
  }
  
  // console.log(userDetails?.Status)
  // navigate("/login")
  return (
    <div className="mainContainerForSignup">
      <div className="submainContainer">
        <div className="loginLeft">
          {/* <p className="logoText">Groupomania</p> */}
          <img src={logo} alt="logo Groupomania"/>
          <p className="introText">Rester connecté avec vos collaborateurs partout dans le monde !</p>
        </div>
        <div className="loginRight">
          <p className="createAccountText2" >Créer un nouveau compte</p>
          <input type="file" name="file" id="file"  onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" placeholder="Pseudo" className="inputText" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="email" name="" id="" onChange={(e) => setEmail(e.target.value)} className="inputText" />
          <input type="password" placeholder="Mot de passe" name="" id="" onChange={(e) => setPassword(e.target.value)} className="inputText" />
          <button className="btnForSignup" onClick={handleClick}>S'enregistrer</button>
          <Link to={"/login"} style={{ textDecoration:"none" }}>
            <p>Vous avez déjà un compte</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
