import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import 'components/Yweet.css'

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
    <div className='yweet'>
      {editing? 
        <>
         <form onSubmit={onSubmit} className='container yweetEdit'>
            <input type='text' value={newYweet} required autoFocus onChange={onChange} className='formInput'/>
            <input type='submit' value='Update' className='formBtn'/>
          </form>
          {/* <button onClick={toggleEditing}>Cancel</button> */}
          <span onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </span>
        </>
        :
        <><div>
            {yweetObj.text}
            {yweetObj.attachmentUrl&&<img src={yweetObj.attachmentUrl} alt='profile'/>}
          </div>
          {/* {isOwner && <><button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button></>} */}
          <div className='yweet__actions'>
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash}/>
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt}/>
            </span>
          </div>
        </>
      }    
    </div>
  )
}

export default Yweet;