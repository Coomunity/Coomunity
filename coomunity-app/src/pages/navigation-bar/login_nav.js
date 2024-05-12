import React, { useState, useEffect } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';

import Home from "../Home";
import Ide from "../Ide";
import Community from "../Commu";
import MyPage from '../my-page/MyPage';
import Notif from '../Notif';
import Settings from '../Settings';
import Faq from '../Faq';
import Follow from '../Follow';
import MyPageView from '../my-page/MyPageView';
import Login from '../Login';
import Signup from '../signUp/signUp';
import SignUpProfile from '../signUp/signUp_profile';
import SignUp_q1 from '../signUp/signUp_q1';
import SignUp_q2 from '../signUp/signUp_q2';
import SignUp_q3 from '../signUp/signUp_q3';
import SignUp_q4 from '../signUp/signUp_q4';
import SignUp_q5 from '../signUp/signUp_q5';
import SignUp_q6 from '../signUp/signUp_q6';
import Board from '../community-page/board';
import Java from '../community-page/java';
import C from '../community-page/c';
import Post from '../community-page/post';
import Post2 from '../community-page/post_2';



const Navigation_2 = () => {

    const [image, setImage] = useState('https://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1438/hot1682326623968.jpg');
    const [nickname, setNickname] = useState('코딩 천재');
    const [tier, setTier] = useState('⭐코천재');

    // DB에서 닉네임, 티어 정보 가져오기
    useEffect(() => {
        // ************** 사용자 정보 받아오기 (User) *****************
        const fetchUserInformation = async () => {
        //   try {
        //     const userId = 2; // 실제 사용자 ID로 대체
        //     const response = await axios.post('http://localhost:8000/user_information', {
        //         id: userId,
        //     });
    
        //     const userData = response.data;
        //     // console.log(userData);

        //     setImage(userData.profile_picture)
        //     setNickname(userData.nickname);
        //     setTier(userData.coding_skill_level);
        //   } catch (error) {
        //     console.error('Error fetching user information:', error);
        //   }
        };

        // fetchUserInformation();

      }, []);

    // 적용 예시
    // setNickname('코딩초보');
    // setTier('마스터');

    return (
        <div>
            <nav className='navbar'>
                <img src="img/main_logo.svg" className='main-logo'/>
                <div className='bar-body' id='border'>
                    <div id='space'> </div>
                    <div className='links'>
                        <Link to="/home"><b>Coommunity</b></Link>
                    </div>
                    <div className='links hide'>
                        <Link to="/ide">Ide</Link>
                    </div>
                    <div className='links hide'>
                        <Link to="/board">커뮤니티</Link>
                    </div>
                    <div className='links hide3' id='right'>
                        <Link to="/noti"><img src='img/notif-bell.svg' alt='알림'/></Link>
                    </div>
                    <div className='dropDown hide2' id='right'>
                        <Link to="/mypage">마이페이지</Link>
                        <ul className='dropDownMenu'>
                            <li className='menu'>
                                <ul className='profile-container'>
                                    <li className='profile-img'>
                                        <img className='img' src={image}/>
                                    </li>
                                    <li className='profile-text'>
                                        <p className='name'><b>{nickname}</b></p>
                                        <p className='tier'>{tier}</p>
                                    </li>
                                </ul>
                                <ul className='drop-links'>
                                    <li><Link to="/mypageview">홈페이지</Link></li>
                                    <li><Link to="/settings">계정 설정</Link></li>
                                    <li><Link to="/faq">FAQ</Link></li>
                                    <p> </p>
                                    <li><button>로그아웃</button> {/* 로그아웃 연결하기 */}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='logo'>
                    <img src="img/sub_logo.svg" className='sub-logo'/>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ide" element={<Ide />} />
                <Route path="/community" element={<Community />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/noti" element={<Notif />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/follow' element={<Follow />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-profile" element={<SignUpProfile />} />
                <Route path="/signup-q1" element={<SignUp_q1 />} />
                <Route path="/signup-q2" element={<SignUp_q2 />} />
                <Route path="/signup-q3" element={<SignUp_q3 />} />
                <Route path="/signup-q4" element={<SignUp_q4 />} />
                <Route path="/signup-q5" element={<SignUp_q5 />} />
                <Route path="/signup-q6" element={<SignUp_q6 />} />
                <Route path='/mypageview' element={<MyPageView />} />
                <Route path='/board' element={<Board />} />
                <Route path='/java' element={<Java />} />
                <Route path='/c' element={<C />} />
                <Route path='/post' element={<Post />} />
                <Route path='/post2' element={<Post2 />}/>
            </Routes>
        </div>
    );
}

export default Navigation_2; 