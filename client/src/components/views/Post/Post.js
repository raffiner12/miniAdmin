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
            <th>postId</th>
            <th>postTitle</th>
            <th>postDeleted</th>
            <th>postViewCount</th>
            <th>userId</th>
            <th>postPublishedAt</th>
            <th>postCreatedAt</th>
            <th>postUpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {
		  	post.map(function (view, i) {
            return <PostDetail view={view} key={i} />;})
		  }
        </tbody>
      </table>
    </div>
  );
}

export default Post;