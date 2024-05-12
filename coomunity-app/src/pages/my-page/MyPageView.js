import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./myPage.css";
import "./PostList.css";
import PostList from './PostList';
import techStacks from '../TechStacks';
import axios from 'axios';

const url_1 = 'https://i0.wp.com/knulab.com/wp-content/uploads/2022/08/div-center-flow.png?resize=1024%2C643&ssl=1'
const url_2 = 'https://sempreupdate.com.br/wp-content/uploads/2022/12/novo-malware-drokbk-usa-o-github-como-um-resolvedor-de-dead-drop-2-scaled.jpg'
const url_3 = 'https://images.velog.io/images/kim-jaemin420/post/0505089b-3e1c-4b5d-9173-e0ab6e321c64/%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3.png'
const url_4 = 'https://t1.daumcdn.net/cfile/tistory/9917423A5F7DCD5A33'

//const [techStack, setTechStacks] = useState([]);
//const [followersCount, setFollowerCounts] = useState([]);
//const [followingCount, setFollowingCounts] = useState([]);
//const [isFollowing, setIsFollowing] = useState([]);

const postsData = [
    { title: '[CSS] 수직 중앙정렬 하는 방법', image: url_1, tag: '#Web #CSS' , likes: 10, comments: 5 },
    { title: '[Github] 깃허브 기초지식 모음', image: url_2, tag: '#Git #Github',likes: 30, comments: 3 },
    { title: '[React] useState, userEffect 써보기', image: url_3, tag: '#Web #React',likes: 16, comments: 10 },
    { title: '[Server] 서버 기초지식 정리', image: url_4, tag: '#Server #Spring',likes: 20, comments: 2 },
    // Add more posts as needed
];

