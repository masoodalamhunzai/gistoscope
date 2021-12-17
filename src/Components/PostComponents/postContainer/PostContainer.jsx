import React from 'react';
import Post from '../Post/Post';
import './PostContainer.css'
import PostHeader from '../PostHeader/PostHeader'
import PostSubject from '../PostSubject/PostSubject';
const PostContainer = () => {
    return (
        <>
            {/* <PostSubject /> */}
            {/* <PostHeader /> */}
            <div className="postContainer">
                <Post />
            </div>
        </>
    )
}

export default PostContainer;