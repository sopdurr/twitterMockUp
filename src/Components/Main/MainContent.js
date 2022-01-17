import React, { useState, useEffect } from "react";
import TweetIconList from "./TweetIconList";
import "./MainContent.css";
import DeleteButton from "./DeleteButton";
import ReactTimeAgo from "react-time-ago";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const getTweets = () => {
    fetch("https://localhost:5001/api/tweets")
      .then((res) => {
        return res.json();
      })
      .then((data) => { 
        console.log(data);
        setData(data);
      });
  };

  const getUser = () => {
    fetch("https://localhost:5001/api/user")
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        console.log(user);
        setUser(user[0].userName);
      });
  };

  const handleClick = (id) => {
    fetch(`https://localhost:5001/api/tweets/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log(result)
      getTweets();
    });
  };

  
  
  useEffect(() => {
    getTweets();
    getUser();
  }, []);

  return (
    <div>
      {data.slice().reverse().map((tweet) => (
        <div className="tweetWrapper" key={tweet.id}>
          <img
            className="profile"
            src="https://memegenerator.net/img/images/14586937.jpg"
            alt="futurama"
          />
          <div className="userHandle">
            <span className="user">{user}</span>
            <span className="handle">
              @sjomli <i className="bi bi-dot"></i>
            </span>
            <div className="timestamp">
            <ReactTimeAgo date={Date.parse(tweet.date)} locale="en-US" timeStyle="twitter" />
            </div>
            <span className="tweetAction">
              <DeleteButton remove={() => handleClick(tweet.id)} />
            </span>
            <div className="tweetlist" value={tweet.id} >{tweet.content}</div>
            <button value={tweet.id} onClick={(e) => {console.log(e.target.value)}}>
              get id
            </button>
            <TweetIconList />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
