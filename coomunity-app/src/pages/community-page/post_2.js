import React, { useState } from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const url_1 = 'https://cdn.digitaltoday.co.kr/news/photo/202305/475855_444522_1026.jpg'

// 글 작성자의 프로필 사진
const profileImg = 'https://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1438/hot1682326623968.jpg'
const url_5='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49ae1yOIdmmo1WlNx8Xpkxwwgcfnfcg_6jw&usqp=CAU'

const postData = { title: '[Github] 내가 경험한 commit 오류들 해결', userID: '코딩 천재',image: url_5, tag: '#github', likes: 3, comments: 1, date: '2023.12.11', content: '그동안 깃을 사용하면서 겪은 commit 오류들을 간단하게 정리해봤습니다.\n\n1. commit 이후 push를 하려고 할 때 되지 않음\n\n이는 먼저 pull을 받아올게 있는지 확인해야합니다. 이에 fetch를 사용합니다.' };

const Post2 = () => {
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
export default Post2;