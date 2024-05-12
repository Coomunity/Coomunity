import React from 'react';
import { useNavigate } from "react-router-dom";
import './PostList.css';

// 게시글 틀
const PostList = ({ posts }) => {
    const navigate = useNavigate();

    const moveToPost = () =>{
        navigate("/post2")
    }

    return (
        <div className="post-list">
            {posts.map((post, index) => (
                <div className="post_item" key={index} onClick = {moveToPost}>
                    <img src={post.image} alt={`post-${index}`} />
                    <div className="post-details">
                        <p className='post-title'>{post.title}</p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <span className='post-tag'>{post.tag}</span>
                        <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <span className='post-comments'>💬 {post.comments}</span>
                            <span className='post-like'>💗 {post.likes}</span>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
  };
  
  export default PostList;