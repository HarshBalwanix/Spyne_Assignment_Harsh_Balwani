import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("carManage-user")));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("carManage-user"));
    setUser(storedUser);
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("carManage-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("carManage-user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
