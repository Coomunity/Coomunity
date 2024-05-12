import React, { useState, useEffect } from 'react';
import { Tabs, List, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import "./Follow.css"
import axios from 'axios';

const url_1 = 'https://www.plainkorean.kr/app/board/attach/image/1824_1637111479000.do'
const url_2 = 'https://simage.lottemart.com/lim/static_root/images/onlinedescr/images/001272/20211118172354640_6Z6FKFUY.png'
const url_3 = 'img/user-profile.png'
const url_4 = 'https://mblogthumb-phinf.pstatic.net/MjAxOTExMDdfMjg1/MDAxNTczMDg2MzI4ODAz.0OIDme4_ilRcp9fHYJ_5GYS48l25G9sc7R7J3R8xtH4g.ev-Q6buJiOKLjxPcsMjYFU7sOMxPM1_L91DCrseZswcg.JPEG.charmed__/1573086327237.jpg?type=w800'

const followData = [
    { profile_img: url_3, nickname: '코린이' },
    { profile_img: url_2, nickname: '코코볼' },
    { profile_img: url_4, nickname: '네로' },
    { profile_img: url_1, nickname: '뽀야미' },
];

const followingData = [
    { profile_img: url_2, nickname: '코코볼' },
    { profile_img: url_3, nickname: '코린이' },
    { profile_img: url_1, nickname: '뽀야미' },
];

// 팔로우 페이지
const Follow = () => {
    const navigate = useNavigate();

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    // 컴포넌트가 처음 렌더링될 때만 실행된다
    useEffect(() => {
        setFollowers(followData);
        setFollowings(followingData);
    }, []);

    // item(유저)를 삭제해 화면에서 보여주지 않는다
    // --> 실제 db에서도 삭제되게 설정
    const deleteItem = (nickname, setItems) => {
        // 삭제할 item을 nickname으로 찾는다
        setItems((items) => items.filter(item => item.nickname !== nickname));
    };

    // 닉네임을 이용해 팔로워 삭제
    const deleteFollower = (nickname) => {
        deleteItem(nickname, setFollowers)
    }

    // 닉네임을 이용해 팔로잉 삭제
    const deleteFollowing = (nickname) => {
        deleteItem(nickname, setFollowings)
    }

    // 페이지 이동
    const handleItemClick = (nickname) => {
        navigate("/mypageview") // MyPageView.js로 이동
    }

    return(
        <Tabs
            className="follow_tabs"
            defaultActiveKey="1"
            size="large"
            centered
            >
            <Tabs.TabPane tab="팔로우" key="1">
                {/* 팔로워 목록을 List로 보여준다 */}
                <List
                    className='follow_list'
                    itemLayout="horizontal"
                    dataSource={followers}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta 
                                style={{ display: 'flex', alignItems: 'center' }}
                                avatar={<Avatar src={item.profile_img} />}  // 프로필 사진
                                title={item.nickname}   //닉네임
                                onClick={() => handleItemClick(item.username)} // 두 번째 아이템 클릭 핸들러
                            />
                            {/* 팔로워 삭제 버튼 */}
                            <button className='follow_delete' onClick={() => deleteFollower(item.nickname)}>삭제</button>
                        </List.Item>
                    )}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="팔로잉" key="2">
                {/* 팔로잉 목록을 List로 보여준다 */}
                <List
                    className='follow_list'
                    itemLayout="horizontal"
                    dataSource={followings}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{ display: 'flex', alignItems: 'center' }}
                                avatar={<Avatar src={item.profile_img} />} // 프로필 사진
                                title={item.nickname} //닉네임
                            />
                            {/* 팔로잉 삭제 버튼 */}
                            <button className='follow_delete' onClick={() => deleteFollowing(item.nickname)}>삭제</button>
                        </List.Item>
                    )}
                />
            </Tabs.TabPane>
        </Tabs>
    );
}

export default Follow;