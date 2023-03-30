import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserDetail from './UserDetail';

function User() {
	const [info, setInfo] = useState([]);

	// 서버에 요청해서 데이터 받아옴.
	// state 값 저장
	// 사용자 목록 조회
	useEffect(() => {
		axios.get('http://localhost:5000/users')
		.then((response) => {
			console.log(response); // 여기까지는 배열 받아와짐.
			setInfo(response.data);
		})
	}, []);
	// async-await
	// const loadData2 = async () => {
	// 	const response = await axios.get('http://localhost:5000/users');
	// 	setData(response.data);
	// }
	return (
		<div>
			<div>
				<h3> 사용자 화면 </h3>
				<table border="1">
					<thead>
						<tr>
							<th>사용자 ID</th>
							<th>닉네임</th>
							<th>자기 소개</th>
							<th>활동 여부</th>
							<th>가입일</th>
							<th>생성일</th>
							<th>수정일</th>
						</tr>
					</thead>
					<tbody>
						{
							info.map( function(view, i) {
								return <UserDetail view = {view} key={i} />
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default User;