const MyPageView=()=>{
    const navigate = useNavigate();
    const [layoutType, setLayoutType] = useState('four'); // 레이아웃 유형 'four' or 'two'
    const [image, setImage] = useState('https://simage.lottemart.com/lim/static_root/images/onlinedescr/images/001272/20211118172354640_6Z6FKFUY.png');     // 프로필 사진
    const [nickname, setNickname] = useState('코코볼');   // 닉네임
    const [tier, setTier] = useState('🌱코초보');         // 티어
    const [introduce, setIntro] = useState('웹 좋.아.\n🍪비전공자 코코볼입니다\n풀스택 개발자를 목표로 하고있습니다\n현재 서버 공부중입니다📝\n');   // 소개글

    const [techStack, setTechStacks] = useState([techStacks]); // 기술 스택 이름들
    const [userTechStacks, setUserTechStacks] = useState(['Python', 'Java','C++', 'MYSQL', 'Spring', 'React', 'Vue.js', 'TypeScript', 'HTML5', 'CSS', 'Javascript', 'figma', 'github', 'flutter', 'Flask','AmazonEC2', 'AWSLambda', 'PHP', 'MongoDB', 'AmazonDynamoDB']); // DB에서 받아온 기술 스택 이름을 저장

    const [postData, setPostData] = useState([]); // 최근 게시글 정보

    const [isFollowing, setIsFollowing] = useState(true);  // 팔로우 상태
    const [followersCount, setFollowerCounts] = useState(21);   // 팔로워 수
    const [followingCount, setFollowingCounts] = useState(10);   //팔로잉 수

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
        // const fetchUserTechStacks = async () => {
        //     try {
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const userInfo = {
        //             id: userId

        //         }

        //         const jsonUserInfo = JSON.stringify(userInfo);
                

        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         const userTechStacks = response.data; 
    
        //         setTechStacks(userTechStacks); 
        //     } catch (error) {
        //         console.error('Error fetching user techStacks:', error);
        //     }
        // };

        // ************** 팔로워수 받아오기 (FollwerCounts) **************        
        // const fetchFollwerCounts = async () => {
        //     try {
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const userInfo = {
        //             id: userId

        //         }

        //         const jsonUserInfo = JSON.stringify(userInfo);
                

        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         const userFollowerCounts = response.data; 
    
        //         setFollowersCount(userFollowerCounts); 
        //     } catch (error) {
        //         console.error('Error fetching user FollowerCounts:', error);
        //     }
        // };

        // ************** 팔로잉수 받아오기 (FollwingCounts) **************        
        // const fetchFollwingCounts = async () => {
        //     try {
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const userInfo = {
        //             id: userId

        //         }

        //         const jsonUserInfo = JSON.stringify(userInfo);
                

        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         const userFollowingCounts = response.data; 
    
        //         setFollowingsCount(userFollowingCounts); 
        //     } catch (error) {
        //         console.error('Error fetching user FollowingCounts:', error);
        //     }
        // };

        // ************** 팔로우 상태 받아오기 (IsFollowing) **************        
    //     const fetchIsFollowing = async () => {
    //         try {
    //             const userId = 2; // 실제 사용자 ID로 대체해주세요

    //             const userInfo = {
    //                 id: userId

    //             }

    //             const jsonUserInfo = JSON.stringify(userInfo);
                

    //             const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
    //             const userIsFollowing = response.data; 
    
    //             setIsFollowing(userIsFollowing); 
    //         } catch (error) {
    //             console.error('Error fetching user userIsFollowing:', error);
    //         }
    //     };

    //     fetchUserTechStacks();
    //     fetchFollwerCounts();
    //     fetchFollwingCounts();
    //     fetchIsFollowing();
    //     fetchUserInformation();

      }, []);
    
    // DB에 저장된 사용자 스택만 필터링
    const selectedTechStacks = techStacks
        .filter(stack => userTechStacks.includes(stack.name))
        .map(stack => ({ name: stack.name, imageUrl: stack.imageUrl }));

    const toggleFollow = () => {
        if (isFollowing) {
            // 언팔로우
            setFollowerCounts((prevCount) => prevCount - 1);
          } else {
            // 팔로우
            setFollowerCounts((prevCount) => prevCount + 1);
          }
        setIsFollowing(!isFollowing);   // 버튼 클릭시 팔로우 상태 변경
        console.log("Now following", !isFollowing)
    };

    const toFollowInfo = () => {
        navigate("/follow") // Follow.js로 이동
    }

    const toggleFourLayout = () => {
        setLayoutType('four');  // 게시글 4개 보기
    };
    const toggleTwoLayout = () =>{
        setLayoutType('two');   // 게시글 2개 보기
    }

    const updateIsFollowing = async () => {
        
        // try {
        //     const targetUserId = 2; // 실제 팔로잉 되는 사람의 id로 대체
        //     const followerUserId = 3; // 실제 팔로우하는 사람의 id로 대체
        //     const userData = {

        //         targetUserId: targetUserId,
        //         followerUserId: followerUserId,
        //         isFollowing: isFollowing
                
        //     };
            
        //     const jsonUserInfo = JSON.stringify(userData);
        //     const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //     console.log('팔로우 상태가 저장되었습니다:', response.data);
            
        // } catch (error) {
        //     console.error('팔로우 상태를 저장하는 중 오류가 발생했습니다:', error);
            
        // }
    }
    
    return(
        <section className='myPage'>
            <div className='my_center'>
                <div className='my_visit'>
                    {/* <span>오늘 </span>
                    <span>11</span>
                    <span style={{marginLeft: '20px'}}>전체 </span>
                    <span>100</span>
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
                        </div>

                        <div className='my_follow-container' style={{marginTop: '15px'}}>
                            <span onClick={toFollowInfo}>팔로워&nbsp;</span>
                            <span className='follow_num' onClick={toFollowInfo}>{followersCount}</span>
                            <span onClick={toFollowInfo}>팔로잉&nbsp;</span>
                            <span className='follow_num' onClick={toFollowInfo}>{followingCount}</span>
                            <button
                                onClick={toggleFollow}
                                style={{
                                    backgroundColor: isFollowing ? '#D0D0D0' : '#3b8aff', //회색, 파랑
                                    color: 'white',
                                    padding: '5px 8px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold'
                                }}
                                >
                                {isFollowing ? '팔로잉' : '팔로우'}
                            </button>
                        </div>

                        <div style={{float: 'left', fontSize: '14px', marginLeft: '35px', width: 'calc(100% - 47px)', maxWidth: '255px', minWidth: '210px'}}>
                            {/* 7줄 작성 가능 */}
                            <div className='my_introduce'>{introduce}</div>
                        </div>

                        <ul className='my_post-info'>
                            <li className='my_post-name' style={{fontWeight: '600'}}>전체 게시판&nbsp;&nbsp;
                                <span id='whole_post' style={{fontWeight: '0'}}>15</span>
                            </li>
                            <div className='division-line'/>
                            <li className='my_post-name'>자유
                                <span className='my_post-num' id='free_post'>0</span>
                            </li>
                            <li className='my_post-name'>질문
                                <span className='my_post-num' id='whole_post'>15</span>
                            </li>
                            <li className='my_post-name'>정보
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
                            <div className='my_current-post'>
                                {layoutType === 'four' ? (
                                    <div>
                                        {/* Four Layout */}
                                        <div className='post-four'>
                                            <PostList posts={postsData} />
                                            {/* 아래는 db 데이터 띄우기 */}
                                            {/* <PostList posts={postData} /> */}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
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

export default MyPageView;