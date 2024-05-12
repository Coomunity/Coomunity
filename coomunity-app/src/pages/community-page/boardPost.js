import React from 'react';
import './boardPost.css';
import { useNavigate } from 'react-router-dom';

// 게시글 틀
const PostList = ({ posts }) => {
  const navigate = useNavigate();

  const handlePostClick = (index) => {
    navigate(`/post`);
  };
    return (
      <div className="post-list">
        {posts.map((post, index) => (
            <div className="post-item" key={index} onClick={() => handlePostClick(index)}>
                <img src={post.image} alt={`post-${index}`} />
                <div className="post-details">
                    <p className='post-title'>{post.title}</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span className='post-tag'>{post.tag}</span>
                      <div>
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