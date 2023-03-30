import React from 'react'

const CommentsDetail = ({ post }) => {

    // 날짜 포맷 
    let moment = require('moment');
    let commentPublishedAt = moment(post.commentPublishedAt).format('YYYY-MM-DD');
    let commentCreatedAt = moment(post.commentCreatedAt).format('YYYY-MM-DD');

    return (
        <tr>
            <td>{post.commentId}</td>
            <td>{post.commentContent}</td>
            <td>{post.commentDeleted}</td>
            <td>{commentPublishedAt}</td>
            <td>{commentCreatedAt}</td>
            <td>{post.commentUpdatedAt}</td>
        </tr>
    )
}

export default CommentsDetail







