import React, { useEffect, useState } from 'react';
import "./profileMainPost.css";
import paysage from "../Images/paysage.jpg";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from '../ProfilePostContainer/Post';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function ProfileMainPost() {

  const [ post, setPost ] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
        setPost(res.data);
      } catch (error) {
        console.log("Une erreur est survenue !")
      }
    }
    getPost();
  }, [id]);

  return (
    <div className="ProfileMainPostContainer">
      <div>
        <img src={`${paysage}`} className="profileCoverImage" alt='' />
        <h2 style={{ marginTop:-43, color: "white", textAlign: "start", marginLeft: "40px" }}>Votre profil</h2>
      </div>
      <ContentPost />
      {post.map((item) => (
        <Post detail={item} />
      ))}
    </div>
  )
}
