import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./myPage.css";
import "./PostList.css";
import PostList from './PostList';
import techStacks from '../TechStacks';
import axios from 'axios';

const url_1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49ae1yOIdmmo1WlNx8Xpkxwwgcfnfcg_6jw&usqp=CAU'
const url_2 = 'https://velog.velcdn.com/images/effirin/post/712a0f02-ef8f-41ea-a315-824ad2acf812/image.png'
const url_3 = 'https://images.velog.io/images/changhee09/post/3310d888-7c85-4d57-a795-e53920f6286e/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C.jpg'
const url_4 = 'https://blog.kakaocdn.net/dn/bGsjCe/btrsWMAmjsX/R32UWU6bM472iE8RsK5FrK/img.png'
//const [techStack, setTechStacks] = useState([]);
//const [followersCount, setFollowerCounts] = useState([]);
//const [followingCount, setFollowingCounts] = useState([]);

const postsData = [
    { title: '[Github] 내가 경험한 commit 오류들 해결', image: url_1, tag: '#github',likes: 3, comments: 1 },
    { title: '[Android] SharedPreferences 개념 정리', image: url_3, tag: '#Kotlin #Android', likes: 10, comments: 5 },
    { title: '[Kotlin] SQLite를 이용해 값 저장하기', image: url_2, tag: '#Android #SQLite',likes: 15, comments: 4 },
    { title: '[Kotlin] 카카오톡 API 연동하기', image: url_4, tag: '#Android #Kotlin',likes: 20, comments: 5 },
    // Add more posts as needed
];

