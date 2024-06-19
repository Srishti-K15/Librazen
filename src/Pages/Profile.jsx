import React, { useEffect, useState } from 'react';
import  supabase  from '../config/supabaseClient';
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer'
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.log("Error fetching user", userError);
        return;
      }
      setUser(user);
    
    if(user){
      console.log("Fetched user ID:", user.id); 
      let {data: profile, profileError} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

      if(profileError){
        console.log("Error fetching profile", profileError);
      }
      else{
        setProfile(profile);
      }
    }
  };
  fetchUser();
  }, []);

  if (!user|| !profile ) return <div>Loading...</div>;

  return (
    <div className='profilePage'>
      <Navbar />
      <div className='profile'>
      <h1>Profile</h1>
      <div className='details'>
      <p>Name: {profile.full_name}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.id} </p>
      <p>Dues: {profile.dues}</p>
      <p>Due date:{profile.due_date} </p>
      <p>Created at: {user.created_at}</p>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;