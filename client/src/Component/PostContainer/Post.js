import React, { useEffect, useState } from 'react';
import "./post.css";
import ProfileImage from "../Images/random-user.png"
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import editicon from "../Images/editicon.svg"
import anotherlikeicon from "../Images/setLike.png";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Post({ post }) {

  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user

  // On récupère les informations des autres users(image,title...)
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${post.user}`)
        setUser(res.data);
        console.log("ressssssssdataaaa", res.data)
      } catch (error) {
        console.log("Une erreur est survenue !")
      }
    }
    getUser();
  }, [post.user])

  const userId = users.others._id;
  let isAdmin = users.others.isAdmin;
  let postId = post.id
  let posterId = post.user;

  // Boutton edit apparait si admin ou celui qui a posté
  let displayButtons = false;
  if (posterId === userId || isAdmin) {
    displayButtons = true;
  }

  const accessToken = users.accessToken;
  const [Like, setLike] = useState([post.like.includes(userId) ? anotherlikeicon : LikeIcon]);

  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [show, setShow] = useState(false);

  // Ajouter ou enlever son like au click
  const handleLike = async () => {
    if (Like === LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/Json",
          token: accessToken
        }
      })
      setCount((count) => count + 1);
      setLike(anotherlikeicon);


    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/Json",
          token: accessToken
        }
      })
      setLike(LikeIcon);
      setCount((count) => count - 1);
    }
  };

  // Ajouter un commentaire
  const addComment = async () => {
    const comment = {
      "postid": `${post._id}`,
      "username": `${users.others.username}`,
      "comment": `${commentWriting}`,
      "profile": `${users.others?.profile}`
    }
    await fetch(`http://localhost:5000/api/post/comment/post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/Json",
        token: accessToken
      },
      body: JSON.stringify(comment)
    })
    setComments(Comments.concat(comment));
  };

  const handleComment = () => {
    addComment();
  }

  // Câcher ou montrer les commentaires au click sur icone commentaires
  const handleShow = () => {
    if (show === false) {
      setShow(true)

    } else {
      setShow(false)
    }
  }

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">

        <div>
          {/* Image de profil du poster */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${user.profile}`} className="PostImage" alt="" />

            <div>
              {/* Nom du poster */}
              <p style={{ marginLeft: "5px", textAlign: "start" }}>{user.username}</p>
              <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 5, marginTop: -13, color: "#aaa" }}>{`${user.username}`}</p>
            </div>

            {/* <img src={`${Moreoption}`} className="moreIcons" alt="" /> */}
          </div>
          {/* Image de profil du user qui a mis un commentaire  */}
          <p style={{ textAlign: "start", width: "96%", marginLeft: 10, marginTop: 0 }}>{post.title}</p>
          {post.image !== '' ?
            <img src={`${post.image}`} className="PostImages" alt="" /> : post.video !== ''
              ? <video className="PostImages" width="500" height="350" controls><source src={`${post.video}`} type="video/mp4" /></video>
              : ''
          }
          {/* Post footer:like/comments */}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img src={`${Like}`} className="iconsForPost" onClick={handleLike} alt='' />
                <p style={{ marginLeft: "6px" }}>{count} Like(s)</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
                <img src={`${CommentIcon}`} className="iconsForPost" onClick={handleShow} alt='' />
                <p style={{ marginLeft: "6px" }}>{Comments.length} Comments</p>
              </div>
            </div>
            {/* Bouton Edit */}
            <div className="editIcon" title="Modifier">
              {displayButtons &&
                <Link to={"/update/post/" + post._id} state={{ postId: postId }} >
                  <img className="iconsForPost" src={editicon} alt="edit" />
                </Link>
              }
            </div>
          </div>

          {/* Ajouter un commentaire sous le post */}
          {show === true ?
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`${users.others.profile}`} className="PostImage" alt="" />
                <input type="text" className="commentInput" placeholder="Ajouter un commentaire ?" onChange={(e) => setCommentWriting(e.target.value)} />
                <button className="addCommentbtn" onClick={handleComment}>Post</button>
              </div>
              {Comments.map((item) => (
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={`${item.profile}`} className="PostImage" alt="" />
                    <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>{item.username}</p>
                  </div>
                  <p style={{ marginLeft: "54px", textAlign: "start", marginTop: -16 }}>{item.comment}</p>
                  <p style={{ marginLeft: "54px", textAlign: "start", marginTop: -10, color: "#aaa", fontSize: 11 }}>Répondre</p>
                </div>
              ))}
            </div> : ""
          }
        </div>
      </div>
    </div>
  )
}