const MyPage=()=>{
    const navigate = useNavigate();
    // https://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1438/hot1682326623968.jpg
    // 안드로이드 개발자입니다😎\n주 사용 언어는 Kotlin입니다\n꾸준히 공부할 수 있도록 노력중입니다\n안드 개발자 맞팔해요( •̀ ω •́ )y
    const [layoutType, setLayoutType] = useState('four'); // 레이아웃 유형 'four' or 'two'
    const [image, setImage] = useState('https://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1438/hot1682326623968.jpg');     // 프로필 사진
    const [nickname, setNickname] = useState('코딩 천재');   // 닉네임
    const [tier, setTier] = useState('⭐코천재');         // 티어
    const [introduce, setIntro] = useState('안드로이드 개발자입니다😎\n주 사용 언어는 Kotlin입니다\n꾸준히 공부할 수 있도록 노력중입니다\n안드 개발자 맞팔해요( •̀ ω •́ )y');   // 소개글

    const [techStack, setTechStacks] = useState([techStacks]); // 기술 스택 이름들
    const [userTechStacks, setUserTechStacks] = useState(['Kotlin', 'Java', 'Python', 'C', 'C#', 'Spring', 'flutter', 'Swift', 'Firebase', 'figma', 'github', 'SQLite', 'MYSQL', 'MariaDB', 'Dart']); // DB에서 받아온 기술 스택 이름을 저장

    const [postData, setPostData] = useState([]); // 최근 게시글 정보

    const [followersCount, setFollowerCounts] = useState(2);   // 팔로워 수
    const [followingCount, setFollowingCounts] = useState(1);   //팔로잉 수

    useEffect(() => {
        // ************** 사용자 정보 받아오기 (User) *****************
        const fetchUserInformation = async () => {
            try {
                const userId = 2; // 실제 사용자 ID로 대체
                const response = await axios.post('http://localhost:8000/user_information', {
                    id: userId,
                });
        
                const userData = response.data;
                console.log(userData);

                setImage(userData.profile_picture)
                setNickname(userData.nickname);
                setIntro(userData.introduction);
                setTier(userData.coding_skill_level);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        // ************** 스택 정보 받아오기 (TechStack) **************
        const fetchUserTechStacks = async () => {
            try {
                const userId = 2; // 실제 사용자 ID로 대체해주세요

                const userInfo = {
                    id: userId

                }

                const jsonUserInfo = JSON.stringify(userInfo);
                

                const response = await axios.post('http://localhost:8000/get_user_stack', jsonUserInfo);
                const userTechStacks = response.data; // 서버에서 가져온 사용자의 포지션 데이터
    
                setTechStacks(userTechStacks); // 포지션 데이터를 상태로 설정
            } catch (error) {
                console.error('Error fetching user techStacks:', error);
            }
        };

        // ************** 팔로워수 받아오기 (TechStack) **************        
        // const fetchFollwerCounts = async () => {
        //     try {
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const userInfo = {
        //             id: userId

        //         }

        //         const jsonUserInfo = JSON.stringify(userInfo);
                

        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         const userFollowerCounts = response.data; // 서버에서 가져온 사용자의 포지션 데이터
    
        //         setFollowerCounts(userFollowerCounts); // 포지션 데이터를 상태로 설정
        //     } catch (error) {
        //         console.error('Error fetching user FollowerCounts:', error);
        //     }
        // };

        // ************** 팔로잉수 받아오기 (TechStack) **************        
        // const fetchFollwingCounts = async () => {
        //     try {
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const userInfo = {
        //             id: userId

        //         }

        //         const jsonUserInfo = JSON.stringify(userInfo);
                

        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         const userFollowingCounts = response.data; // 서버에서 가져온 사용자의 포지션 데이터
    
        //         setFollowingCounts(userFollowingCounts); // 포지션 데이터를 상태로 설정
        //     } catch (error) {
        //         console.error('Error fetching user FollowingCounts:', error);
        //     }
        // };

        // fetchUserTechStacks();
        // fetchFollwerCounts();
        // fetchFollwingCounts();
        // fetchUserInformation();

      }, []);
    
    // DB에 저장된 사용자 스택만 필터링
    const selectedTechStacks = techStacks
        .filter(stack => userTechStacks.includes(stack.name))
        .map(stack => ({ name: stack.name, imageUrl: stack.imageUrl }));

    const toggleFourLayout = () => {
        setLayoutType('four');  // 게시글 4개 보기
    };
    const toggleTwoLayout = () =>{
        setLayoutType('two');   // 게시글 2개 보기
    }

    const toUserEdit = () => {
        navigate("/settings");  // Settings.js로 이동
    }
    const toFollowInfo = () => {
        navigate("/follow") // Follow.js로 이동
    }

    return(
        <section className='myPage'>
            <div className='my_center'>
                <div className='my_visit'>
                    {/* <span>오늘 </span>
                    <span>11</span>
                    <span style={{marginLeft: '20px'}}>전체 </span>
                    <span>50</span>
                    <button className='myPage_setting'>편집</button> */}
                </div>
                <div className='my_contents'>
                    {/* 왼쪽 영역 */}
                    <section className='my_left'>
                        <div className='my_profile-img'>
                            <img className='my_img' src={image} />
                        </div>
                        <div className='my_info'>
                            <span className='my_name'>{nickname}</span>
                            <span className='my_tier'>{tier}</span>
                            <button className='my_info_setting' onClick={toUserEdit}>개인 정보 수정</button>
                        </div>

                        <div className='my_follow-container'
                            onClick={toFollowInfo}>
                            <span >팔로워&nbsp;</span>
                            <span className='follow_num'>{followersCount}</span>
                            <span>팔로잉&nbsp;</span>
                            <span className='follow_num'>{followingCount}</span>
                        </div>

                        <div style={{float: 'left', fontSize: '14px', marginLeft: '35px', width: 'calc(100% - 47px)', maxWidth: '255px', minWidth: '210px'}}>
                            {/* 7줄 작성 가능 */}
                            <div className='my_introduce'>{introduce}</div>
                        </div>

                        <ul className='my_post-info'>
                            <li className='my_post-name' style={{fontWeight: '600'}}>전체 게시판&nbsp;&nbsp;
                                <span id='whole_post'>5</span>
                            </li>
                            <div className='division-line'/>
                            <li className='my_post-name'>자유
                                <span className='my_post-num' id='free_post'>0</span>
                            </li>
                            <li className='my_post-name'>언어
                                <span className='my_post-num' id='whole_post'>5</span>
                            </li>
                            <li className='my_post-name'>질문
                                <span className='my_post-num' id='whole_post'>0</span>
                            </li>
                            <li className='my_post-name'>취업
                                <span className='my_post-num' id='whole_post'>0</span>
                            </li>
                        </ul>
                    </section>
                    {/* 오른쪽 영역 */}
                    <section className='my_right'>
                        {/* 기술 스택 */}
                        <div className='rightTop-box'>
                            <span className='my_post-type'>기술 스택</span>
                            <div className='division-line' style={{borderColor: '#8DB4EF'}}/>
                            <div className='my_techstacks'>
                                {/* TechStacks.js에 들어있는 img태그들을 보여준다 */}
                                {selectedTechStacks.map((stack) => (
                                    <span key={stack.name} style={{marginRight:'10px'}}>
                                        <img src={stack.imageUrl} alt={stack.name}/>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* 최근 게시글 */}
                        <div className='rightBottom-box'>
                            <div className='my_postBox'>
                                <span className='my_post-type'>최근 게시글</span>
                                {/* 변환 버튼 */}
                                <div style={{ display:'flex',
                                    alignItems:'center', 
                                    marginRight: '40px'
                                }}>
                                    <img className='my_post_btn'
                                        src='img/four_btn.png' 
                                        onClick={toggleFourLayout}/>
                                    <img className='my_post_btn'
                                        src='img/two_btn.png'
                                        onClick={toggleTwoLayout}/>
                                </div>
                            </div>
                            <div className='division-line' style={{borderColor: '#8DB4EF'}}/>
                            {/* 4개 혹은 2개로 보여주기 */}
                            <div>
                                {layoutType === 'four' ? (
                                    <div className='my_current-post'>
                                        {/* Four Layout */}
                                        <div className='post-four'>
                                            <PostList posts={postsData}/>
                                            {/* 아래는 db 데이터 띄우기 */}
                                            {/* <PostList posts={postData} /> */}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='my_current-post'>
                                        {/* Two Layout */}
                                        <div className="post-two">
                                            <PostList posts={postsData.slice(0, 2)} />
                                            {/* 아래는 db 데이터 띄우기 */}
                                            {/* <PostList posts={postData.slice(0, 2)} /> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default MyPage;