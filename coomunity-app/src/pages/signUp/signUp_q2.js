import React, { useState, useRef, useEffect } from 'react';
import './signUp_profile.css';
import IconButton from '@mui/material/IconButton';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import signUp_backButton from '../signUp/signUp_backButton.png';
import { Link } from 'react-router-dom';


function SignUp_q2() {
  
    const [blogTitle, setBlogTitle] = useState('');
    const [count, setCount] = useState(0);
    const completionWord = '코뮤니티의 사용자 맞춤 서비스를 위해 다음 몇 가지 질문에 답해주세요.';
  
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
          }, 50);
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
  
          <Link to='/signup-q3'>
            <IconButton>
                <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
            </IconButton>
        </Link>
      </div>
    );
  }
  
  export default SignUp_q2;