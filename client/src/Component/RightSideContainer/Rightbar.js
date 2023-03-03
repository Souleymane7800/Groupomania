import React, { useEffect, useState } from 'react';
import "./rightbar.css";
import space1 from "../Images/space1.jpg";
import space2 from "../Images/space2.jpg";
import axios from 'axios';
import Follow from './Follow';
import { useSelector } from 'react-redux';

export default function Rightbar() {

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const id = user.others._id;
  
  const [ users, setUsers ] = useState([]);
  
  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/all/user/${id}`)
        setUsers(res.data);
      } catch (error) {
        console.log("Une erreur est survenue !")
      }
    }
    getUser();
  }, [id])

  // console.log(users)

  return (
    <div className="rightbar">
      <div className="rightContainer">
        <div className="adsContainer">
          <img src={`${space1}`} className="adsImg" alt="" />
          <div>
            <p style={{ textAlign: "start", marginLeft: "10px", marginTop:-20 }}>Groupomania</p>
            <p style={{ textAlign: "start", marginLeft: "10px", fontSize: "12px", marginTop: "-16px" }}>Télétravail</p>
          </div>
        </div>
        <div className="adsContainer">
          <img src={`${space2}`} className="adsImg" alt="" />
          <div>
            <p style={{ textAlign: "start", marginLeft: "10px", marginTop:-20 }}>Groupomania</p>
            <p style={{ textAlign: "start", marginLeft: "10px", fontSize: "12px", marginTop: "-16px" }}>Open space</p>
          </div>
        </div>
        
      </div>
      <div className="rightContainer2">
        <h3 style={{ textAlign: "start", marginLeft: "10px", textDecoration:"none" }}>Suggérer pour vous</h3>
        {users.map((item) => (
          <Follow userDetails={item} />
        ))}
      </div>

    </div>
    
  )
}
