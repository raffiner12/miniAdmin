import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


// 특정 사용자의 게시글 조회
function UserPosts() {
    // 파라미터로 받아온 값
    const { userId } = useParams();

    const [posts, setPosts] = useState({
        postId: '', 
        postTitle: '',
        postContent: '', 
        postDeleted: '', 
        postViewCount: '', 
        postPublishedAt: '',
        postCreatedAt:'',
        postUpdatedAt:''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}/posts`)
        .then((response)=>{
            setPosts({
            postId: response.data.postId, 
            postTitle:  response.data.postTitle,
            postContent: response.data.postContent, 
            postDeleted: response.data.postDeleted, 
            postViewCount: response.data.postViewCount, 
            postPublishedAt: response.data.postPublishedAt,
            postCreatedAt: response.data.postCreatedAt,
            postUpdatedAt: response.data.postUpdatedAt})
        },[])
    });

  return (
    <div>
		<h3> 사용자 화면 </h3>
        <table border="1">
            <thead>
                <tr>
                    <th>postId</th>
                    <th>postTitle</th>
                    <th>postContent</th>
                    <th>postDeleted</th>
                    <th>postViewCount</th>
                    <th>postPublishedAt</th>
                    <th>postCreatedAt</th>
                    <th>postUpdatedAt</th>
                </tr>
            </thead>
            <tbody>
                    {/* {
                        posts.map(element =>

                            <tr>
                                <th>postId</th>
                                <th>postTitle</th>
                                <th>postContent</th>
                                <th>postDeleted</th>
                                <th>postViewCount</th>
                                <th>postPublishedAt</th>
                                <th>postCreatedAt</th>
                                <th>postUpdatedAt</th>
                            </tr>
                        )
                    } */}
                </tbody>
            </table>
        </div>
    );
};

export default UserPosts;
