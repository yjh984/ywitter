import AuthForm from 'components/AuthForm';
import { authService, authService2 } from 'fbase';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import 'routes/Auth.css';

const Auth=()=> {
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
        <div className='authContainer'>
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='3x' style={{marginBottom:30}}/>
            <AuthForm/>
            <div className='authBtns'>
                <button onClick={onSocialClick} name='google' className='authBtn'>
                    Continue with Google <FontAwesomeIcon icon={faGoogle}/>
                </button>
                <button onClick={onSocialClick} name='github' className='authBtn'>
                    Continue with Github <FontAwesomeIcon icon={faGithub}/>
                </button>
            </div>
        </div>
    );
};
    

export default Auth;