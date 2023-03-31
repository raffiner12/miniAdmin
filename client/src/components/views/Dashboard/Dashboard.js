import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]); //1-a
  const [newMarch, setNewMarch] = useState([]); // 1-b
  const [avgPost, setAvgPost] = useState([]); // 1-c
  const [totalPost, setTotalPost] = useState([]); // 2-a
  

  useEffect(() => {
    axios
      .all([
        // 1. 사용자 수
        axios.get(`http://localhost:5000/dashboard/totalUsers`),
        axios.get(`http://localhost:5000/dashboard/MarchNewUser`),
        axios.get(`http://localhost:5000/dashboard/averagePost`),
        // 2. 게시글 수
        axios.get(`http://localhost:5000/dashboard/totalPost`),
      ])
      .then(
        axios.spread((res1a, res1b, res1d, res2a) => {
          console.log("총 사용자 수", res1a);
          console.log("3월 신규 유입된 사용자 수", res1b);
          console.log("res2a", res2a);
          setTotalUsers(res1a.data);
          setNewMarch(res1b.data);
          setAvgPost(res1d.data);
          setTotalPost(res2a.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
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
    </div>
  )
}

export default Dashboard
