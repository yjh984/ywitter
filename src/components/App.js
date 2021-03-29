// import logo from './logo.svg';
// import './App.css';
import React, {useEffect, useState} from 'react';
import AppRouter from "components/Router";
import {authService} from 'fbase';


function App() {
  // console.log('auth:'+authService.currentUser);
  // const [isLoggedIn, setLoggedIn]=useState(true);
  const [init,setInit]=useState(false);
  // const [isLoggedIn, setLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      // console.log(user));
      if(user){
        // setLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args)=>user.updateProfile(args),
        });
      }
      // else{
      //   setLoggedIn(false);
      // }
      setInit(true);
      });
    },[]);
  const refreshUser=()=>{
    // console.log(userObj.displayName);
    // setUserObj(userObj); // too big object to recognize it in React..
    const user=authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args)=>user.updateProfile(args),
    });
  }

 return (
    <>
      {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> :'Initializing...'} */}
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> :'Initializing...'}
      <footer>&copy; Ywitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
