import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, Button } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './board.css';
import techStacks from '../TechStacks';
import PostList from './boardPost';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const onChange = (e) => {
    console.log('Change:', e.target.value);
  };


// 게시판 종류
const boards = [
    "C", "C#", "C++", "Java", "Python", "Javascript",
    "React", "HTML5", "CSS", "flutter", "Spring", "Kotlin"
];
const boardOptions = boards.map((board) => ({ value: board, label: <Link to={'/' + board}>{board}게시판</Link> }));

// 게시판 안에서의 글 검색 처리
const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
};

const url_1 = 'https://cdn.pixabay.com/photo/2016/10/16/16/33/dual-screen-1745705_1280.png'
const url_2 = 'https://modulabs.co.kr/wp-content/uploads/2023/10/lautaro-andreani-xkBaqlcqeb4-unsplash-1536x1024.jpg'
const url_3='https://cdn.pixabay.com/photo/2014/09/24/14/29/macbook-459196_1280.jpg'
const url_4='https://cdn.pixabay.com/photo/2015/02/24/02/04/code-647012_1280.jpg'

const postsData = [
    { title: '코린이입니다.', image: url_1, tag: '#java #자바 #코린이', likes: 0, comments: 0 },
    { title: '자바 너무 어렵다ㅠㅠ', image: url_2, tag: '#어렵 #코린이',likes: 3, comments: 0 },
    { title: '자바의 신이 쓰는 자바 쉽게하는 법', image: url_3, tag: '#자바쉽게법 #자바의신',likes: 5, comments: 0 },
    { title: '엥?', image: url_4, tag: '#왜이래 #도와줘',likes: 1, comments: 0 },
    { title: '디코 키고 코딩하실 분', image: url_2, tag: '#디코 #온라인',likes: 1, comments: 0 },
    
    // Add more posts as needed
];
  
  
const Java = () => {

    const [selectedValue, setSelectedValue] = useState(boardOptions[3].value);
    const [isPosting, setIsPosting] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
      };
    
      const handlePostButtonClick = () => {
        setIsPosting(true);
        setIsSearchVisible(false);
      };

      const handlePostSubmit = () => {
        // 글 작성 완료 후 필요한 로직 추가
        setIsPosting(false);
        setIsSearchVisible(true);
      };

    return (
        <div className='board_background'>
            <div className='board_toolbar'>
                <div className='board_select'>
                    {/* 게시판 선택 */}
                    <div className='board_select_img'> 
                        {techStacks.map((stack) => (
                            <span key={stack.name}>
                            {stack.name === selectedValue && (
                                <img src={stack.imageUrl} alt={stack.name} />
                            )}
                            </span>
                        ))}
                    </div>

                    <Select
                        value={selectedValue}
                        onChange={handleChange}
                        style={{ width: '200px', height: '50px' }}
                        bordered={false}
                    >
                        {boardOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                        ))}
                    </Select>
                </div>
            
                {/* 검색창 */}
                {isSearchVisible && (
                <div className='board_search'>
                    <Search
                    style={{ width: '400px' }}
                    placeholder="글 제목, 내용, 댓글 등을 검색해보세요."
                    onSearch={onSearch}
                    enterButton
                    />
                </div>
                )}

            </div> 

            {!isPosting && isSearchVisible && (
            <div className='board_posting'>
                <Button type="primary" onClick={handlePostButtonClick}>
                글 작성
                </Button>
            </div>
            )}

            {/* 글 작성 버튼을 눌렀을 때의 화면 */}
            {isPosting ? (
                <div className='posting_background'>
                    <div className='posting_text'>
                        <p style={{fontWeight:'bold'}}>Tilte</p>
                    </div>
                    <div className='posting_title'>
                        <Input showCount maxLength={50} onChange={onChange} />
                    </div>
                    <div className='text_area'>
                        <TextArea showCount maxLength={2000} onChange={onChange} placeholder="자유롭게 작성해보세요!" />
                    </div>
                    <div className='posting_text'>
                        <p style={{fontWeight:'bold'}}>Tag</p>
                    </div>
                    <div className='posting_tag'>
                        <Input showCount maxLength={30} onChange={onChange} placeholder="#JAVA #질문" />
                    </div>
                    <div className='posting_button'>
                        <Button type="primary" onClick={handlePostSubmit}>
                        게시
                        </Button>
                    </div>
                </div>
            ) : (
                // 글 작성 버튼을 누르지 않았을 때의 화면
                <div className='board_postlist'>
                <PostList posts={postsData} />
                </div>
            )}
            
        </div>
    );
  };
  
  export default Java;
