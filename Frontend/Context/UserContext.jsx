import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState(Cookies.get("authToken"));
  console.log("Token is: " + token);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const decodedToken = jwtDecode(token);
        setUserDetails(decodedToken);
      } catch (error) {
        console.error("Invalid token: ", error);
        setUserDetails({});
      }
    }
  }, []);

  useEffect(() => {
    const handleTokenChange = () => {
      const updatedToken = Cookies.get("authToken");
      setToken(updatedToken);
    };
    window.addEventListener("storage", handleTokenChange);
    return () => window.removeEventListener("storage", handleTokenChange);
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
