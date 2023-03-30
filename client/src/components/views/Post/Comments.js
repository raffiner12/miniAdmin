import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import htmlParser from 'html-react-parser';


// 특정 사용자의 게시글 조회
function Comments() {
    // 파라미터로 받아온 값
    const { postId } = useParams();

    const [viewPost, setViewPost] = useState([]);
    // const [comments, setComments] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${postId}/comments`)
        .then((response)=>{
            console.log(response); 
			setViewPost(response.data);
        },[])
    });


    return (
        <div>
            <h3> 특정 게시글의 댓글 조회 </h3>
            <div>
                {viewPost.map(post => 
                    <>
                    <div>
                        <h2>{post.postTitle}</h2>
                    </div>
                    <div>
                        {htmlParser(post.postContent)}
                    </div>
                    </>
                )}
            </div>
        </div>

    );
};

export default Comments;
