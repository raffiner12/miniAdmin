import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]); //1-a
  const [newMarch, setNewMarch] = useState([]); // 1-b
  const [avgPost, setAvgPost] = useState([]); // 1-c
  const [totalPost, setTotalPost] = useState([]); // 2-a
  const [newPostAWeek, setNewPostAWeek] = useState([]); // 2-f
  const [postingTop5User, setPostingTop5User] = useState([]);// 3-a
  

  useEffect(() => {
    axios
      .all([
        // 1. 사용자 수
        axios.get(`http://localhost:5000/dashboard/totalUsers`),
        axios.get(`http://localhost:5000/dashboard/MarchNewUser`),
        axios.get(`http://localhost:5000/dashboard/averagePost`),
        // 2. 게시글 수
        axios.get(`http://localhost:5000/dashboard/totalPost`),
        axios.get(`http://localhost:5000/dashboard/newPostsPerWeek`),

        //3. 랭킹
        axios.get(`http://localhost:5000/dashboard/postingTop5User`),
      ])
      .then(
        axios.spread((res1a, res1b, res1d, res2a, res2f, res3a) => {
          console.log("총 사용자 수", res1a);
          console.log("3월 신규 유입된 사용자 수", res1b);
          console.log("res3a", res3a);
          setTotalUsers(res1a.data);
          setNewMarch(res1b.data);
          setAvgPost(res1d.data);
          setTotalPost(res2a.data);
          setNewPostAWeek(res2f.data);
          setPostingTop5User(res3a.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div>
      <h1>Dashboard</h1>
      <h3>1. 사용자 수</h3>
      <div>
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
      <h3>2. 게시글 수</h3>
      <div>
      {totalPost.map(totalPost => (
          <div>
            2-a. 총 게시글 수 : {totalPost[`COUNT(*)`]}
          </div>
        ))}
      </div>
      <div>
      {newPostAWeek.map(newPostAWeek => (
          <div>
            2-f. 최근 일주일 신규 게시글 수 : {newPostAWeek[`COUNT(*)`]}
          </div>
        ))}
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
    </div>
    </>
  )
}

export default Dashboard
