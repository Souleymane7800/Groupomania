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
  // console.log(user.user.Status)
  const userDetails = user.user;

  //const defaultAvatarUrl = 'https://firebasestorage.googleapis.com/v0/b/groupomania-8bf54.appspot.com/o/profile%2Fprofile.png?alt=media&token=44345d90-e68b-4daf-bc71-8d1873b0d86d';
  // ===============25.02.23============================================================
  // const [imageUrl, setImageUrl] = useState("")
  // console.log("FILEEEEEEEEEEEEEE", file)
  // const handleClick = (e) => {
  //   console.log("on entre dans le handleckick")
  //   const storage = getStorage(app);

  //   let fileName =  new Date().getTime() + file?.name;
  //   const StorageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(StorageRef, fileName);
  //   // const uploadTask = storage.ref(`avatar/${file.name}`).put(file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progressPourcentage = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       console.log(progressPourcentage)
  //     },
  //     (err) => {
  //       console.log(err.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       signup(dispatch, {email, password, username, profile: downloadURL});
  //       console.log('File available at', downloadURL);
  //       navigate('/login')
  //     })
  //   }
  //   )

  // }
  
  // ===================================================================================
  // const handleClick = (e) => {
  //   const storage = getStorage(app);
  //   const StorageRef = ref(storage, '/profile/profile.png');
  //   const fileRef = StorageRef.child(file.name);
  //   fileRef.put(file).then(() => {
  //     console.log("File uploaded successfully");
  //   });
  //     //   // Stockage des images ou vidéos sur Firebase
  // //   const uploadTask = uploadBytesResumable(StorageRef, file);
  // }

  // const handleClick = (e) => {
  // //     // TODO: faire apparaitre imageProfil
  // //     // if (file !== null) {
  // //     //   setFile()
  // //     // }
  // //     // Prendre en compte imageProfil
  // const storage = getStorage(app);
  // const StorageRef = ref(storage, '/profile/profile.png')
  // const uploadTask = uploadBytesResumable(StorageRef, file, 'profile.png');

  // // Register three observers:
  // // 1. 'state_changed' observer, called any time the state changes
  // // 2. Error observer, called on failure
  // // 3. Completion observer, called on successful completion
  // uploadTask.on('state_changed', 
  //   (snapshot) => {
  //     // Observe state change events such as progress, pause, and resume
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case 'paused':
  //         console.log('Upload is paused');
  //         break;
  //       case 'running':
  //         console.log('Upload is running');
  //         break;
  //       default:
  //     }
  //   }, 
  //   (error) => {
  //     // Handle unsuccessful uploads
  //     console.log("ERRRORFIREBASE", error)
  //   }, 
  //   () => {
  //     // Handle successful uploads on complete
  //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       signup(dispatch, {email, password, username, profile: downloadURL});
  //       console.log('File available at', downloadURL);
  //     });
  //   }
  // );
  

  // }
  
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // const image = '../../../../api/images/profile.png'
  //   //   console.log('IMAGEDEFAULT', image)
  //   let fileName =  new Date().getTime() + file?.name;
  //     console.log("FILENAME11111111111", fileName)
  //   if(isNaN(fileName)) {
  //     console.log('on entre dans le if')
  //     fileName = new Date().getTime() + file?.name
  //     console.log("FILENAMEAVATAR", fileName)

  //     const storage = getStorage(app);
  //   const StorageRef = ref(storage, fileName);
  //   console.log("STORAGEREF", StorageRef)
  //     // Stockage des images ou vidéos sur Firebase
  //   const uploadTask = uploadBytesResumable(StorageRef, fileName);

  //   uploadTask.on('state_changed',
  //   (snapshot) => {
  //     // Observe state change events such as progress, pause, and resume
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case 'paused':
  //         console.log('Upload is paused');
  //         break;
  //       case 'running':
  //         console.log('Upload is running');
  //         break;
  //       default:
  //     }
  //   },
  //   (error) => {
  //     // Handle unsuccessful uploads
  //   },
  //   () => {
  //     // Handle successful uploads on complete
  //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       signup(dispatch, {email, password, username, profile: downloadURL });
  //       alert("Votre profile a bien été créer, veuillez vous connecter !")
  //       navigate("/login",  {replace: true})
  //     })
  //     });
  //     // navigate("/login")
  //   }

    // =================================================================
    // const storage = getStorage(app);
    // const StorageRef = ref(storage, fileName);

    // // Stockage des images ou vidéos sur Firebase
    // const uploadTask = uploadBytesResumable(StorageRef, fileName);

    // uploadTask.on('state_changed',
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       signup(dispatch, {email, password, username, profile: downloadURL });
    //       alert("Votre profile a bien été créer, veuillez vous connecter !")
    //       navigate("/login",  {replace: true})
    //     })
    //     });
        // navigate("/login")
  // }

  const handleClick = (e)=>{
    e.preventDefault();
    if (file === null) {

      const fileName = new Date().getTime() + file?.name;
      console.log('FILENAME111111111', fileName)
      console.log("AVATAR", Avatar)
      const storage = getStorage(app);
      const StorageRef = ref(storage , fileName);
      console.log('STORAGEREF', StorageRef)
      
      const uploadTask = uploadBytesResumable(StorageRef, file || Avatar);
      console.log('UPLOADTASK', uploadTask)
      
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
              })
            });
          } else {
            signup(dispatch ,{email , password , username , profile: Avatar});
          }

  }
  
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
          <label className='imageDefault' style={{ width: "50%", display: "flex"}}>Image de profil
            {file !== Avatar ? (
              <img src={URL.createObjectURL(file)} alt="avatar" />
            ) : (
              <img src={Avatar} alt="avatar par default" />
              )}
              <input className="inputText" src={`${Avatar}`} type="file" name="file" id="file" style={{ display: "none", width:'15px', height:'15px'}}
              onChange={(e) => [setFile(e.target.files[0]), setImagePrev(URL.createObjectURL(e.target.files[0]))]}
               />
              {/* <input type="file" onChange={(e) => [setFile(e.target.files[0]), setImagePrev(URL.createObjectURL(e.target.files[0]))]} /> */}
            {/* {imagePrev !== null ? <img src={imagePrev}  alt="" /> : avatar !== null ? <img src={defaultAvatarUrl} alt='avatar'/> : '' }
            <input className="inputText" src={`${defaultAvatarUrl}`} type="file" name="file" id="file" style={{ display: "none", width:'15px', height:'15px'}}
              onChange={(e) => [setFile(e.target.files[0]), setImagePrev(URL.createObjectURL(e.target.files[0]))]}
            /> */}
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
