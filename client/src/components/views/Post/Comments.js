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

	// var viewPost2 = viewPost;
	// let postTitleContent = (viewPost2) => {
	// 	const titleContent = [];
	// 	for (let i = 0; i < 1; i++){
	// 		titleContent.push(<p key={i}>{titleContent[i]}</p>)
	// 	}
	// 	return titleContent;
	// }

	function PostTitleContent(props){
		console.log("props", props); // 배열 받아와짐.
		console.log("props2", props[0]); // undefined
		// console.log("props3", props[0].postId); // 오류남
		console.log("props3", props.data); // undefined
		console.log("props4", props.content);
		// const list = []
		// for (let i = 0; i< props.)


		
		// const viewPost2 = viewPost;
		// for(let i = 0; i < 1; i++){
		// 	let P = props.
		// }
		return (
			<>
				<h1>{props.title}</h1>
				<div>
					<span>{props.content}</span>
				</div>
			</>

		);
	}



	return (
		<div>
			<h3> 특정 게시글의 댓글 조회 </h3>
			<div>
					<div>
							{/* {postTitleContent(viewPost2)} */}
							<PostTitleContent element={viewPost} />
							{
								viewPost.map(content => {
									console.log(content) // 객체로 출력됨.
									var c = <PostTitleContent title={content.postTitle} content={content.postContent} />

									return c;
								},0)
							}
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
			</div>
		</div>

	);
};

export default Comments;
