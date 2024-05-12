import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './Nav.css';

import Home from "../Home";
import Ide from "../Ide";
import Community from "../Commu";
import MyPage from '../my-page/MyPage';
import Notif from '../Notif';
import Settings from '../Settings';
import Faq from '../Faq';
import Follow from '../Follow';
import Login from "../Login";
import SignUp from "../signUp/signUp";
import SignUpProfile from '../signUp/signUp_profile';
import SignUp_q1 from '../signUp/signUp_q1';
import SignUp_q2 from '../signUp/signUp_q2';
import SignUp_q3 from '../signUp/signUp_q3';
import SignUp_q4 from '../signUp/signUp_q4';
import SignUp_q5 from '../signUp/signUp_q5';
import MyPageView from '../my-page/MyPageView';
import SignUp_q6 from '../signUp/signUp_q6';
import Board from '../community-page/board';
import Java from '../community-page/java';
import C from '../community-page/c';


const Navigation_1 = () => {
    return (
        <div>
            <nav className='navbar'>
                <img src="img/main_logo.svg" className='main-logo'/>
                <div className='bar-body' id='border'>
                    <div id="space"> </div>
                    <div className='links'>
                        <Link to="/home"><b>Coommunity</b></Link>
                    </div>
                    <div className='links hide'>
                        <Link to="/ide">Ide</Link>
                    </div>
                    <div className='links hide'>
                        <Link to="/board">커뮤니티</Link>
                    </div>
                    <div className='links hide2' id= 'right' style={{marginRight:'100px'}}>
                        <Link to="/login">로그인</Link>
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
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/noti" element={<Notif />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/follow' element={<Follow />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
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
            </Routes>
        </div>
    );
}

export default Navigation_1; 