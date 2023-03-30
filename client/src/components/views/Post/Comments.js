import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentsDetails from "./CommentsDetails";
import htmlParser from "html-react-parser";

// 특정 사용자의 게시글 조회
function Comments() {
  // 파라미터로 받아온 값
  const { postId } = useParams();

  const [infoPost, setInfoPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:5000/posts/${postId}`),
        axios.get(`http://localhost:5000/posts/${postId}/comments`),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log("res1", res1);
          console.log("res2", res2);
          setInfoPost(res1.data);
          setComments(res2.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3> 특정 게시글의 댓글 조회 </h3>
      <div>
        <div>
          {infoPost.map((content) => (
            <div>
              <h2>{content.postTitle}</h2>
              <div>{htmlParser(content.postContent)}</div>
            </div>
          ))}
        </div>
        <hr />
        <table border="1">
          <thead>
            <tr>
              <th>번호</th>
              <th>댓글 내용</th>
              <th>삭제</th>
              <th>작성일</th>
              <th>생성일</th>
              <th>수정일</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(function (post, i) {
              return <CommentsDetails post={post} key={i} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
