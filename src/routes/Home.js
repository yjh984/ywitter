import Yweet from 'components/Yweet';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const Home=({userObj})=> {
  const [yweet,setYweet]=useState("");
  const [yweets,setYweets]=useState([]);
  const [attachment,setAttachment]=useState("");

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
    // const {bubble}=e;
    // console.log(e.target[1].value);
    let attachmentUrl="";
    // console.log(attachment!=="");
    // console.log(attachment!==undefined);
    if(!(attachment===undefined || attachment==="")){
      const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const res=await attachmentRef.putString(attachment,'data_url');
      // console.log(res.ref().getDownloadURL());
      attachmentUrl=await res.ref.getDownloadURL();
      // console.log(attachmentUrl);
    };
    const yweetObj={
      text: yweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('yweets').add(yweetObj);

    // await dbService.collection('yweets').add({
    //     text: yweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid
    // });

    // getYweets();
    // console.log(yweet);
    setYweet("");
    setAttachment(undefined);
    e.target[1].value="";
    // console.log(yweet);
  };
  const onChange=(e)=>{
    const {target:{value}}=e;
    // console.log(e.target.value);
    setYweet(value);
  };
//   console.log(yweets);
  const onAttachmentChange=(e)=>{
    // const {target:{files}}=e;
    const theFile=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend=(finishEvent)=>{
      // console.log(finishEvent.currentTarget.result);
      setAttachment(finishEvent.currentTarget.result);
    };
    // console.log(e.target.files);
    // console.log('file changed...');
  }
  // const onAttachmentClick=(e)=>e.target.value="";
  const onDeleteAttachmentClick=()=>setAttachment();

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={yweet} type='text' placeholder="What's mind?" maxLength={120}/>
      <input type='file' accept='image/*' onChange={onAttachmentChange}/>
      <input type='submit' value='Yweet'/>
      {attachment && <div>
          <img src={attachment} width='50px' height='50px' alt='profile'/>
          <button onClick={onDeleteAttachmentClick}>Delete</button>
        </div>
      }
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