import Yweet from 'components/Yweet';
import YweetOthers from 'components/YweetOthers';
import YweetFactory from 'components/YweetFactory';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import 'routes/Home.css';
import getNotificationPermission from 'components/Messaging';
import notifyMsg from 'components/notifyMsg';

const Home=({userObj})=> {
  const [yweets,setYweets]=useState([]);

  /*  old version for get database... & forEach(...)
  const getYweets = async ()=>{
    const dbYweets=await dbService.collection('yweets').orderBy('createdAt','desc').get();
    setYweets([]);
    // console.log("delete!!");
    // console.log(yweets);
    // console.log(dbYweets);
    // dbYweets.forEach((doc)=>console.log(doc.data()));
    // let tempYweets=[];
    dbYweets.forEach((doc)=>{
        const yweetObj={
          ...doc.data(),
          id:doc.id
        };
        // tempYweets=[...tempYweets, yweetObj];
        // console.log(tempYweets);
        // tempYweets+=yweetObj;
        setYweets((prev)=>[...prev,yweetObj]);
    });
    // console.log(yweets);
    // setYweets(tempYweets);
  };
  */

  useEffect(()=>{
    // getYweets();
    getNotificationPermission();
    // notifyMsg('test');
    dbService.collection('yweets').orderBy('createdAt','desc').onSnapshot(sn=>{
      // console.log(sn);
      const yweetsArray=sn.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));
      setYweets(yweetsArray);
    });    
  },[]);
//   useEffect(async()=>{ useEffect의 callback func은 sync...로 async불가
//     const dbYweets=await dbService.collection('yweets').get();
//     // console.log(dbYweets);
//     dbYweets.forEach((doc)=>console.log(doc.data()));
//   },[]);
  
  return (
    <div className='container'>
      <YweetFactory userObj={userObj}/>
      {/* {console.log(yweets)} */}
    <div className='homeDiv'>
      {/* {yweets.map((yweet)=>(
        <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId===userObj.uid}/>
      ))} */}
      {yweets.map(function(y,i){
        // console.log(y.creatorId===userObj.uid);
        // console.log(userObj.uid);
        // let i = 0;        
        // console.log(i);
        if (y.creatorId===userObj.uid){
          // return <Yweet key={y.id} yweetObj={y} isOwner={y.creatorId===userObj.uid}/>
          return <Yweet key={y.id} yweetObj={y} userObj={userObj}/>
        } else{
          // console.log('array'+i);
          if(i===0 && !document.hasFocus()) {
            // notifyMsg(y.text);
            // console.log('i===0 && !focus');
            notifyMsg(y.text);
          }
          // console.log("testdddd....");
          // return <YweetOthers key={y.id} yweetObj={y} isOwner={y.creatorId===userObj.uid}/>
          return <YweetOthers key={y.id} yweetObj={y} userObj={userObj}/>
        }
      })}
      {yweets.map( function(y){
        // if (Date.now()>y.createdAt){
        if (Date.now()>y.createdAt+604800000 ){
          // console.log('too old : '+y.attachmentUrl);
          if (y.attachmentUrl!=="") {
            storageService.refFromURL(y.attachmentUrl).delete();
          }  
          dbService.doc(`yweets/${y.id}`).delete();
        }
        // console.log("y.att : "+y.attachmentUrl);
        return null;
      })
      }
    </div>
  </div>
  );
};

export default Home;