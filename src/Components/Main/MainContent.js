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
  const { user, getUser } = useFetchUser("https://localhost:5001/api/user");
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
      date: dateTime,
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
      setState({ ...state, content: "" });
      getData();
    });
  };

  const handleClickRemove = (id) => {
    fetch(`https://localhost:5001/api/tweets/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log(result);
      getData();
      console.log(user.length);
    });
  };

  const addUserInfo = {
    id: 1,
    userName: "",
    handle: "",
  };

  const [getAddUser, setGetAddUser] = useState(addUserInfo);
  const { userName, handle } = state;

  const userChange = (event) => {
    setGetAddUser({ ...getUser, userName: event.target.value });
  };

  const userHandleChange = (event) => {
    setGetAddUser({ ...getAddUser, handle: event.target.value });
  };

  const handleAddUser = () => {
    const addUserInfo = getAddUser;
    fetch("https://localhost:5001/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addUserInfo),
    }).then((result) => {
      getUser();
      console.log(result);
      console.log(user.length);
    });
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user.length > 0 && (
            <div>
              <MainTweet onChange={handleChange} content={content} />
              <MainBottom submit={handleClick} />
              <TweetList
                foo={foo}
                user={user}
                remove={handleClickRemove}
                getUser={getUser}
                getData={getData}
              />
            </div>
          )}
          {user.length === 0 && (
            <div className="addUser">
              <div>Add User</div>
              <input
                value={userName}
                name="name"
                className="inputtext"
                type="text"
                placeholder="Enter name"
                onChange={userChange}
              />
              <input
                value={handle}
                name="name"
                className="inputtext"
                type="text"
                placeholder="Enter @handle-nick "
                onChange={userHandleChange}
              />
              <button onClick={handleAddUser} className="button">
                Add user
              </button>
            </div>
          )}
        </Route>
        <Route path="/tweet/:id">
          <TweetDetail user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainContent;
