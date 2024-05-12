import React, { useState, useRef, useEffect } from 'react';
import './signUp_profile.css';
import IconButton from '@mui/material/IconButton';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import signUp_backButton from '../signUp/signUp_backButton.png';
import { Link } from 'react-router-dom';


function SignUp_q6() {
  
    const [blogTitle, setBlogTitle] = useState('');
    const [count, setCount] = useState(0);
    const completionWord = '답해주셔서 감사합니다. 이제 본격적으로 코뮤니티를 이용해보세요!';
  
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
  
          <Link to='/login'>
            <IconButton>
                <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
            </IconButton>
        </Link>
      </div>
    );
  }
  
  export default SignUp_q6;