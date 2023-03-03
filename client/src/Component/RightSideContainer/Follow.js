import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import addFriends from "../Images/add-user.png";
import UserToFollow from "../Images/afterFollowImg.png"

export default function Follow({ userDetails }) {
      const userDetail = useSelector((state) => state.user);
      let user = userDetail?.user
      // console.log(user);
      let id = user?.others?._id;
      // console.log(id);

      const accessToken = user?.accessToken;
      
      const [ Follow, setFollow ] = useState(addFriends);
      const handleFollow = async (e) => {
            await fetch(`http://localhost:5000/api/user/following/${userDetails._id}`, {
                  method: "PUT",
                  headers:{ "Content-Type":"application/JSON",
                  token:accessToken},
                  body:JSON.stringify({user:`${id}`})})
            setFollow(UserToFollow);
      } 

  return (
      <div style={{ marginTop: "-10px" }} key={userDetails._id} >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to={`/Profile/${userDetails._id}`} style={{textDecoration:"none"}}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${userDetails.profile}`} className="ProfileImage" alt="" />
            <div>
              <p style={{ marginLeft: "10px", textAlign: "start"}}>{userDetails.username}</p>
              <p style={{ marginLeft: "10px", textAlign: "start", marginTop: "-16px", fontSize: "11px", color: "#aaa" }}>
                Suggérer pour vous
              </p>
            </div>
          </div>
        </Link>
        <div style={{ backgroundColor: "#aaa", padding: "10px", marginRight: 10, borderRadius: "50%" }} onClick={e => handleFollow(userDetails._id)}>
          <img src={`${Follow}`} className="addFriend" alt='' />
        </div>
      </div>
    </div>
  )
}
