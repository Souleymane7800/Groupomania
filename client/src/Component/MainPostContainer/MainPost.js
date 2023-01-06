import React, { useEffect, useState } from 'react';
import "./mainPost.css";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from '../PostContainer/Post';
import axios from "axios";
import { useSelector } from 'react-redux';


export default function MainPost() {

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  console.log(user);
  let id = user?.others?._id;

      const accessToken = user.accessToken;
      console.log(accessToken)

  
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/allposts`,{
          headers:{
            token:accessToken
          }
        })
        setPost(
          res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);

        })
        )
        // setPost(res.data);
      } catch (error) {
        
      }
    }
    getPost();
  }, [id, accessToken])

  console.log(post);

  return (
    <div className="mainPostContainer">
      <ContentPost />
      {post.map((item) => (
          <Post post={item} />
      ))}
    </div>
  )
}
