
import { useState } from "react";

const useFetchUser = (url) => {
  const [user, setUser] = useState([]);

  const getUser = () => {
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setUser(data[0].userName);
    });
  }

  return { user, getUser };
};

export default useFetchUser;