import React, { useEffect, useState } from 'react';
import "./post.css";
import ProfileImage from "../Images/random-user.png"
import CommentIcon from "../Images/speech-bubble.png";
import Moreoption from "../Images/more.png";
import axios from 'axios';



export default function Post({detail}) {
  console.log(detail);
  
  const [ Comments, setComments ] = useState([]);
  const [ commentWriting, setCommentWriting ] = useState("");
  const [ show, setShow ] = useState(false);

  const [ user, setUser ] = useState([]);
  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${detail.user}`)
        setUser(res.data);
      } catch (error) {
        console.log("Une erreur est survenue !")
      }
    }
    getUser();
  }, [detail.user])

  console.log(user);

  const addComment = () => {
    const comment = {
      "id":`${user.Following.id}`,
      "username":`${user.username}`,
      "title":`${commentWriting}`
    }
    setComments(Comments.concat(comment));
  };

  const handleComment = () => {
    addComment();
  }

  console.log(Comments)
  // Câcher ou montrer les commentaires au click sur commentaires
  const handleShow = () => {
    if(show === false){
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${user.profile}`} className="PostImage" alt="" /> 
            <div>
              <p style={{ marginLeft: "5px", textAlign: "start" }}>{user.username}</p>
              {/* <p style={{ fontSize: "11px", textAlign: "start", marginLeft:5, marginTop:-13, color: "#aaa" }}>{user.username}</p> */}
            </div>
            <img src={`${Moreoption}`} className="moreIcons" alt="" />
          </div>
          <p style={{ textAlign: "start", width: "96%", marginLeft:10, marginTop:0 }}>{detail.title}</p>
          <img src={`${detail.image}`} className="PostImages" alt="" />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                {/* <img src={`${Like}`} className="iconsForPost" onClick={handleLike} alt='' /> */}
                <p style={{ marginLeft: "6px" }}>{detail.like.length} Likes</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft:20, cursor: "pointer" }}>
                <img src={`${CommentIcon}`} className="iconsForPost" onClick={handleShow} alt='' />
                <p style={{ marginLeft: "6px" }}>{detail.comments.length} Comments</p>
              </div>
            </div>
            {/* <div style={{ display: "flex", alignItems: "center", marginLeft:200, cursor: "pointer" }}>
                <img src={`${ShareIcon}`} className="iconsForPost" alt='' />
                <p style={{ marginLeft: "6px" }}>Partager</p>
              </div> */}
          </div>
          {show === true ?
          <div style={{ padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${ProfileImage}`} className="PostImage" alt="" />
              <input type="text" className="commentInput" placeholder="Ajouter un commentaire ?" onChange={(e) => setCommentWriting(e.target.value)} />
              <button className="addCommentbtn" onClick={handleComment}>Post</button>
            </div>
            {Comments.map((item) => (
              <div style={{ alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={`${ProfileImage}`} className="PostImage" alt="" />
                  <p style={{ marginLeft: "6px", fontSize:18, marginTop:6 }}>{item.username}</p>
                </div>
                <p style={{ marginLeft: "54px", textAlign: "start", marginTop:-16 }}>{item.title}</p>
                <p style={{ marginLeft: "54px", textAlign: "start", marginTop:-10, color:"#aaa", fontSize:11 }}>Répondre</p>
              </div>

            ))}
          </div>:""
           }
        </div>
      </div>
    </div>
  )
}
