import React, { useState, useEffect } from "react";
import axios from "axios";
import PostDetail from './PostDetail';

function Post() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      console.log(response); // 값이 들어옴.
      setPost(response.data);
    });
  }, []);

  return (
    <div>
      <h3> 게시글 목록 </h3>
      <table border="1">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>삭제</th>
            <th>조회수</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>생성일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>
          {
            post.map(function (view, i) {
              return <PostDetail view={view} key={i} />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Post;