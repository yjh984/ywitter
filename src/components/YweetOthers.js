import { dbService } from 'fbase';
import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import 'components/YweetOthers.css'

const YweetOthers=({yweetObj,userObj})=>{
  const [editing,setEditing]=useState(false);
  const [newYweet,setNewYweet]=useState(yweetObj.text);

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

  // useEffect(()=>{
  //   notifyMsg(yweetObj.text);
  // },[]);

  return (
    <div className='yweet__others'>
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
        // {isOwner? (
          <><div>
            {/* {console.log('isOwner')} */}
            {/* {userObj.displayName}
            {' : '} */}
            {yweetObj.text}
            {yweetObj.attachmentUrl&&<img src={yweetObj.attachmentUrl} alt='profile'/>}
          </div>
          </>
      }    
    </div>
  )
}

export default YweetOthers;