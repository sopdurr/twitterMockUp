import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import useFetch from "../ReUsableComp/useFetch";

const TweetReplyList = ({ user, getReplies, submit, getTweetById }) => {
  const getId = getReplies.map((tweet) => {
    return tweet.id;
  });

  const { foo, getData } = useFetch("https://localhost:5001/api/replies");

  const likeLength = foo.map((tweet) => {
    return tweet.replyLikes.length;
  });

  const replyInfo = {
    userId: 1,
    replyId: parseInt(getId),
  };

  const [state, setState] = useState(replyInfo);
  const { userId, replyId } = state;

  const likeClick = () => {
    fetch("https://localhost:5001/api/replylikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(replyInfo),
    }).then((result) => {
      console.log(result);
      setState({ ...state, userId, replyId });
      getData();
      getTweetById();
    });
  };

  useEffect(() => {
    getData();
    getTweetById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  var iconList = [
    {
      icon: <i className="bi bi-chat"></i>,
    },
    {
      icon: <i className="bi bi-arrow-repeat"></i>,
    },
    {
      icon: <i onClick={likeClick} className="bi bi-heart">
        {likeLength}
      </i>,
    },
    {
      icon: <i className="bi bi-upload"></i>,
    },
    {
      icon: <i className="bi bi-bar-chart"></i>,
    },
  ];

  return (
    <div>
      {getReplies
        .slice()
        .reverse()
        .map((tweet) => (
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
                <ReactTimeAgo
                  date={Date.parse(tweet.replyDate)}
                  locale="en-US"
                  timeStyle="twitter"
                />
              </div>
              <span className="tweetAction">
                <div className="dropdown">
                  <button className="dropbtn">
                    {" "}
                    <i className="bi bi-three-dots"></i>{" "}
                  </button>
                  <div className="dropdown-content">
                    <i className="bi bi-trash"></i>
                    <button onClick={() => submit(tweet.id)}>Delete</button>
                  </div>
                </div>
              </span>
              <div className="tweetlist" value={tweet.id}>
                {tweet.replyContent}
              </div>
              <div className="tweet-icon-container">
                <ul className="tweet-icon-wrapper">
                  {iconList.map((icon, index) => (
                    <li key={index} className="tweet-icon-list">
                      {icon.icon}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TweetReplyList;
