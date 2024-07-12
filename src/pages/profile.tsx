import React from 'react';
import '../styles/ProfilePage.css';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@components/molecules/Navbar';
import { UserDetails } from 'types/UserDetails';
import { useUser } from '@components/UserProvider';

export default function Profile() {

  const userDetails = useUser().userDetails;
  console.log(userDetails)
  
  return (
    <>
    {userDetails ? (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-picture">
            <img src={userDetails.picture} alt="Profile Picture" />
          </div>
          <div className="profile-info">
            <h2>{userDetails.name}</h2>
            <p>Gender: {}</p>
            <p>Date of Birth: {}</p>
          </div>
        </div>
        <div className="profile-bio">
          <h3>Bio</h3>
          <p>{}</p>
        </div>
      </div>
    </>
    ) : (
      <p>Loading...</p>
    )}
    </>
  );
};
