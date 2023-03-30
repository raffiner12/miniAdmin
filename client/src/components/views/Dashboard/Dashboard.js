import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]);
  const [newMarch, setNewMarch] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:5002/dashboard/totalUsers`),
        axios.get(`http://localhost:5002/dashboard/MarchNewUser`),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log("res1", res1);
          console.log("res2", res2);
          setTotalUsers(res1.data)
          setNewMarch(res2.data)
          

        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {totalUsers.map(totalUsers =>
          <div>
            총 사용자 수 : {totalUsers[`COUNT(*)`]}
          </div>
        )}
        {newMarch.map(newMarch =>
        
        )}
      </div>
    </div>
  )
}

export default Dashboard
