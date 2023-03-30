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
		// console.log("props2", props[0]); // undefined
		// // console.log("props3", props[0].postId); // 오류남
		// console.log("props3", props.data); // undefined
		// console.log("props4", props.content);
		// const list = []
		// for (let i = 0; i< props.)


		
		// const viewPost2 = viewPost;
		// for(let i = 0; i < 1; i++){
		// 	let P = props.
		// }
		// console.log("Object.keys", Object.keys(props)) // title, content
		// console.log("Object.values", Object.values(props)) // 내용 출력
		// //console.log("Object.values.content", Object.values(props.content)) // 오류남

		// const final = Object.values(props).slice(0,1);
		// console.log(final);


		// var title = Object.values(props);
		// console.log("title",title);
		// console.log(title[0]); // 제목 받아와짐.
		// console.log(title[1]); // 내용 받아와짐.
		// const final2 = title.slice(0,4);
		// console.log(final2);

		// var content = props;
		// console.log(content);
	
		var final3 = props.element.slice(0,1);
		console.log(final3);
		console.log(final3.postTitle)
		return (
			<>
				{/* <h1>{content.title}</h1>
				<div>
					<span>{props.content}</span>
				</div>
				<hr />
					<p>
						{final2.postid}
					</p> */}
				{final3.postTitle}
				<hr />
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
							{/* {
								viewPost.map(content => {
									console.log(content) // 객체로 출력됨.
									var c = <PostTitleContent title={content.postTitle} content={htmlParser(content.postContent)} />

									return c;
								},)
							} */}
					</div>
					<hr />
					<table border="1">
						<thead>
							<tr>
								<th>번호</th>
								<th>댓글 내용</th>
								<th>삭제</th>
								<th>작성일</th>
								<th>생성일</th>
								<th>수정일</th>
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
