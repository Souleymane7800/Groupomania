import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./login.css";
import { login } from "../../Component/ReduxContainer/apiCall";
import logo from "../../Component/Images/logo.png"


export default function Login() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {email, password});
  }

  return (
    <div className="mainContainerForSignup">
      <div className="submainContainer">
        <div className="loginLeft">
          {/* <p className="logoText">{logo}</p> */}
          <img src={logo} alt="logo Groupomania"/>
          <p className="introText">Rester connecté avec vos collaborateurs partout dans le monde !</p>
        </div>
        <div className="loginRight">
          <p className="createAccountText1" >Se connecter</p>
          {/* <input type="text" placeholder="Pseudo" className="inputText" /> */}
          <input type="email" placeholder="email" name="" id="Email" onChange={(e) => setEmail(e.target.value)} className="inputText" />
          <input type="password" placeholder="Mot de passe" name="" id="password" onChange={(e) => setPassword(e.target.value)} className="inputText" />
          <button className="btnForSignup" onClick={handleClick}>Se connecter</button>
          <Link to={"/signup"} style={{ textDecoration:"none" }}>
            <p style={{ color: "red"}}>Vous n'avez pas de compte ?</p>
          </Link>
          {/* <Link to={"/signup"} style={{ textDecoration:"none" }}>
            <p>Mot de passe oublié ?</p>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
