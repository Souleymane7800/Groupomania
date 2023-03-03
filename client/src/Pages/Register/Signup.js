import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css";
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../Component/Images/logo.png"
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  Avatar  from "../../Component/Images/profile.png";//test

export default function Signup() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const [ username, setUsername ]= useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [ file, setFile ] = useState(Avatar);
  const [ imagePrev, setImagePrev ] = useState(null);
  const userDetails = user.user;

    const handleClick = (e)=>{
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;

    if (file !== null && !isNaN(fileName)) {

      const storage = getStorage(app);
      const StorageRef = ref(storage , fileName,);
      
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
                break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                signup(dispatch ,{email , password , username , profile:downloadURL});
                alert("Votre profile a bien été créer, veuillez vous connecter !")
                navigate("/login",  {replace: true})
              })
            });
          } else {
            signup(dispatch ,{email , password , username , profile: Avatar});
            alert("Votre profile a bien été créer, veuillez vous connecter !")
            navigate("/login",  {replace: true})
          }

  }
  
  return (
    <div className="mainContainerForSignup">
      <div className="submainContainer">
        <div className="loginLeft">
          <img src={logo} alt="logo Groupomania"/>
          <p className="introText">Rester connecté avec vos collaborateurs partout dans le monde !</p>
        </div>
        <div className="loginRight">
          <p className="createAccountText2" >Créer un nouveau compte</p>
          <label className='imageDefault' style={{ width: "50%", display: "flex"}}>Image de profil
            {file !== Avatar ? (
              <img src={URL.createObjectURL(file)} alt="avatar" />
            ) : (
              <img src={Avatar} alt="avatar par default" />
              )}
              <input className="inputText" src={`${Avatar}`} type="file" name="file" id="file" style={{ display: "none", width:'15px', height:'15px'}}
              onChange={(e) => [setFile(e.target.files[0]), setImagePrev(URL.createObjectURL(e.target.files[0]))]}
               />
          </label>
          <input type="text" placeholder="Pseudo" className="inputText" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="email" name="" id="" onChange={(e) => setEmail(e.target.value)} className="inputText" />
          <input type="password" placeholder="Mot de passe" name="" id="" onChange={(e) => setPassword(e.target.value)} className="inputText" />
          <button className="btnForSignup" onClick={handleClick}>S'enregistrer</button>
          <Link to={"/login"} style={{ textDecoration:"none" }}>
            <p style={{ color: "red"}}>Vous avez déjà un compte ?</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
