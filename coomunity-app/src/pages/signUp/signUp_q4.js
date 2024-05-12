import React, { useState } from 'react';
import './signUp_q3.css';
import signUp_nextButton from '../signUp/signUp_nextButtton.png';
import techImg from '../signUp/coding.png';
import { Select } from "antd";
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const techStacks = [
  "C", "C#", "C++", "Java", "Python", "JavaScript",
  "React", "HTML5", "CSS", "Flutter", "Spring", "Kotlin"
];

const techOptions = techStacks.map((tech) => ({ value: tech, label: tech }));


function SignUp_q4() {
  const [selectedTech, setSelectedTech] = useState('C'); // 코딩 능력

  const onTechChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedTech(value);
  };

  return (
    <div className='signup_question_background'>
      <div className='signup_question'>
        {/* 질문 이미지와 텍스트 */}
        <img src={techImg} alt="tech_image" style={{ width: '80px' }} />
        <div className='signup_question_text'>
          <p>주로 사용하는 언어/기술은 무엇인가요?</p>
        </div>
      </div>

    <div className='signup_question_tech_container'>
        <div className='signup_question_tech'>
            <p className='signup_question_tech_text'>제일 많이 쓰는 언어</p>
            <div className='signup_question_select'>
                <Select
                defaultValue={selectedTech}
                style={{ width: 120 }}
                onChange={onTechChange}
                options={techOptions}
                />
            </div>
        </div>

        <div className='signup_question_tech'>
            <p className='signup_question_tech_text'>그 다음으로 많으 쓰는 언어</p>
            <div className='signup_question_select'>
                <Select
                defaultValue={selectedTech}
                style={{ width: 120 }}
                onChange={onTechChange}
                options={techOptions}
                />
            </div>
        </div>

        <div className='signup_question_tech'>
            <p className='signup_question_tech_text'>그그 다음으로 많으 쓰는 언어</p>
            <div className='signup_question_select'>
                <Select
                defaultValue={selectedTech}
                style={{ width: 120 }}
                onChange={onTechChange}
                options={techOptions}
                />
            </div>
        </div>
    </div>
      
      <div className='signup_question_button'>
        {/* 다음으로 넘어가는 버튼 */}
        <Link to='/signup-q5'>
            <IconButton>
                <img src={signUp_nextButton} alt="Sign Up Next" style={{ width: '80px' }} />
            </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default SignUp_q4;
