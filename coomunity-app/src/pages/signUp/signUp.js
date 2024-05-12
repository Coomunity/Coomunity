import React, { useState } from 'react';
import './signUp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import axios from 'axios';

const SignUp = () => {
    const [nickname, setNickname] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handleCheckNickname = async () => {
        // 서버로 중복 확인 요청
        const response = await axios.get('http://localhost:8000/nickname_search', {
            params: {
                nickname: nickname,
            },
        });

        const nicknameExists = response.data;

        // 서버로부터 중복 확인 결과를 받아옴
        const { exists } = nicknameExists;

        if (exists) {
            setNicknameMessage('이미 사용 중인 닉네임입니다.');
            console.log('이미 사용 중인 닉네임입니다.');
            setMessageColor('red');
        } else {
            console.log('사용 가능한 닉네임입니다.');
            setNicknameMessage('사용 가능한 닉네임입니다.');
            setMessageColor('green');
            setIsNicknameAvailable(true);
        }
    };

    const handelButtonNotClick = () => {
        setNicknameMessage('닉네임 중복 확인을 해주세요.');
        setMessageColor('red');

    };

    const handleUpdateUserInfo = async () => {
        const updateResponse = await axios.post('http://localhost:8000/user_update', {
          nickname: nickname,
          // 추가 업데이트할 필드가 있으면 추가
        });

        if (updateResponse.data === 'SUCCESS') {
          console.log('닉네임 업데이트 성공');
        } else {
          console.error('닉네임 업데이트 실패');
        }
    };

    return (
        <div className="background_signup">
            <div className="text_button_box">
                <div className="nickname_container">
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="outlined-basic"
                            label="닉네임"
                            variant="outlined"
                            style={{ width: '430px' }}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: 'lightgrey', color: 'black' }}
                            onClick={handleCheckNickname}
                        >
                            중복 확인
                        </Button>
                    </Stack>
                </div>
                <div className="text_container">
                    <p style={{ fontSize: '10px', color: messageColor }}>{nicknameMessage}</p>
                </div>
            </div>
            <Link to={isNicknameAvailable ? '/signup-profile' : undefined }>
            <IconButton onClick={isNicknameAvailable ? handleUpdateUserInfo : handelButtonNotClick}>
                <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
            </IconButton>
            </Link>
        </div>
    );
};

export default SignUp;
