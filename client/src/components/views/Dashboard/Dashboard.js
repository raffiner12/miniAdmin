import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]); //1-a
  const [newMarch, setNewMarch] = useState([]); // 1-b
  const [avgPost, setAvgPost] = useState([]); // 1-c
  const [totalPost, setTotalPost] = useState([]); // 2-a
  const [avgViewCount,setAvgViewCount]=useState([]); //2-b
  //const []=useState([]); //2-c
  //const []=useState([]); //2-d
  //const []=useState([]); //2-e
  const [newPostAWeek, setNewPostAWeek] = useState([]); // 2-f
  //const []=useState([]); //2-g
  const [postingTop5User, setPostingTop5User] = useState([]);// 3-a
  const [commentTop5Post, setCommentTop5Post]=useState([]); //3-b

  

  useEffect(() => {
    axios
      .all([
        // 1. 사용자 수
        axios.get(`http://localhost:5000/dashboard/totalUsers`),
        axios.get(`http://localhost:5000/dashboard/MarchNewUser`),
        axios.get(`http://localhost:5000/dashboard/averagePost`),
        // 2. 게시글 수
        axios.get(`http://localhost:5000/dashboard/totalPost`),
        axios.get(`http://localhost:5000/dashboard/avgViewCount`),
        axios.get(`http://localhost:5000/dashboard/newPostsPerWeek`),

        //3. 랭킹
        axios.get(`http://localhost:5000/dashboard/postingTop5User`),
        axios.get(`http://localhost:5000/dashboard/commentTop5Posting`),
      ])
      .then(
        axios.spread((res1a, res1b, res1d, res2a, res2b, res2f, res3a, res3b) => {
          console.log("총 사용자 수", res1a);
          console.log("3월 신규 유입된 사용자 수", res1b);
          console.log("res2b", res2b);
          setTotalUsers(res1a.data);
          setNewMarch(res1b.data);
          setAvgPost(res1d.data);
          setTotalPost(res2a.data);
          setAvgViewCount(res2b.data);
          setNewPostAWeek(res2f.data);
          setPostingTop5User(res3a.data);
          setCommentTop5Post(res3b.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div>
      <div>
        <h1>Dashboard</h1>
        <h3>1. 사용자 수</h3>
        
          {totalUsers.map((totalUsers) => (
            <div>
              1-a. 총 사용자 수 : {totalUsers[`COUNT(*)`]}
            </div>
          ))}
          {newMarch.map(newMarch => (
            <div>
              1-b. 3월 신규 유입된 사용자 수 : {newMarch[`COUNT(*)`]}
            </div>
          ))}
          {avgPost.map(avgPost => (
            <div>
              1-c.<br />
              1-d. 사용자 당 평균 게시글 수 : {avgPost[`avg_posts_per_user`]}
              <br />
              <hr />
            </div>
          ))}
      </div>
      <div>
        <h3>2. 게시글 수</h3>
        <div>{totalPost.map(totalPost => ( 
          <p> 2-a. 총 게시글 수 : {totalPost[`COUNT(*)`]} </p> ))}
        </div>
        <div>{avgViewCount.map(avgViewCount => ( 
          <p> 2-b. 평균 조회수 : {Math.round(avgViewCount[`avg_viewCount_per_post`])} </p> ))}
        </div>
        <div>
          {newPostAWeek.map(newPostAWeek => (
          <p> 2-f. 최근 일주일 신규 게시글 수 : {newPostAWeek[`COUNT(*)`]} </p> ))}
        </div>
      </div>
    
      <div> 
        <h3>3. 랭킹</h3>
        <h4>3-a. 가장 포스팅 수가 많은 사용자 Top 5 : </h4>
        <div>
          <b>Id / 포스팅 수</b>
          {postingTop5User.map(postingTop5User => (
            <div>
              <ul>
                <li>{postingTop5User.userId}, {postingTop5User.count}</li>
              </ul>
            </div>
          ))}
        </div>
          <h4>3-b. 가장 댓글 수가 많은 게시글 Top 5 : </h4>
          <div>
          <b>PostId / 댓글 수</b>
          {commentTop5Post.map(commentTop5Post => (
            <div>
              <ul>
                <li>{commentTop5Post.postId}, {commentTop5Post.count}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
