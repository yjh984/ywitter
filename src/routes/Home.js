import Yweet from 'components/Yweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home=({userObj})=> {
  const [yweet,setYweet]=useState("");
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
  const onSubmit=async(e)=>{
    // e.preventDefault();
    // console.log('submitted...');
    await dbService.collection('yweets').add({
        text: yweet,
        createdAt: Date.now(),
        creatorId: userObj.uid
    });
    // getYweets();
    // console.log(yweet);
    setYweet("");
    // console.log(yweet);
  };
  const onChange=(e)=>{
    const {target:{value}}=e;
    setYweet(value);
  };
//   console.log(yweets);

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={yweet} type='text' placeholder="What's mind?" maxLength={120}/>
      <input type='submit' value='Yweet'/>
    </form>
      {/* {console.log(yweets)} */}
    <div>
      {yweets.map((yweet)=>(
        <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId===userObj.uid}/>
      ))}
    </div>
  </div>
  );
};

export default Home;