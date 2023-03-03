import React, { useEffect, useState } from 'react';
import "./profileRightbar.css";
import axios from 'axios';
import Follow from '../RightSideContainer/Follow';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

export default function ProfileRightbar() {
  const userDetails = useSelector((state) => state.user);
      let user = userDetails.user
      let location = useLocation();
      let id = location.pathname.split("/")[2];
      let idForSuggest = user?.others?._id;

  const [ FollowingUser, setFollowingUser ] = useState([]);
      useEffect(() => {
            const getFollowing =async () => {
                  try {
                        const res = await axios(`http://localhost:5000/api/post/followers/${id}`);
                        setFollowingUser(res.data);
                  } catch (error) {
                        console.log("Une erreur est survenue !")
                  }
            }
            getFollowing();
      }, [id])

      // console.log(FollowingUser)


      const [ users, setUsers ] = useState([]);
      useEffect(() => {
        const getUser = async() => {
          try {
            const res = await axios.get(`http://localhost:5000/api/user/all/user/${idForSuggest}`)
            setUsers(res.data);
          } catch (error) {
            console.log("Une erreur est survenue !")
          }
        }
        getUser();
      }, [idForSuggest])
    
      // console.log(users)

  return (
    <div className="ProfileRightbar">
      <div className="profileRightContainer">
        <h3>Followers</h3>
        <div>
          {FollowingUser.map((item) => (
            <div style={{ marginTop: "10px"}}>
            <div style={{ display: "flex", alignItems: "center", marginLeft:10, cursor: "pointer" }}>
              <img src={`${item.profile}`} className="FriendsImage" alt="" />
              <p style={{ textAlign: "start", marginLeft: "10px" }}>{item.username}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="rightContainer2">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>Suggérer pour vous</h3>
        {users.map((item) => (
          <Follow userDetails={item} />
        ))}
      </div>
    </div>
    
  )
}
