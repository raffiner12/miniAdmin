import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes // react-router-dom v6부터 switch -> Routes 
} from "react-router-dom"

import Dashboard from './components/views/Dashboard/Dashboard'
import NavBar from './components/views/NavBar/NavBar'
import Post from './components/views/Post/Post'
import User from './components/views/User/User'

function App() {
  return (
    <div>
      <header>
        
      </header>
      <BrowserRouter>
        <Routes>
          <Route exact path = '/Dashboard' element={<Dashboard />} />
          <Route exact path = '/Post' element={<Post />} />
          <Route exact path = '/User' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
