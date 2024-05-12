import React, { useState, useRef, useEffect } from 'react';
import './signUp_q3.css';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import signUp_backButton from '../signUp/signUp_backButton.png';
import jobImg from '../signUp/job.png'; 
import { Button, Input, Radio, Select, Space } from "antd";
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp_q3() {
    const navigate = useNavigate();
    const [job, setJob] = useState(1); // 직업
    // 상태 추가: 업데이트 성공 여부
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const onJobChange = (e) => { 
        setJob(e.target.value);
    };

    // 업데이트 요청 함수
    const onUpdateClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user_update', {
                job:job.toString(),
            });

            if (response.data === 'SUCCESS') {
                console.log('닉네임 업데이트 성공');
                setUpdateSuccess(true);
                navigate('/signup-q4');
              } else {
                console.error('닉네임 업데이트 실패');
              }
        } catch (error) {
            console.error('Error during user update:', error);
            setUpdateSuccess(false);
        }
    };

    return (
        <div className='signup_question_background'>
            <div className='signup_question'>
                <img src={jobImg} alt="job_image" style={{ width: '80px'}} />
                <div className='signup_question_text'><p>직업이 무엇인가요?</p></div>
            </div>
            <div className='signup_question_radio_q3'>
                <Radio.Group onChange={onJobChange} value={job}>
                    <Space direction="vertical">
                        <Radio value={1}>중/고등학생</Radio>
                            <Radio value={2}>대학생/대학원생</Radio>
                            <Radio value={3}>개발자</Radio>
                            <Radio value={4}>그 외 
                                {job === 4 ? (
                                <Input style={{width: 100,marginLeft: 10,}}/>
                                ) : null}
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>

            <div className='signup_question_button'>
                {/* 다음으로 넘어가는 버튼 */}
                {/* 업데이트 성공 여부에 따라서 Link 또는 버튼 처리 */}
                {updateSuccess === null ? (
                    <IconButton onClick={onUpdateClick}>
                        <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
                    </IconButton>
                ) : undefined}
            </div>
        </div>
    );
}

export default SignUp_q3;
