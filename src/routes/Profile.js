// import { authService, dbService } from 'fbase';
// import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Profile=({refreshUser,userObj})=> {
  const history=useHistory();
  const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
  const onLogOutClick=()=>{
    authService.signOut();
    history.push('/');
  };
  // const getMyYweets=async()=>{
  //   console.log(userObj.uid);
  //   const yweets=await dbService
  //     .collection('yweets')
  //     .where('creatorId','==',userObj.uid)
  //     .orderBy('createdAt','desc')
  //     .get();
  //   console.log(yweets.docs.map((doc)=>doc.data()));
  // };
  // useEffect(()=>{
  //   getMyYweets();
  // },[]);
  const onChange=(e)=>{
    setNewDisplayName(e.target.value);
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    // console.log(e);
    if(userObj.displayName!==newDisplayName){
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      // history.push('/');
      refreshUser();
    }
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input type='text' value={newDisplayName} placeholder='Display Name' onChange={onChange}/>
        <input type='submit' value='Update Profile'/>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;