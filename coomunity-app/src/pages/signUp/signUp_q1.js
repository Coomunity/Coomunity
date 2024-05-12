import React, { useState, useRef, useEffect } from 'react';
import './signUp_profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import { Link } from 'react-router-dom';


function SignUp_q1() {
  
    const [blogTitle, setBlogTitle] = useState('');
    const [count, setCount] = useState(0);
    const completionWord = '안녕하세요! 코뮤니티에 오신 걸 환영합니다!';
  
    useEffect(() => {
        let typingInterval;
    
        if (count < completionWord.length) {
          typingInterval = setInterval(() => {
            setBlogTitle((prevTitleValue) => {
              const result = prevTitleValue + completionWord[count];
              setCount(count + 1);
    
              if (count >= completionWord.length - 1) {
                clearInterval(typingInterval);
              }
    
              return result;
            });
          }, 100);
        }
    
        return () => {
          clearInterval(typingInterval);
        };
      }, [count, completionWord]);
  
    return (
      <div className='background_signupprofile'>
          <div className='signUp_center'>
              <div className='signUp_profile_text'><h1 className="main-title">{blogTitle}</h1></div>
          </div>
  
        <Link to='/signup-q2'>
            <IconButton>
                <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
            </IconButton>
        </Link>
      </div>
    );
  }
  
  export default SignUp_q1;