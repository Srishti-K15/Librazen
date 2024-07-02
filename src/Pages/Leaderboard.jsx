import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Layout from '../Components/Layout/layout';
import './Leaderboard.css'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      let { data: users, error } = await supabase
        .from('profiles')
        .select('id, total_books_read, full_name')
        .order('total_books_read', { ascending: false })
        .limit(10);
      if (!error) {
        setLeaderboard(users);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Layout>
      <div className='leader-page'>
    <div className='leader-box'>
      <h2>Leaderboard</h2>
      <table className='leader-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>User ID</th>
            <th>Books Read</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.id}</td>
              <td>{user.total_books_read}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </Layout>
    
  );
};

export default Leaderboard;
