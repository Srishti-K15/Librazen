import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import AdminPortal from './Components/AdminPortal';
import Books from './Pages/BooksPage'
import Leaderboard from './Pages/Leaderboard';
import LibraryCharts from './Pages/LibraryCharts';
import AboutUs from './Pages/AboutUs';
import './index.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin" element={<AdminPortal />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/charts" element={<LibraryCharts />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>
    </Router>
  );
};

export default App