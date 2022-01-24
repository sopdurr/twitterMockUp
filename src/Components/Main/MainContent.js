import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/";
import TweetDetail from "./TweetDetail";
import TweetList from "./TweetList";
import MainTweet from "./MainTweet";
import MainBottom from "./MainBottom";
import useFetch from "../ReUsableComp/useFetch";
import useFetchUser from "../ReUsableComp/useFetchUser";
import useDate from "../ReUsableComp/useDate";
import "./MainContent.css";


const MainContent = () => {
  const { foo, getData } = useFetch("https://localhost:5001/api/tweets");
  const { user, getUser} = useFetchUser("https://localhost:5001/api/user")
  const { dateTime } = useDate();

  const info = {
    content: "",
    UserId: 1,
    date: dateTime,
  };

  const [state, setState] = useState(info);
  const { content } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      content: event.target.value,
      date: dateTime
    });
  };

  const handleClick = () => {
    const data = state;
    fetch("https://localhost:5001/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
      console.log(data);
      setState({...state,
        content: ""
      })
      getData();
    });
  };

  const handleClickRemove = (id) => {
    fetch(`https://localhost:5001/api/tweets/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log(result);
      getData();
    });
  };

  useEffect(() => {
    getUser();
    getData();
  },[]);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainTweet onChange={handleChange} content={content} />
          <MainBottom submit={handleClick} />
          <TweetList foo={foo} user={user} remove={handleClickRemove} />
        </Route>
        <Route path="/tweet/:id">
          <TweetDetail user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainContent;
