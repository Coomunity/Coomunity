import React, { useState, useEffect } from "react";
import "./Settings.css";
import { Button, Input, Radio, Select, Space } from "antd";
import axios from 'axios';
const { Option } = Select;

const positions = ["Android", "iOS", "Web", "Server", "PM", "Design"];
const stacks = ['Kotlin', 'Java', 'Python', 'C', 'C#', 'Spring', 'flutter', 'Swift', 'Firebase', 'figma', 'github', 'SQLite', 'MYSQL', 'MariaDB', 'Dart'];

// const [positions, setPositions] = useState([]);
// const [stacks, setStacks] = useState([]);

// Option으로 바꿔줌
const pOptions = positions.map((position) => (
    <Option key={position} value={position}>
        {position}
    </Option>
));
const sOptions = stacks.map((stack) => (
    <Option key={stack} value={stack}>
        {stack}
    </Option>
));

const Settings = () => {
    const [image, setImage] = useState('img/user-profile.png'); // 프로필 이미지
    const [nickname, setNickname] = useState('코딩 천재');  // 닉네임
    const [introduce, setIntroduce] = useState('안드로이드 개발자입니다😎\n주 사용 언어는 Kotlin입니다\n꾸준히 공부할 수 있도록 노력중입니다\n안드 개발자 맞팔해요( •̀ ω •́ )y');   // 소개글
    const [job, setJob] = useState(3); // 직업
    const [selectedPositions, setSelectedPositions] = useState(['Android']); // 이전에 선택한 포지션
    const [selectedStacks, setSelectedStacks] = useState(['Kotlin', 'Java', 'Python', 'C', 'C#', 'Spring', 'flutter', 'Swift', 'Firebase', 'figma', 'github', 'SQLite', 'MYSQL', 'MariaDB', 'Dart']); // 이전에 선택한 스택
    // 수정 값
    const [newImage, setNewImage] = useState('https://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1438/hot1682326623968.jpg'); // 프로필 이미지
    const [newNickname, setNewNickname] = useState(nickname);  // 수정한 닉네임
    const [newIntroduce, setNewIntroduce] = useState(introduce);   // 수정한 소개글
    const [newJob, setNewJob] = useState(3); // 직업
    const [newPositions, setNewPositions] = useState(selectedPositions); // 수정된 포지션
    const [newStacks, setNewStacks] = useState(selectedStacks);    // 수정된 스택

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
            setIntroduce(userData.introduction);
            setJob(userData.job);
          } catch (error) {
            console.error('Error fetching user information:', error);
          }
        };

        // ************** 포지션 정보 받아오기 (Position) *************
        const fetchUserPositions = async () => {
            try {
                const userId = 2; // 실제 사용자 ID로 대체해주세요

                const userInfo = {
                    id: userId

                }

                const jsonUserInfo = JSON.stringify(userInfo);
                

                const response = await axios.post('http://localhost:8000/user_positions', jsonUserInfo);
                const userPositions = response.data; // 서버에서 가져온 사용자의 포지션 데이터
    
                setSelectedPositions(userPositions); // 포지션 데이터를 상태로 설정
            } catch (error) {
                console.error('Error fetching user positions:', error);
            }
        };

        // ************** 스택 정보 받아오기 (TechStack) **************
        
        const fetchUserStacks = async () => {
            try {
                const userId = 2; // 실제 사용자 ID로 대체해주세요

                const userInfo = {
                    id: userId

                }

                const jsonUserInfo = JSON.stringify(userInfo);

                const response = await axios.post(`http://localhost:8000/get_user_stack`, jsonUserInfo); // 엔드 포인트 수정 필요
                const userStacks = response.data; // 서버에서 가져온 사용자의 포지션 데이터
    
                setSelectedStacks(userStacks); // 포지션 데이터를 상태로 설정
            } catch (error) {
                console.error('Error fetching user stacks:', error);
            }
        };
        fetchUserPositions();
        fetchUserStacks();
        fetchUserInformation();

      }, []);
    

    // 이미지 버튼
    const imageBtnClicked = (e) => {
        document.getElementById('upload-btn').click()
    };
    // 이미지 업로드
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setNewImage(reader.result); // 파일을 읽어들여 newImage에 저장
            };
            reader.readAsDataURL(file);
        }
    };
    // 닉네임 변경
    const handleNickname = (e) => {
        console.log("nickname", e.target.value);
        setNewNickname(e.target.value);
    }
    // 소개 변경
    const handleIntroduce = (e) =>{
        console.log("introduce", e.target.value);
        setNewIntroduce(e.target.value);
    }
    // 직업 선택
    const onJobChange = (e) => { 
        console.log("Job selected", e.target.value);
        setJob(e.target.value);
        setNewJob(e.target.value);
    };
    // 포지션 선택
    const positionChange = (value) => {
        console.log(`Selected: ${value}`);
        setNewPositions(value);
    };
    // 스택 선택
    const stackChange = (value) => {
        console.log(`Selected: ${value}`);
        setNewStacks(value);
    };

    const saveUserInfo = async () => {
        // db에 프로필 이미지, 닉네임, 소개글, 직업 업데이트
        try {
            const userId = 2; // 실제 사용자 ID로 대체해주세요
            const userData = {
                id: userId,
                newImage: newImage, 
                newNickname: newNickname,
                newIntroduce: newIntroduce,
                newJob: newJob
            };
            
            const jsonUserInfo = JSON.stringify(userData);
            const response = await axios.post('http://localhost:8000/user_update', jsonUserInfo);
            console.log('사용자 데이터가 저장되었습니다:', response.data);
            
        } catch (error) {
            console.error('사용자 정보를 저장하는 중 오류가 발생했습니다:', error);
            
        }
    }

    const savePosition = async () => {
        // db에 포지션 추가 및 삭제
        // -> end point 새로파서 동작하는게 좋을듯 하다
        // 추가 : positions에 없고 newPositions에 있으면 추가
        // 삭제 : positions에 있고 newPositions에 없으면 삭제

        // try {
            
        //     const positionsToAdd = newPositions.filter(pos => !positions.includes(pos)); // positions에 없고 newPositions에 있는 경우 추가
        //     const positionsToRemove = positions.filter(pos => !newPositions.includes(pos)); // positions에 있고 newPositions에 없는 경우 삭제
    
            
        //     if (positionsToAdd.length > 0) {
        //         // positionsToAdd를 서버로 보내어 추가하는 작업을 수행합니다.
        //         // 추가하는 코드 작성

        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

                
        //         const userData = {
        //             index: 'insert',
        //             id: userId,
        //             positionsToAdd: positionsToAdd
        //         };

        //         const jsonUserInfo = JSON.stringify(userData);
        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         console.log('추가할 포지션:', positionsToAdd);
        //     }
    
            
        //     if (positionsToRemove.length > 0) {
        //         // positionsToRemove를 서버로 보내어 삭제하는 작업을 수행합니다.
        //         // 삭제하는 코드 작성

        //         const userId = 2; // 실제 사용자 ID로 대체해주세요

        //         const dataToDelete = {
        //             index: 'delete',
        //             id: userId,
        //             positionsToRemove: positionsToRemove
        //         };

        //         const jsonUserInfo = JSON.stringify(dataToDelete);
        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         console.log('삭제할 포지션:', positionsToRemove);
        //     }
    
            
        //     console.log('포지션 정보가 업데이트되었습니다.');
        // } catch (error) {
        //     console.error('포지션 정보를 업데이트하는 중 오류가 발생했습니다:', error);
            
        // }
    }

    const saveStack = async() => {
        // db에 기술 스택 추가 및 삭제
        // -> end point 새로파서 동작하는게 좋을듯 하다
        // 추가 : stacks 없고 newStacks에 있으면 추가
        // 삭제 : stacks 있고 newStacks에 없으면 삭제

        // try {
            
        //     const stacksToAdd = newStacks.filter(sta => !stacks.includes(sta)); // stacks에 없고 newStacks에 있는 경우 추가
        //     const stacksToRemove = stacks.filter(sta => !newStacks.includes(sta)); // stacks에 있고 newStacks에 없는 경우 삭제
    
            
        //     if (stacksToAdd.length > 0) {
        //         // stacksToAdd를 서버로 보내어 추가하는 작업을 수행합니다.
        //         // 추가하는 코드 작성
        //         const userId = 2; // 실제 사용자 ID로 대체해주세요
                
        //         const userData = {
        //             index: 'insert', 
        //             id: userId,
        //             stacksToAdd: stacksToAdd
        //         };

        //         const jsonUserInfo = JSON.stringify(userData);
        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         console.log('추가할 포지션:', stacksToAdd);
        //     }
    
            
        //     if (stacksToRemove.length > 0) {
        //         // stacksToRemove를 서버로 보내어 삭제하는 작업을 수행합니다.
        //         // 삭제하는 코드 작성

        //         const userId = 2; // 실제 사용자 ID로 대체해주세요
        //         const dataToDelete = {
        //             index: 'delete',
        //             id: userId,
        //             stacksToRemove: stacksToRemove
        //         };
        //         const jsonUserInfo = JSON.stringify(dataToDelete);
        //         const response = await axios.post('http://localhost:8000/?', jsonUserInfo);
        //         console.log('삭제할 포지션:', stacksToRemove);
        //     }
    
            
        //     console.log('포지션 정보가 업데이트되었습니다.');
        // } catch (error) {
        //     console.error('포지션 정보를 업데이트하는 중 오류가 발생했습니다:', error);
            
        // }
    }

    return (
        <div className="settings">
            {/* ----상단바---- */}
            <div className="setting_topBar">계정 정보</div>
            
            <div className="settings_user">
                {/* ----프로필 사진---- */}
                <div className="setting_box">
                    <div className="setting_title" style={{ marginTop: "30px" }}>
                        프로필 사진
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                    {/* 이미지 영역 */}
                    <div className="setting_img">
                        {newImage ? ( // 첨부 이미지
                            <div className="setting_img-center">
                                <img
                                    src={newImage}
                                    alt="Uploaded Image"
                                    className="setting_img-size"
                                />
                            </div>
                        ) : (
                        // 기본 이미지
                            <img 
                                src = {image}
                                alt = "Default Image"
                                className="setting_img-size"
                                style={{border: '2px solid #cacaca',
                                borderRadius: '10px'}} />
                        )}
                    </div>
                    {/* 업로드 버튼 */}
                    <label>
                        <Button
                            className="setting_imgUpload-btn"
                            onClick={imageBtnClicked}
                        >
                            이미지 업로드
                        </Button>
                        <input
                            type="file"
                            id="upload-btn"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </label>
                    </div>
                </div>
                {/* <div className='setting_division-line'/> */}

                {/* ----닉네임---- */}
                <div className="setting_box">
                    <div className="setting_title">닉네임</div>
                    <div className="setting_nickname">
                        <input
                            className="setting_input" 
                            type="text" 
                            placeholder={nickname}
                            onChange={handleNickname}
                            style={{width: '300px',}}
                        />
                        {/* <Button className="setting_duplicate-check" type="primary">중복 확인</Button>
                        <div className="setting_text">
                            <p style={{fontSize : '11px'}}>이미 사용 중인 닉네임입니다.</p>
                        </div> */}
                    </div>

                </div>

                {/* ----소개글---- */}
                <div className="setting_box">
                    <div className="setting_title">소개글</div>
                    <div className="setting_introduce">
                    <textarea
                        className="setting_input"
                        type="text"
                        placeholder={introduce}
                        onChange={handleIntroduce}
                        style={{width: '400px', height: '90px', resize: 'none'}}
                    />
                    </div>
                </div>

                {/* ----직업---- */}
                <div className="setting_box">
                    <div className="setting_title">직업</div>
                    <div className="setting_job">
                    <Radio.Group onChange={onJobChange} value={job}>
                        <Space direction="vertical">
                            <Radio value={1}>중/고등학생</Radio>
                            <Radio value={2}>대학생/대학원생</Radio>
                            <Radio value={3}>개발자</Radio>
                            <Radio value={4}>그외
                                {job === 4 ? (
                                    <Input style={{width: 100, marginLeft: 10}}/>
                                ) : null}
                            </Radio>
                        </Space>
                    </Radio.Group>
                    </div>
                    {/* 설정 버튼 */}
                    <div className="setting_save-zone">
                        <Button className="setting_saveBtn" onClick={saveUserInfo}>저장</Button>
                    </div>
                </div>
            </div>

            <div className="settings_user">
                {/* ----포지션---- */}
                <div className="setting_box">
                    <div className="setting_title">포지션</div>
                    <div className="setting_introduce">
                    <Select
                        mode="multiple"
                        size="middle"
                        placeholder="포지션을 선택해주세요."
                        defaultValue={selectedPositions}
                        onChange={positionChange}
                        style={{
                            width: '430px'
                        }}>
                        {pOptions}
                    </Select>
                    </div>
                    {/* 설정 버튼 */}
                    <div className="setting_save-zone">
                        <Button className="setting_saveBtn" onClick={savePosition}>저장</Button>
                    </div>
                </div>
            </div>

            <div className="settings_user">
                {/* ----기술 스택---- */}
                <div className="setting_box">
                    <div className="setting_title">기술 스택</div>
                    <div className="setting_tech">
                        <Select
                            mode="multiple"
                            size="middle"
                            placeholder="사용할 줄 아는 기술 스택을 선택해주세요."
                            defaultValue={selectedStacks}
                            onChange={stackChange}
                            style={{
                                width: '430px'
                            }}>
                            {sOptions}
                        </Select>
                    </div>
                    {/* 설정 버튼 */}
                    <div className="setting_save-zone">
                        <Button className="setting_saveBtn" onClick={saveStack}>저장</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;