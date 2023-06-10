import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { authContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [authState,setAuthState] =useState(false);

  useEffect(()=>{
    axios.get("http://localhost:3001/auth/auth", {headers:{accessToken:localStorage.getItem('accessToken')}}).then((response)=>{
      if(response.data.error) setAuthState(false);
      else setAuthState(true);
    })
  },[])
  
  return (
    <div className="App">
      <authContext.Provider value={{authState, setAuthState}}>
      <Router>
      <Link to="/createPost">Create A Post</Link>
      <Link to="/">Home Page</Link>
      {!authState && ( <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </>
      )
}
        <Routes>
          <Route path="/" exact Component={Home}/>
          <Route path="/createPost" exact Component={CreatePost}/>
          <Route path="/post/:id" exact Component={Post}/>
          <Route path="/login" exact Component={Login}/>
          <Route path="/registration" exact Component={Registration}/>
        </Routes>
      </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
