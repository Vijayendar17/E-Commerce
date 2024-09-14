import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({
    user: null,
    email: "",
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsedData = JSON.parse(data);
      setUser({
        user: parsedData.user,
        email: parsedData.email,
        token: parsedData.token,
      });
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = user.token ? `Bearer ${user.token}` : '';
  }, [user.token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
