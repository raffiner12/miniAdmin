import React from 'react'
import {Link, Routes, Route} from 'react-router-dom';
import Home from '../Home';
import Dashboard from '../Dashboard/Dashboard';
import Post from '../Post/Post';
import User from '../User/User';
import UserPosts from '../User/UserPosts';
import Comments from '../Post/Comments';

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">[홈]</Link>
          <Link to="/dashboard">[대시보드]</Link>
          <Link to="/posts">[게시판]</Link>
          <Link to="/users">[사용자]</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route exact path = '/' element={<Home />} index />
        <Route exact path = '/dashboard' element={<Dashboard />} />
        <Route exact path = "/posts" element={<Post />} />
        <Route exact path = "/users" element={<User />} />
        <Route exact path = '/users/:userId/posts' element={<UserPosts userId={User} />} />
        <Route exact path = '/posts/:postId/comments' element={<Comments postId={Post} />} />
      </Routes>
    </div>
  );
};

export default NavBar;
