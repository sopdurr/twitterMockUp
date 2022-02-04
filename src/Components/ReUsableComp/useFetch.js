import { useState } from "react";

const useFetch = (url) => {
  const [foo, setFoo] = useState([]);  
  
  const getData = () => {
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setFoo(data)
    });
  }
  
  return { foo, getData };

};

export default useFetch;
