import React from 'react';
import {Link} from 'react-router-dom';
import 'components/Navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation=({userObj})=>(
  <nav>
    <ul className='navUL'>
      <li>
        <Link to ='/' className='navRootLink'>
          <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x'/>
        </Link>
      </li>
      <li>
        <Link to ='/profile' className='navProfileLink'>
          <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size='2x'/>
          <span style={{marginTop:10}}>
            {userObj.displayName ? `${userObj.displayName}'s Profile`:'Profile'}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;