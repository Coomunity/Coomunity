import React, { useState, useRef } from 'react';
import './signUp_profile.css';
import IconButton from '@mui/material/IconButton';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import { Link } from 'react-router-dom';
import signUp_backButton from '../signUp/signUp_backButton.png';

import { Avatar } from 'antd';

function SignUpProfile() {
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else { // 업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };


  return (
    <div className='background_signupprofile'>
      <div className='signUp_center'>
          <Avatar
            src={image}
            style={{ margin: '20px' }}
            size={150}
            onClick={() => { fileInput.current.click(); }}
          />

          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/jpg,image/png,image/jpeg'
            name='profile_img'
            onChange={onChange}
            ref={fileInput}
          />
        <div className='signUp_profile_text'>
          <h2 className="main-title">프로필 사진을 설정해주세요.</h2>
        </div>
      </div>

      <Link to='/signup-q1'>
          <IconButton>
              <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
          </IconButton>
      </Link>
    </div>
  );
}

export default SignUpProfile;
