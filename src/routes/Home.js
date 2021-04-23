import Yweet from 'components/Yweet';
import YweetOthers from 'components/YweetOthers';
import YweetFactory from 'components/YweetFactory';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import 'routes/Home.css';

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
      {yweets.map(function(y){
        console.log(y.creatorId===userObj.uid);
        // console.log(userObj.uid);
        if (y.creatorId===userObj.uid){
          return <Yweet key={y.id} yweetObj={y} isOwner={y.creatorId===userObj.uid}/>
        } else{
          return <YweetOthers key={y.id} yweetObj={y} isOwner={y.creatorId===userObj.uid}/>
        }
      })}
    </div>
  </div>
  );
};

export default Home;