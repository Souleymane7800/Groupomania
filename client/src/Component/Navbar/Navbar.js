import React from 'react';
import "./navbar.css";
import searchIcon from "../Images/search.png";
import Notification from "../Images/bell.png";
import Message from  "../Images/message.png";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';
import logo from "../../Component/Images/logo.png";
import logout1 from "../Images/logout-1.png";
import logoutOver from "../Images/logout-2.png";

export default function Navbar() {
      const userDetails = useSelector((state) => state.user);
      let user = userDetails.user
      console.log(user);
      let id = user?.others?._id;
      
      const dispatch = useDispatch();
      const handleLogout = () => {
            dispatch(logout())
      }

  return (
    <div className='mainNavbar'>
      <div className="LogoContainer">
            {/* <p>Groupomania</p> */}
            <Link to={"/"}>
                  <img src={logo} alt="logo Groupomania" />
            </Link>
      </div>
      {/* Barre de recherche */}
      <div className="searchNavbar">
            <div className="searchInputContainer">
                  <img src={`${searchIcon}`} className="searchIcon" alt="" />
                  <input type="text" className="searchInput" placeholder="Retrouver vos collaborateurs" name="" id="" />
            </div>
      </div>
      {/* Image de profile et username Navbar */}
      <div className="IconsContainer">
            <img src={`${Notification}`} className="Icons" alt="" />
            <img src={`${Message}`} className="Icons" alt="" />
            <Link to={`/Profile/${id}`} style={{textDecoration:"none"}}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={`${user.others.profile}`} className="ProfileImage" alt="" />
                        <p style={{ marginLeft: "5px"}}>{user.others.username}</p>
                  </div>
            </Link>
            {/* Icone logout */}
            <div className="navbarLogout" onClick={handleLogout}>
                  <img src={`${logout1}`} onMouseOver={e => (e.currentTarget.src = logoutOver)} 
                        onMouseOut={e => (e.currentTarget.src = logout1)} title="Se déconnecter" className="IconsLogout" alt="Se déconnecter" />
            </div>
      </div>
    </div>
  )
}
