import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { API_URI } from "../api's/Api";

const UserData = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserData = (data) => {
    setUserData(data);
  };

  useEffect(() => {
    axios
      .get(`${API_URI}/vendor/vendor-details`, { withCredentials: true })
      .then((res) => {
        if(res.status===200)
            setUserData(res.data.vendor)
      })
      .catch((err) => console.log(err.response.data?.msg||"Something went wrong"));
  }, []);

  return (
    <UserData.Provider value={{ userData, updateUserData }}>
      {children}
    </UserData.Provider>
  );
};

const useContextData = () => {
  return useContext(UserData);
};

export { ContextProvider, useContextData };
