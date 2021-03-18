// import logo from './logo.svg';
// import './App.css';
import React, {useEffect, useState} from 'react';
import AppRouter from "components/Router";
import {authService} from 'fbase';


function App() {
  // console.log('auth:'+authService.currentUser);
  // const [isLoggedIn, setLoggedIn]=useState(true);
  const [init,setInit]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      // console.log(user));
      if(user){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
      setInit(true);
      });
    },[]);

 return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> :'Initializing...'}
      <footer>&copy; Ywitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
