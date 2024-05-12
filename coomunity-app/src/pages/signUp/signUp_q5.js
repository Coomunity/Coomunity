import React, { useState, useRef, useEffect } from 'react';
import './signUp_q3.css';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import signUp_backButton from '../signUp/signUp_backButton.png';
import  programming from '../signUp/programming.png'; 
import { Button, Input, Radio, Select, Space } from "antd";
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';




function SignUp_q5() {

    const [ability, setAbility] = useState(1); // 코딩능력

    const onAbilityChange = (e) => { 
        console.log("Ability selected", e.target.value);
        setAbility(e.target.value);
     };

     const moveToNext = (e) => {
        /* write code when push button move to signUp_q3 page */
        
     }

    return(
        <div className='signup_question_background'>
            <div className='signup_question'>
                {/* 질문이미지와 질문 */}
                <img src={programming} alt="Sign Up Next" style={{ width: '80px'}} />
                <div className='signup_question_text'><p>당신의 코딩 능력은 어느정도인가요?</p></div>

            </div>
            <div className='signup_question_radio_q5'>
                <Radio.Group onChange={onAbilityChange} value={ability}>
                    <Space direction="vertical">
                        <Radio value={1}>변수가 뭔지 몰라요!</Radio>
                        <Radio value={2}>for문, if문 등을 활용하여 간단한 알고리즘은 구현할 수 있어요.</Radio>
                        <Radio value={3}>함수를 자유롭게 사용할 수 있어요.</Radio>
                        <Radio value={4}>어디가서 코딩 고수라고 말할 수 있어요!</Radio>
                    </Space>
               </Radio.Group>
            </div>

            <div className='signup_question_button'>
                {/* 다음으로 넘어가는 버튼 */}
                <Link to='/signup-q6'>
                    <IconButton>
                        <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
                    </IconButton>
                </Link>
            </div>
        </div>

    );
}

export default SignUp_q5; 