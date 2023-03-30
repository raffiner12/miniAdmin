import React from "react";
import { Link } from 'react-router-dom';

const PostDetail = ( { view }) => {

    // 날짜 포맷 
    let moment = require('moment');
    let postPublishedAt = moment(view.postPublishedAt).format('YYYY-MM-DD');
    let postCreatedAt = moment(view.postCreatedAt).format('YYYY-MM-DD');
    let postUpdatedAt = moment(view.postUpdatedAt).format('YYYY-MM-DD');

    return (
        <tr>
            <td>{view.postId}</td>
            <td><Link to={"/posts/" + view.postId + "/comments"}>{view.postTitle}</Link></td>
            <td>{view.postDeleted}</td>
            <td>{view.postViewCount}</td>
            <td>{view.userId}</td>
            <td>{postPublishedAt} </td>
            <td>{postCreatedAt}</td>
            <td>{postUpdatedAt}</td>
        </tr>
    )
}


export default PostDetail;