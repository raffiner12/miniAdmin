import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]); //1-a
  const [newMarch, setNewMarch] = useState([]); // 1-b
  const [avgPost, setAvgPost] = useState([]); // 1-c
  const [totalPost, setTotalPost] = useState([]); // 2-a
  const [avgViewCount,setAvgViewCount]=useState([]); //2-b
  const [avgCommentCount, setAvgCommentCount]=useState([]); //2-c
  const [marchNewPosts, setMarchNewPosts]=useState([]); //2-d
  const [avgViewCountInMarch, setAvgViewCountInMarch]=useState([]); //2-e
  const [newPostAWeek, setNewPostAWeek] = useState([]); // 2-f
  const [avgViewCountPerWeek, setAvgViewCountPerWeek]=useState([]); //2-g
  const [postingTop5User, setPostingTop5User] = useState([]);// 3-a
  const [commentTop5Post, setCommentTop5Post]=useState([]); //3-b
  console.log(avgViewCountInMarch);
  

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
        axios.get(`http://localhost:5000/dashboard/avgCommentCount`),
        axios.get(`http://localhost:5000/dashboard/MarchNewPosts`),
        axios.get(`http://localhost:5000/dashboard/avgViewCountInMarch`), //e
        axios.get(`http://localhost:5000/dashboard/newPostsPerWeek`),
        axios.get(`http://localhost:5000/dashboard/avgViewCountPerWeek`), //g
        //3. 랭킹
        axios.get(`http://localhost:5000/dashboard/postingTop5User`),
        axios.get(`http://localhost:5000/dashboard/commentTop5Posting`),
      ])
      .then(
        axios.spread((res1a, res1b, res1d, res2a, res2b, res2c, res2d, res2e, res2f, res2g, res3a, res3b) => {
          console.log("총 사용자 수", res1a);
          console.log("3월 신규 유입된 사용자 수", res1b);
          console.log("res2e", res2e); // 여기까지는 값을 받아 옴.
          console.log("res2g", res2g);
          setTotalUsers(res1a.data);
          setNewMarch(res1b.data);
          setAvgPost(res1d.data);
          setTotalPost(res2a.data);
          setAvgViewCount(res2b.data);
          setAvgCommentCount(res2c.data);
          setMarchNewPosts(res2d.data);
          setAvgViewCountInMarch(res2e.data);
          setNewPostAWeek(res2f.data);
          setAvgViewCountPerWeek(res2g.data);
          setPostingTop5User(res3a.data);
          setCommentTop5Post(res3b.data);
          console.log(avgViewCountInMarch);
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
          <div>{totalUsers.map((totalUsers) => (
            <p> a. 총 사용자 수 : {totalUsers[`COUNT(*)`]} </p>))}
          </div>
          <div>{newMarch.map(newMarch => (
            <p> b. 3월 신규 유입된 사용자 수 : {newMarch[`COUNT(*)`]} </p>))}
          </div>
          <div>
          {avgPost.map(avgPost => (
            <p>
              c.<br />
              d. 사용자 당 평균 게시글 수 : {avgPost[`avg_posts_per_user`]}
            </p>))}
          </div>
      </div>

      <hr/>
      <div>
        <h3>2. 게시글 수</h3>
          <div>{totalPost.map(totalPost => ( 
            <p> a. 총 게시글 수 : {totalPost[`COUNT(*)`]} </p> ))}
          </div>
          <div>{avgViewCount.map(avgViewCount => ( 
            <p> b. 평균 조회수 : {Math.round(avgViewCount[`avg_viewCount_per_post`])} </p> ))}
          </div>
          <div>{avgCommentCount.map(avgCommentCount => ( 
            <p> c. 게시글 당 평균 댓글의 수 : {Math.round(avgCommentCount[`avg_comment_per_post`])} </p> ))}
          </div>
          <div>{marchNewPosts.map(marchNewPosts => ( 
            <p> d. 3월 신규 게시글 수 : {marchNewPosts[`COUNT(*)`]} </p> ))}
          </div>
          <div>{avgViewCountInMarch.map(avgViewCountInMarch => (
            <p> e. 3월 신규 게시글의 평균 조회수 : {Math.round(avgViewCountInMarch[`AVG(postViewCount)`])} </p> ))}
          </div>
          <div>{newPostAWeek.map(newPostAWeek => (
            <p> f. 최근 일주일 신규 게시글 수 : {newPostAWeek[`COUNT(*)`]} </p> ))}
          </div>
          <div>{avgViewCountPerWeek.map(avgViewCountPerWeek => (
            <p> g. 최근 일주일 신규 게시글의 평균 조회수 : {avgViewCountPerWeek[`AVG(postViewCount)`]} </p> ))}
          </div>
      </div>
    
      <hr />
      <div> 
        <h3>3. 랭킹</h3>
          <h4>a. 가장 포스팅 수가 많은 사용자 Top 5 : </h4>
          <div>
            <b>Id / 포스팅 수</b>
            {postingTop5User.map(postingTop5User => (
              <div>
                <ul><li>{postingTop5User.userId}, {postingTop5User.count}</li></ul>
              </div> ))}
          </div>
          <h4>b. 가장 댓글 수가 많은 게시글 Top 5 : </h4>
          <div>
          <b>PostId / 댓글 수</b>
          {commentTop5Post.map(commentTop5Post => (
            <div>
              <ul><li>{commentTop5Post.postId}, {commentTop5Post.count}</li></ul>
            </div> ))}
          </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
