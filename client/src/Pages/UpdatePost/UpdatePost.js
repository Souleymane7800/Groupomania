// import axios from 'axios';
import "./updatePost.css"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imageIcon from "../../Component/Images/gallery.png";
import emojiIcon from "../../Component/Images/cat-face.png";
import VideoIcon from "../../Component/Images/video.png";


function UpdatePost() {
      
      let {id} = useParams();
      const userDetails = useSelector((state) => state.user);
      let user = userDetails?.user;
      const accessToken = user.accessToken;
      let navigate = useNavigate();
      const [ currentPost, setCurrentPost ] = useState([]);
      const [ currentTitle, setCurrentTitle ] = useState([]);
      const [ currentImage, setCurrentImage ] = useState([]);
      const [ currentVideo, setCurrentVideo ] = useState([]);
        // Prévisualisation image et video
      const [ imagePrev, setImagePrev ] = useState(null);
      const [ videoPrev, setVideoPrev ] = useState(null);


      useEffect(() => {
            async function fetchPost(){
                  try {
                        const response = await fetch(`http://localhost:5000/api/post/${id}`, {
                              method:'GET',
                              headers:{
                                    "Content-Type": "application/JSON",
                                    token:accessToken
                              },
                        })
                        const currentPost = await response.json()
                        setCurrentPost(currentPost)
                        console.log("Curenntpostttttttttttttttt",currentPost) //test
                        setCurrentTitle(currentPost.title)
                        setCurrentImage(currentPost.image)
                        setCurrentVideo(currentPost.video)
                  } catch (error) {
                        console.log( error)
                  }
            }
            fetchPost();
      }, [id, accessToken]);

      const changeTitle = e => {
            setCurrentTitle(e.target.value);
      }

      const changeImage = e => {
            setCurrentImage(e.target.value);
      }

      // Mise à jour d'un post
      const editPost = (e) => {
            e.preventDefault();
            if(currentImage !== null){
            const fileName = new Date().getTime() + currentImage?.name;
            const storage = getStorage(app);
            const StorageRef = ref(storage, fileName);
        
            // Stockage des images ou vidéos sur Firebase
            const uploadTask = uploadBytesResumable(StorageRef, currentImage);
        
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
                    // nothing
                }
              },
              (error) => {
                // Handle unsuccessful uploads
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  fetch(`http://localhost:5000/api/post/update/post/${id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/JSON",
                            token: accessToken
                          },
                          body:JSON.stringify({title:currentTitle, image: downloadURL, video:''})
                        })
                        .then((data) => {
                          if (window.confirm("Vous-vous vraiment modifier votre post ?")){
                            navigate("/")
                          }
                        })
                });
              }
            );} else if(currentVideo !== null){
                  const fileName = new Date().getTime() + currentVideo?.name;
                  const storage = getStorage(app);
                  const StorageRef = ref(storage, fileName);
              
                  // Stockage des images ou vidéos sur Firebase
                  const uploadTask = uploadBytesResumable(StorageRef, currentVideo);
              
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
                            // nothing
                      }
                    },
                    (error) => {
                      // Handle unsuccessful uploads
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        fetch(`http://localhost:5000/api/post/update/post/${id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/JSON",
                            token: accessToken
                          },
                          body:JSON.stringify({title:currentTitle, video: downloadURL,image: ''})
                        })
                        .then((data) => {
                          if (window.confirm("Vous-vous vraiment modifier votre post ?")){
                            navigate("/")
                          }
                        })
                      });
                    }
                  );
                } else {
                  fetch(`http://localhost:5000/api/post/update/post/${id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/JSON",
                            token: accessToken
                          },
                          body:JSON.stringify({title:currentTitle, video:'', image:''})
                        })
                        .then((data) => {
                          if (window.confirm("Vous-vous vraiment modifier votre post ?")){
                            navigate("/")
                          }
                        })
                }
      }

    // Supprimer un post
      async function deletePost() {
          // if (posterId === userId ){
            try {
              let res = await fetch(`http://localhost:5000/api/post/delete/post/${id}`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  token: accessToken
                },
                // body:
                // JSON.stringify({title:currentTitle, video:currentVideo, image:currentImage}),
              })

              await res.json()

            } catch (error) {
              console.log(error)
            }
            if (window.confirm("Vous-vous vraiment supprimer votre post ?")){
              navigate("/")
            }
      }

      return (
        <>
            <form className="update-form" onSubmit={editPost} >
            <div className="updateContainer">
                  <h2>Modifier votre post</h2>
                  <textarea type="text" 
                  placeholder={currentTitle} onChange={changeTitle}
                  />
                  <div style={{ marginLeft: "10px" }}></div>
                  {currentVideo || videoPrev || imagePrev || currentImage !== null ? 
                        <img src={`${imagePrev || currentImage}`} onChange={changeImage} className="PostImages" alt="" /> : videoPrev || currentVideo !== null  
                        ? <video className="PostImages" width="500" height="350" controls><source src={`${videoPrev || currentVideo}`} type="video/mp4"/></video> 
                        : ''
                  }
                    {/* <img src={`${currentImage}`} className="PostImages" onChange={changeImage} style={{width:"250px", height:"200px"}} alt='' /> */}
                    {/* <img src={`${user?.others?.profile}`} className="profileImage" alt='' /> */}
                    <div>
            
            <label htmlFor="file">
              <img src={`${imageIcon}`} className="icons" alt="" />
              <input type="file" name="file" id="file" style={{ display: "none"}} 
               accept=".png,.jpeg,.jpg" 
               onChange={(e) => [setCurrentImage(e.target.files[0]), setImagePrev(URL.createObjectURL(e.target.files[0]))]} 
              //  onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
              <img src={`${emojiIcon}`} className="icons" alt="" />
            <label htmlFor="file2">
            <img src={`${VideoIcon}`} className="icons" alt="" />
              <input type="file" name="file2" id="file2" style={{ display: "none"}} 
              //  accept=".png,.jpeg,.jpg" 
               onChange={(e) => [setCurrentVideo(e.target.files[0]), setVideoPrev(URL.createObjectURL(e.target.files[0]))]} 
              />
            </label>
          </div>
                    <div className="update-btn">
                        <div>
                         <button className="validate-btn" type="submit" >Modifier post</button>
                        </div>
                        <div>
                              <button className="delete-btn" onClick={deletePost}>Supprimer post</button>
                        </div>
                  </div>
            </div>
            </form>
                        </>
  
          )
}

export default UpdatePost

