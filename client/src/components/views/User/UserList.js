import React from "react";

const UserList = ({user }) => {
    // 날짜 포맷 변경
    let moment = require('moment');
    let date = moment(user.userJoinedAt, userCreatedAt, userUpdatedAt);


    return (
        <tr>
            <td>{user.userId}</td>
            <td>{user.userNickname}</td>
            <td>{user.userAbout}</td>
            <td>{user.userStatus}</td>
            <td>{user.userJoinedAt}</td>
            <td>{user.userCreatedAt} </td>
            <td>{user.userUpdatedAt}</td>
            <td>삭제</td>
        </tr>
    );
};
