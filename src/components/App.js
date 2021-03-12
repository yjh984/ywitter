// import logo from './logo.svg';
// import './App.css';
import React, {useState} from 'react';
import AppRouter from "components/Router";
import {authService} from 'fbase';


function App() {
  // console.log('auth:'+authService.currentUser);
  // const [isLoggedIn, setLoggedIn]=useState(true);
  const [isLoggedIn, setLoggedIn]=useState(authService.currentUser);
 return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Ywitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
