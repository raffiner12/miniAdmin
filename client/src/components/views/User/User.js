import React, { useState, useEffect } from 'react'
import axios from 'axios';

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
							<th>userId</th>
							<th>nickname</th>
							<th>about</th>
							<th>status</th>
							<th>joinedAt</th>
							<th>createdAt</th>
							<th>updatedAt</th>
						</tr>
					</thead>
					<tbody>
						{
							info.map(element =>
								<tr>
									<td>{element.userId}</td>
									<td>{element.userNickname}</td>
									<td>{element.userAbout}</td>
									<td>{element.userStatus}</td>
									<td>{element.userJoinedAt}</td>
									<td>{element.userCreatedAt} </td>
									<td>{element.userUpdatedAt}</td>
								</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default User;
