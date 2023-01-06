import React, { useEffect, useState } from 'react';
import "./profileLeftbar.css";
import image from "../Images/paysage.jpg";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function ProfileLeftbar() {

      let location = useLocation();
      let id = location.pathname.split("/")[2];
      const userDetails = useSelector((state) => state.user);
      let user = userDetails.user;
      const [ Follow, setUnFollow ] = useState([user.others.Following.includes(id) ? "Unfollow" : "Follow"]);
      const accessToken = user.accessToken;
      // let username = user?.others?.username;
      console.log(accessToken);
      
      // On récupère les informations des autres users(image,title...)
      const [users, setUsers] = useState([]);
      useEffect(() => {
            const getUser = async () => {
                  try {
                        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${id}`)
                        setUsers(res.data);
                  } catch (error) {
                        console.log("Une erreur est survenue !")
                  }
            }
            getUser();
      }, [id])

      // Compteur de Followers et de Following
      let followersCounter = users?.Followers?.length;
      let followingCounter = users?.Following?.length;
      console.log(users)

      const [ FollowingUser, setFollowingUser ] = useState([]);
      useEffect(() => {
            const getFollowing =async () => {
                  try {
                        const res = await axios(`http://localhost:5000/api/post/following/${id}`);
                        setFollowingUser(res.data);
                  } catch (error) {
                        console.log("Une erreur est survenue !")
                  }
            }
            getFollowing();
      }, [id])

      const handleFollow = async () => {
            if(Follow === "Follow") {
                  await fetch(`http://localhost:5000/api/user/following/${id}`, {
                        method: "PUT",
                        headers:{ "Content-Type":"application/JSON",
                        token:accessToken},
                        body:JSON.stringify({user:`${user.others._id}`})})
                  setUnFollow("UnFollow");
            } else {
                  await fetch(`http://localhost:5000/api/user/following/${id}`, {
                        method: "PUT",
                        headers:{ "Content-Type":"application/JSON",
                        token:accessToken},
                        body:JSON.stringify({user:`${user.others._id}`})})
                  setUnFollow("Follow");
            }
      }

      console.log(FollowingUser)
      

  return (
    <div className="ProfileLeftbar">
            <div className="NotificationsContainer">
            <img src={`${image}`} className="ProfilePageCover" alt="" />
                  <div  style={{ display: "flex", alignItems: "center",marginTop:-30 }}>
                        <img src={`${users.profile}`} className="ProfilePageImage" alt="" />
                        <div>
                              <p style={{ marginLeft:10, marginTop:15, textAlign: "start", fontSize: "20px" }}>{users.username}</p>
                              <p style={{ marginLeft:6, marginTop:-16, textAlign: "start", fontSize:11 }}>Software Developer</p>
                        </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p style={{ marginLeft:20, fontSize: "14px" }}>Followings</p>
                        <p style={{ marginRight:20, fontSize: "12px", marginTop:17 }}>{followingCounter}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop:-20 }}>
                        <p style={{ marginLeft:20, fontSize: "14px" }}>Followers</p>
                        <p style={{ marginRight:20, fontSize: "12px", marginTop:17 }}>{followersCounter}</p>
                  </div>
                  <div style={{  marginTop:-20 }}>
                        <h3 style={{ marginLeft:20, fontSize: "14px", marginRight:30, marginTop:30, textAlign: "start" }}>User bio</h3>
                        <p style={{  fontSize: "12px", marginTop:-15, textAlign: "start", marginLeft: "20px" }}>Nouveau sur le site Groupomania</p>
                  </div>
                  {user.others._id !== id ? <div onClick={handleFollow}><button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"green" , color:"white", cursor: "pointer"}}>{Follow}</button></div> : <div><button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"green" , color:"white"}}>Edit Bio</button></div> }
                  
            </div>

            <div className="NotificationsContainer">
                  <h3>Following</h3>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p style={{ marginLeft:10 }}>Amis</p>
                        <p style={{ marginRight:10, color: "#aaa" }}>Tout voir</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", marginLeft:5 }}>
                        {FollowingUser.map((item) => (
                              <Link to={`/Profile/${item._id}`} style={{textDecoration:"none"}}>
                                    <div style={{ marginLeft:4, cursor: "pointer" }} key={item._id}>
                                          <img src={`${item.profile}`} className="friendImage" alt="" />
                                          <p style={{ marginTop:-2 }}>{item.username}</p>
                                    </div>
                              </Link>
                        ))}
                  </div>
            </div>
    </div>
  )
}
