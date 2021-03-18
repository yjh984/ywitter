import { authService, authService2 } from 'fbase';
import React, { useState } from 'react';

const Auth=()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount, setNewAccount]=useState(true);
    const [error,setError]=useState("");

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
            let data;
            if(newAccount){ // method에 promise가 있어서 async, await를 선언
                data=await authService.createUserWithEmailAndPassword(email,password);
            }else{
                data=await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        } catch(e){
            setError(e.message);
            // console.log(error.message);
        }
        
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev); //difficult to understand??
    const onSocialClick=async(e)=>{
        // console.log(e.target.name);
        let provider;
        if(e.target.name==='google'){
            provider=new authService2.GoogleAuthProvider();
        }else if(e.target.name==='github'){
            provider=new authService2.GithubAuthProvider();
        }
        const data=await authService.signInWithPopup(provider);
        // authService2.signInWithPopup() authService2.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='email' placeholder='Email'
                 required value={email} onChange={onChange}/>
                <input name='password' type='password' placeholder='password'
                 required value={password} onChange={onChange}/>
                <input type='submit' value={newAccount? 'Create Account': 'Loge-in'}/>
                {/* {error ? "Error:"+{error}:''} */}
                {error ? 'Error:'+error:''}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign-in':'Create Account'}
            </span>
            <div>
                <button onClick={onSocialClick} name='google'>Continue with Google</button>
                <button onClick={onSocialClick} name='github'>Continue with Github</button>
            </div>
        </div>
    );
};
    

export default Auth;