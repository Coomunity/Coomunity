import React, { useState } from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const url_1 = 'https://cdn.digitaltoday.co.kr/news/photo/202305/475855_444522_1026.jpg'

// 글 작성자의 프로필 사진
const profileImg = 'https://cdn.pixabay.com/photo/2016/02/08/19/03/puppy-1187267_1280.jpg'
const url_5='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg'

const postData = { title: 'c언어 스터디 구합니다.', userID: '강아지조아',image: url_5, tag: '#변수 #질문',likes: 2, comments: 0, date: '2023.12.11', content: '매일 밤 온라인에서 모여서 c언어 공부하실 스터디원 모집합니다. 하트 눌러주세요.' };

const Post = () => {
    return(
        <div className='post_background'>
            <div className='post_setting'>
                <div className='post_title'>
                    <p style={{fontWeight:'bold'}}>{postData.title}</p>
                </div>

                <div className='post_username'>
                    <img className='post_profile_img' src={profileImg} alt='프로필 사진' style={{width:'20px', borderRadius: '50%'}}/>
                    <p style={{fontSize:'12px'}}> {postData.userID}</p>
                    <div className='posting_date'>{postData.date}</div>

                    {/* 게시글의 좋아요와 댓글 수 */}
                    <div className='post_info_container'><span className='post-comments'>💬 {postData.comments}</span>
                    <span className='post-like'>💗 {postData.likes}</span></div>
                </div>

                <div className='division-line' style={{borderColor: 'lightgrey'}}/>

                <div className='post_img'>
                    <img src={postData.image} alt='이미지' style={{ width: '500px',borderRadius: '1%' }}/>
                </div>

                <div className='post_content'>
                    <p>{postData.content}</p>
                </div>
                <div className='post_content'>    
                    <p style={{fontSize : '12px', color:'blue'}}>
                        {postData.tag}</p>
                </div>

                <div className='backtoboard_button'>
                    <Link to='/board'>
                    <Button type='primary'style={{ fontSize: '12px', padding: '4px 8px' }}>게시판 돌아가기</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Post;