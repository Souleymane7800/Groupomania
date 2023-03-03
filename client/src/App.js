import './App.css';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Register/Signup"
import Profile from './Pages/Profile/Profile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import UpdatePost from './Pages/UpdatePost/UpdatePost';


function App() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ user ? <Home /> : <Login /> }></Route>
          <Route path="/Profile/:id" element={<Profile />}></Route>
          <Route path="/login" element={ user !== null ? <Navigate to={"/"}/> : <Login />}></Route>
          <Route path="/signup" element={ user ? <Navigate to={"/login"} /> : <Signup />}></Route>
          <Route exact path="/update/post/:id" element={ user ? <UpdatePost /> : <Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
