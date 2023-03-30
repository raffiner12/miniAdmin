import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentsDetails from './CommentsDetails';
// import htmlParser from 'html-react-parser';

// 특정 사용자의 게시글 조회
function Comments() {
	// 파라미터로 받아온 값
	const { postId } = useParams();

	const [viewPost, setViewPost] = useState([]);
	//const [comments, setComments] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:5000/posts/${postId}/comments`)
			.then((response) => {

				setViewPost(response.data);
				//console.log(viewPost); 
			}, [])
	});

	return (
		<div>
			<h3> 특정 게시글의 댓글 조회 </h3>
			<div>

				<>
					<div>
						{/* <h2>{post.postTitle}</h2> */}
					</div>
					<hr />
					<div>
						{/* {htmlParser(post.postContent)} */}
					</div>
					<hr />
					<table border="1">
						<thead>
							<tr>
								<th>commentId</th>
								<th>commentContent</th>
								<th>commentDeleted</th>
								<th>commentPublishedAt</th>
								<th>commentCreatedAt</th>
								<th>commentUpdatedAt</th>
							</tr>
						</thead>
						<tbody>
							{
								viewPost.map(function (post, i) {
									return <CommentsDetails post={post} key={i} />;
								})

							}
						</tbody>
					</table>
				</>
			</div>
		</div>

	);
};

export default Comments;
