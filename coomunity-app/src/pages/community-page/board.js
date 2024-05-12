import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Select, Button, message, Upload } from 'antd';
import { Input, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './board.css';
import techStacks from '../TechStacks';
import PostList from './boardPost';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const onChange = (e) => {
    console.log('Change:', e.target.value);
  };


// 게시판 종류
const boards = [
    "C", "C#", "C++", "Java", "Python", "Javascript",
    "React", "HTML5", "CSS", "flutter", "Spring", "Kotlin"
];
const boardOptions = boards.map((board) => ({ value: board, label: <Link to={'/' + board}>{board}게시판</Link> }));

// 게시판 안에서의 글 검색 처리
const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
};

const url_1 = 'https://cdn.digitaltoday.co.kr/news/photo/202305/475855_444522_1026.jpg'
const url_2 = 'https://modulabs.co.kr/wp-content/uploads/2023/10/lautaro-andreani-xkBaqlcqeb4-unsplash-1536x1024.jpg'
const url_3='https://cdn.pixabay.com/photo/2014/09/24/14/29/macbook-459196_1280.jpg'
const url_4='https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_1280.jpg'
const url_5='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg'
const url_6='https://cdn.pixabay.com/photo/2017/07/31/14/45/code-2558220_1280.jpg'

const postsData = [
    { title: '이 코드 봐주세요!!ㅠㅠ', image: url_2, tag: '#C #질문', likes: 2, comments: 0 },
    { title: 'GPT 사용 어떻게 생각하시나요?', image: url_1, tag: '#의견 #chatGPT',likes: 1, comments: 0 },
    { title: '노트북 뭐 쓰세용', image: url_3, tag: '#추천',likes: 2, comments: 0 },
    { title: '이거 변수 선언 이렇게 했는데 어떤가요', image: url_4, tag: '#변수 #질문',likes: 2, comments: 0 },
    { title: 'c언어 스터디 구합니다.', image: url_5, tag: '#스터디 #C',likes: 5, comments: 0 },
    { title: 'c 알고리즘 짤 때 꿀팁#4', image: url_6, tag: '#꿀팁 #추천 #좋아요',likes: 3, comments: 0 },
    { title: 'Post 3', image: url_2, tag: '#깃',likes: 2, comments: 0 },
    { title: 'Post 3', image: url_1, tag: '#깃',likes: 4, comments: 0 },
    
    // Add more posts as needed
];

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  
  
const Board = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChangeimg = (info) => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        }
    };
    const uploadButton = (
        <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );
    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState(boardOptions[0].value);
    const [isPosting, setIsPosting] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
      };
    
      const handlePostButtonClick = () => {
        setIsPosting(true);
        setIsSearchVisible(false);
      };

      const handlePostSubmit = () => {
        // 글 작성 완료 후 필요한 로직 추가
        setIsPosting(false);
        setIsSearchVisible(true);
      };

      const handleButtonClick = () => {
        navigate('/c');
    };

    return (
        <div className='board_background'>
            <div className='board_toolbar'>
                <div className='board_select'>
                    {/* 게시판 선택 */}
                    <div className='board_select_img'> 
                        {techStacks.map((stack) => (
                            <span key={stack.name}>
                            {stack.name === selectedValue && (
                                <img src={stack.imageUrl} alt={stack.name} />
                            )}
                            </span>
                        ))}
                    </div>

                    <Select
                        value={selectedValue}
                        onChange={handleChange}
                        style={{ width: '200px', height: '50px' }}
                        bordered={false}
                    >
                        {boardOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                        ))}
                    </Select>
                </div>
            
                {/* 검색창 */}
                {isSearchVisible && (
                <div className='board_search'>
                    <Search
                    style={{ width: '400px' }}
                    placeholder="글 제목, 내용, 댓글 등을 검색해보세요."
                    onSearch={onSearch}
                    enterButton
                    />
                </div>
                )}

            </div> 

            {!isPosting && isSearchVisible && (
            <div className='board_posting'>
                <Button type="primary" onClick={handlePostButtonClick}>
                글 작성
                </Button>
            </div>
            )}

            {/* 글 작성 버튼을 눌렀을 때의 화면 */}
            {isPosting ? (
                <div className='posting_background'>
                    <div className='posting_text'>
                        <p style={{fontWeight:'bold'}}>Tilte</p>
                    </div>
                    <div className='posting_title'>
                        <Input showCount maxLength={50} onChange={onChange} />
                    </div>
                    <div className='text_area'>
                        <TextArea showCount maxLength={2000} onChange={onChange} placeholder="자유롭게 작성해보세요!" />
                    </div>
                    <div className='posting_text'>
                        <p style={{fontWeight:'bold'}}>Tag</p>
                    </div>
                    <div className='posting_tag'>
                        <Input showCount maxLength={30} onChange={onChange} placeholder="#JAVA #질문" />
                    </div>
                    <div className='posting_img'>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={handleChangeimg}
                        >
                            {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                width: '100%',
                                }}
                            />
                            ) : (
                            uploadButton
                            )}
                        </Upload>
                    </div>
                    <div className='posting_button'>
                        {/* <Button type="primary" onClick={handlePostSubmit}> */}
                        <Button type="primary" onClick={handleButtonClick} >
                        게시
                        </Button>
                    </div>
                </div>
            ) : (
                // 글 작성 버튼을 누르지 않았을 때의 화면
                <div className='board_postlist'>
                <PostList posts={postsData} />
                </div>
            )}
            
        </div>
    );
  };
  
  export default Board;
