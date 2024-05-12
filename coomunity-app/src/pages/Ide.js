import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import "./ide.css";
import { PlayCircleFilled } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";
import { FileImageOutlined } from "@ant-design/icons";

import axios from "axios";

const Ide = () => {
    const [inputCode, setInputCode] = useState(""); // 입력된 코드
    const [codeOutput, setCodeOutput] = useState(""); // 코드 실행 결과
    const [commentOutput, setCommentOutput] = useState(""); // 주석 붙인 결과
    const [imagePaths, setImagePaths] = useState([]);   //파이썬 튜터 결과 이미지 list
    const [currentImgIndex, setCurrentImgIndex] = useState(0);  // 이미지 index
    const [loading, setLoading] = useState(false);  // 로딩 상태

    const handleCodeChange = (e) => {
        setInputCode(e.target.value);
    };

    const codeInputTabHandler = (e) => {  // Tab 넣어줌
        if (e.key === "Tab") {
            e.preventDefault();

            // 현재 커서 위치 찾기
            const { selectionStart, selectionEnd } = e.target;

            // 현재 커서 위치에 탭 삽입
            const newCode =
            inputCode.substring(0, selectionStart) +
            "\t" +
            inputCode.substring(selectionEnd);

            // 변경된 코드 설정
            setInputCode(newCode);

            // 커서 위치 조절
            const newCursorPosition = selectionStart + 1;
            e.persist(); // SyntheticEvent를 비동기적으로 사용할 때 필요한 것으로 보입니다.
            setTimeout(() => {
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            });
        }
    };

    const handleExecuteClick = async () => {  // 코드 실행 버튼
        try {
            // currentImageIndex 초기화
            setCurrentImgIndex(0);

            // 코드 실행 전에 로딩 상태를 true로 변경
            setLoading(true);

            // 코드 실행
            const codeResponse = await axios.post("http://localhost:8000/ide", 
            {
                input: inputCode,
            });

            // 주석 추가
            const commentsResponse = await axios.post("http://localhost:8000/add_comment",
            {
                input: inputCode,
            });
            
            // 각 응답을 문자열로 합치고, 각 줄에 마지막에 줄바꿈 추가
            const codeResult = codeResponse.data.join('\n') + '\n';
            const codeComment = commentsResponse.data.join('\n') + '\n';

            setCodeOutput(codeResult);
            console.log(codeResult)
            setCommentOutput(codeComment);
            console.log(codeComment)

        } catch (error) {
            console.error("Error:", error);
        } finally {
            // 코드 실행 후에 로딩 상태를 false로 변경
            setLoading(false);
        }
    };

    const handlePython = async () =>{
        console.log("PT호출");
        try{
            // 파이썬 튜터
            const pythonTutor = await axios.get("http://localhost:8000/pt");

            // 경로 변환 및 저장
            const updatedPaths = pythonTutor.data.map(path => {
                const fileName = path.split('\\').pop(); // Extract the file name from the path
                console.log("경로저장");
                return `code_images/${fileName}`;
            });

            setImagePaths(updatedPaths);
            console.log(updatedPaths);
    
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handlePrevClick = () => {   // 파이썬 이전 버튼
        if (currentImgIndex > 0) {
            setCurrentImgIndex(currentImgIndex - 1);
        }
    };

    const handleNextClick = () =>{    // 파이썬 다음 버튼
        if (currentImgIndex < imagePaths.length - 1) {
            setCurrentImgIndex(currentImgIndex + 1);
        }
    };

    return (
        <section className="idePage">
            <div className="ide_center">
                {/* 코드 입력 */}
                <div className="ide_console">
                    <span className="ide_title">console</span>
                    <textarea
                        className="ide_code"
                        value={inputCode}
                        onChange={handleCodeChange}
                        onKeyDown={codeInputTabHandler}
                        placeholder="코드를 입력해주세요."
                    />
                    <div style={{marginLeft: 'auto'}}>
                        <Button
                            className="ide_execute_btn"
                            shape="circle"
                            icon={<PlayCircleFilled />}
                            onClick={handleExecuteClick}    // 실행 버튼
                        />
                        <Button
                            className="ide_execute_btn"
                            shape="circle"
                            icon = {<FileImageOutlined />}
                            onClick={handlePython}  // 파이썬튜터 버튼
                        />
                    </div>
                </div>
                <div className="ide_resultArea">
                    {/* 각 tab으로 결과값들을 보여준다 */}
                    <Tabs
                        className="follow_tabs"
                        defaultActiveKey="1"
                        size="large"
                        centered
                    >
                        <Tabs.TabPane tab="실행 결과" key="1">
                            {/* 코드 실행 결과 */}
                            <div className="ide_output-box">
                                {/* Add loading indicator */}
                                {loading && <span className='ide_loading'>Loading...</span>}
                                <span className='ide_title'/>
                                <p className="ide_code-result">{codeOutput}</p>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="주석" key="2">
                            {/* 주석 실행 결과 */}
                            <div className="ide_output-box">
                                {/* Add loading indicator */}
                                {loading && <span className='ide_loading'>Loading...</span>}
                                <span className='ide_title'/>
                                <p className="ide_comment-result">{commentOutput}</p>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='파이썬 튜터' key="3">
                            {/* 파이썬 튜터 실행 결과 */}
                            <div className="ide_python-box">
                                <div className='ide_buttons'>
                                    <Button
                                        className="ide_prev_btn"
                                        shape="circle"
                                        icon={<LeftOutlined />}
                                        onClick={handlePrevClick}
                                    />
                                    {/* 페이지 수 */}
                                    <span>
                                        {imagePaths.length === 0 ? '0/0' : `${currentImgIndex + 1} / ${imagePaths.length}`}
                                    </span>
                                    <Button
                                        className="ide_next_btn"
                                        shape="circle"
                                        icon={<RightOutlined />}
                                        onClick={handleNextClick}
                                    />
                                </div>
                                <div className='ide_python-result'>
                                    <div className='ide_index'>
                                        {/* 현재 이미지가 몇번째 줄 코드의 이미지인지 보여줌 */}
                                        {imagePaths[currentImgIndex] && (
                                            <span>
                                                {imagePaths[currentImgIndex].match(/\d+/)}번째 줄 코드 이미지
                                            </span>
                                        )}
                                    </div>
                                    <img
                                        className='ide_result-img'
                                        src={imagePaths[currentImgIndex]}
                                        alt={` 버튼을 눌러 파이썬튜터를 실행시켜주세요.`}
                                    />
                                </div>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default Ide;
