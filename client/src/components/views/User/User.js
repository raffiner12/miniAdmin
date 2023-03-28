import Reac, {useState} from 'react'
import UserList from './UserList'

function User() {
  const [data, setData] = useState([]);

  // 서버에 요청해서 데이터 받아옴.
  // state 값 저장
  const loadData = async () => {
    const response = await 
  }
  return (
    <div>
      <div>
        <h3> 사용자 화면 </h3>
        <table border="1">
          <thead>
            <tr>
              <th>userId</th>
              <th>nickname</th>
              <th>about</th>
              <th>status</th>
              <th>joinedAt</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {

            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
