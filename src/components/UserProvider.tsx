import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserDetails } from 'types/UserDetails';


// Props interface for UserProvider
interface UserProviderProps {
  children: React.ReactNode;
}


// Create context
const UserContext = createContext<any>(null);

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
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
    <UserContext.Provider value={{ userDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
