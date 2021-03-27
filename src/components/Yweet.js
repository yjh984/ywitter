import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';

const Yweet=({yweetObj,isOwner})=>{
  const [editing,setEditing]=useState(false);
  const [newYweet,setNewYweet]=useState(yweetObj.text);

  const onDeleteClick=async()=>{
    const ok=window.confirm("Are you sure?");
    if(ok){
      await dbService.doc(`yweets/${yweetObj.id}`).delete();
      await storageService.refFromURL(yweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing=()=>setEditing((prev)=>!prev);
  const onSubmit=async(e)=>{
    e.preventDefault();
    await dbService.doc(`yweets/${yweetObj.id}`).update({
      text:newYweet
    })
    setEditing(false);
  };
  const onChange=(e)=>{
    const {target:{value}}=e;
    setNewYweet(value);
  };

  return (
    <div>
      {editing? 
        <>
         <form onSubmit={onSubmit}>
            <input type='text' value={newYweet} required onChange={onChange}/>
            <input type='submit' value='Update'/>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
        :
        <><div>
            {yweetObj.text}
            {yweetObj.attachmentUrl&&<img src={yweetObj.attachmentUrl} width='20px' height='20px' alt='profile'/>}
          </div>
          {isOwner && <><button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button></>}
        </>
      }    
    </div>
  )
}

export default Yweet;