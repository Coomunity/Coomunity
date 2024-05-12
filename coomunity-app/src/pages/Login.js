import React from 'react';
import './Login.css';
import axios from 'axios';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";

import logo from '../logo/logo.png';
import {Routes, Route, Link, useHistory, useNavigate } from 'react-router-dom';
import Home from "./Home";
import { Button } from 'antd';


const Login=()=>{

    const handleButtonClick = async () => {
        try {
            const ID = 3222989;
            await axios.delete('http://localhost:8000/user_delete', {
                params: { id: ID },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('User deleted successfully.');
            // 여기에서 다음 동작 수행
        } catch (error) {
            console.error('Error during user deletion:', error);
            // 여기에서 에러 처리 또는 다음 동작 수행
        }
    };
    const handleLogin = async (data) => {
        try {
            const { response, profile } = data;
          
            // 서버로 전송할 데이터 구성
            const user_id = parseInt(profile.id / 1000)
            
            // 로그인 요청
            const loginresponse = await axios.post('http://localhost:8000/login', {
                user_id: user_id,
            });
    
            if (loginresponse.data.success) {
                console.log('Login successful');
            } else {
                console.error('Login failed:', loginresponse.data.message);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    const navigate = useNavigate();
    console.log("로그인");
    const clientId = '982543177140-558c2gf5l6v8rs8bcv7l1j5ej7hs3oko.apps.googleusercontent.com'
    const kakaoClientId ='5f881eee463179115ad219baa36f1574'
    
    const kakaoOnSuccess = async (data)=>{
        try {
            const { response, profile } = data;
          
            // 서버로 전송할 데이터 구성
            const userData = {
                id: parseInt(profile.id / 1000)
            };
          
            // 서버로 데이터 전송
            const serverResponse = await axios.post('http://localhost:8000/user_signup', userData);

            console.log('Server Response:', serverResponse);
          
            if (serverResponse.data.success) {
                console.log('User registration successful');
            } else {
                console.error('User registration failed:', serverResponse.data.message);
            }
            } catch (error) {
                console.error('Error during Kakao login:', error);
            }
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    const handleUserExits = async (data) => {
        try{

            const { response, profile } = data;

            const userData = {
                id: parseInt(profile.id / 1000)
            };

            const ID = userData.id;

            const userExistsresponse = await axios.get('http://localhost:8000/user_search', {
            params: {
                id: ID,
            },

            });

            const { userExists } = userExistsresponse.data;

            if (userExists) {
                // 유저가 존재하는 경우 처리
                handleLogin(data);
                navigate('/home');
                console.log('유저가 존재합니다.');
            } else {
                // 유저가 존재하지 않는 경우 처리
                kakaoOnSuccess(data);
                navigate('/signup');
                console.log('유저가 존재하지 않습니다.');
            }
        } catch (error) {
            console.error('서버에서 데이터를 가져오는 도중 오류 발생:', error);
        }
    }


    // const handleGoogleLoginSuccess = async (response) => {
    //     try {
    //     const { credential, clientId, select_by } = response;
      
    //     // 서버로 전송할 데이터 구성
    //     const userData = {
    //         id: credential
    //     };
      
    //     // 서버로 데이터 전송
    //     const serverResponse = await axios.post('http://localhost:8000/user_signup', userData);
      
    //     if (serverResponse.data.success) {
    //         console.log('User registration successful');
    //     } else {
    //         console.error('User registration failed:', serverResponse.data.message);
    //     }
    //     } catch (error) {
    //         console.error('Error during Google login:', error);
    //     }
    // };
      
    // const handleGoogleLoginFailure = (error) => {
    //     console.error('Google login failed:', error);
    // };

    return(
        <div className='background_login'>
            <div className='logo_container'>
                <img src={logo} alt='logo' style={{ width: '100px', height: 'auto' }} />
                <h1 style={{fontSize : '20px'}}>coomunity</h1>
            </div>
            <div className='text_login'><h1 style={{fontSize : '20px', fontWeight : 'bold'}}>소셜 로그인</h1></div>
            {/* <div className='login_container'>
                <GoogleOAuthProvider clientId={clientId} >
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                    />
                </GoogleOAuthProvider>
            </div> */}

            <div className='login_container'>
            <KakaoLogin
                    token={kakaoClientId}
                    onSuccess={handleUserExits}
                    onFail={kakaoOnFailure}
                    style={{ width: '195px', height: '40px', fontWeight: 'bold', fontSize: '15px', backgroundColor: '#FEE500', color: 'black', border: 'none', borderRadius: '3px', padding: '5px 10px' }}
                />
            </div>
            <Button onClick={handleButtonClick}>아이디 지우기</Button>
        </div>
    );
}

export default Login;