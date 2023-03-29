import React from "react";
import { Link } from 'react-router-dom';

const UserDetail = ( { view }) => {

    // 날짜 포맷 
    // let moment = require('moment');
    // let joinedAt = moment(view.userJoinedAt).format('YYYY-MM-DD');
    // let createdAt = moment(view.userCreatedAt).format('YYYY-MM-DD');
    // let updatedAt = moment(view.userUpdatedAt).format('YYYY-MM-DD');

    return (
        <tr>
            <td><Link to={"/users/" + view.userId + "/posts"}>{view.userId}</Link></td>
            <td>{view.userNickname}</td>
            <td>{view.userAbout}</td>
            <td>{view.userStatus}</td>
            <td>{view.userJoinedAt}</td>
            <td>{view.userCreatedAt} </td>
            <td>{view.userUpdatedAt}</td>
        </tr>
    )
}


export default UserDetail;