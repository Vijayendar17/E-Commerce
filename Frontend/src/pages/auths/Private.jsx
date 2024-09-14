import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/Usercontext';
import axios from 'axios';

function Private() {
  const [ok, setOk] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user.token) {
          console.log('User token exists:', user.token);

          const { data } = await axios.get('/auth/user', {
            withCredentials: true,
          });

          console.log('Response from /auth/user:', data);

          
          if (data.ok) {
            setOk(true);
            setUser(prevUser => ({
              ...prevUser,
              user: data.user,  
            }));
          } else {
            console.warn('User check failed, setting ok to false');
            setOk(false);
          }
        } else {
          console.warn('No token, setting ok to false');
          setOk(false);
        }
      } catch (error) {
        console.error('Error during user check:', error);
        setOk(false);
      }
    };

    checkUser();
  }, [user.token, setUser]);

  // Render based on 'ok' state
  if (!ok) {
    return <div>Access denied</div>;
  }

  return <div>Private content here</div>;
}

export default Private;
