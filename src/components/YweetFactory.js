import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import 'components/YweetFactory.css';

const YweetFactory=({userObj})=>{
    const [yweet,setYweet]=useState("");
    const [attachment,setAttachment]=useState("");
    const onSubmit=async(e)=>{
        // e.preventDefault();
        // const {bubble}=e;
        // console.log(e.target[1].value);
        if(yweet==="") { return};
        e.preventDefault();
        let attachmentUrl="";
        // console.log(attachment!=="");
        // console.log(attachment!==undefined);
        if(attachment!==""){
            const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const res=await attachmentRef.putString(attachment,'data_url');
            // console.log(res.ref().getDownloadURL());
            attachmentUrl=await res.ref.getDownloadURL();
            // console.log(attachmentUrl);
        };
        const yweetObj={
            text: userObj.displayName + ' : '+yweet,
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
        setAttachment("");
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
    const onDeleteAttachmentClick=()=>setAttachment("");
    
    return(
    <form onSubmit={onSubmit} className='factoryForm'>
      <div className='factoryInput__container'>
        <input className='factoryInput__input' onChange={onChange} value={yweet} type='text' placeholder="What's mind?" maxLength={120}/>
        <input type='submit' value='&rarr;' className='factoryInput__arrow'/>
      </div>
      <label for='attach-file' className='factoryInput__label'>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus}/>
      </label>
      <input id='attach-file' type='file' accept='image/*' onChange={onAttachmentChange}
       style={{opacity:0,}}/>
      {attachment && (
        <div className='factoryForm__attachment'>
          <img src={attachment} style={{backgroundImage:attachment}} alt='profile'/>
          <div className='factoryForm__clear' onClick={onDeleteAttachmentClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes}/>
          </div>
        </div>
      )}
    </form>
  );
};

export default YweetFactory;