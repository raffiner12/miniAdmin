import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


// 특정 사용자의 게시글 조회
function UserPosts(props) {
    // 파라미터로 받아온 값
    const { userId } = useParams();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}/posts`)
        .then((response)=>{
            console.log(response); 
			setPosts(response.data);
        },[])
    });


    return (
        <div>
            <h3> 사용자 화면 </h3>
            <table border="1">
                <thead>
                    <tr><td>Id</td>
                        <td>Title</td>
                        <td>Content</td>
                        <td>Deleted</td>
                        <td>ViewCount</td>
                        <td>PublishedAt</td>
                        <th>postCreatedAt</th>
                        <th>postUpdatedAt</th>
                    </tr>
                        {posts.map(posts => 
                        <tr>
                            <td>{posts.postId}</td>
                            <td>{posts.postTitle}</td>
                            <td>{posts.postContent}</td>
                            <td>{posts.postDeleted}</td>
                            <td>{posts.postViewCount}</td>
                            <td>{posts.postPublishedAt}</td>
                            <td>{posts.postCreatedAt}</td>
                            <td>{posts.postUpdatedAt}</td>
                        </tr>
                        )}
                </thead>
            </table>
        </div>
    );
};

export default UserPosts;
