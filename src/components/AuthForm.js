import { authService } from 'fbase';
import React, { useState } from 'react';
import 'components/AuthForm.css';

const AuthForm=()=>{
    const [newAccount, setNewAccount]=useState(true);
    const [error,setError]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const onChange=(event)=>{
        // console.log(event.target.value);
        const {target: {name, value}}=event;
        if (name==='email'){
            setEmail(value);
        }else if(name==='password'){
            setPassword(value);
        }
    }
    const onSubmit=async(event)=>{
        event.preventDefault();
        try{
            // let data;
            if(newAccount){ // method에 promise가 있어서 async, await를 선언
                await authService.createUserWithEmailAndPassword(email,password);
            }else{
                // data=await authService.signInWithEmailAndPassword(email,password);
                await authService.signInWithEmailAndPassword(email,password);
            }
            // console.log(data);
        } catch(e){
            setError(e.message);
            // console.log(error.message);
        }
        
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev); //difficult to understand??
    
    return(<>
        <form onSubmit={onSubmit} className='container'>
            <input name='email' type='email' placeholder='Email'
                required value={email} onChange={onChange} className='authInput'/>
            <input name='password' type='password' placeholder='password'
                required value={password} onChange={onChange} className='authInput'/>
            <input type='submit' className='authInput authSubmit' value={newAccount? 'Create Account': 'Loge-in'}/>
            {/* {error ? "Error:"+{error}:''} */}
            {error && <span className='authError'>{error}</span>}
        </form>
        <span onClick={toggleAccount} className='authSwitch'>
            {newAccount ? 'Sign-in':'Create Account'}
        </span>
        </>
    )
};

export default AuthForm;