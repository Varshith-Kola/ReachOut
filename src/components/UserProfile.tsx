// src/components/UserProfile.tsx
import React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface UserDetails {
  name: string;
  email: string;
  picture: string;
}

const UserProfile = () => {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserDetails(data))
        .catch((error) => console.error('Error fetching user details:', error));
    }
  }, [session]);

  return (
    <div>
      {userDetails ? (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <img src={userDetails.picture} alt="Profile Picture" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
