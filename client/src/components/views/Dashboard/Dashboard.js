import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]);
  const [newMarch, setNewMarch] = useState([]);
  const [avgPost, setAvgPost] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:5000/dashboard/totalUsers`),
        axios.get(`http://localhost:5000/dashboard/MarchNewUser`),
        axios.get(`http://localhost:5000/dashboard/averagePost`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          console.log("총 사용자 수", res1);
          console.log("3월 신규 유입된 사용자 수", res2);
          console.log("res3", res3);
          setTotalUsers(res1.data);
          setNewMarch(res2.data);
          setAvgPost(res3.data);
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
    </div>
  )
}

export default Dashboard
