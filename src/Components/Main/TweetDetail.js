import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TweetIconList from "./TweetIconList";
import ReactTimeAgo from "react-time-ago";
import useDate from "../ReUsableComp/useDate";
import "./TweetIconList.css";
import "./TweetDetail.css";

const TweetDetail = ({ user }) => {
  const {dateTime} = useDate();
  const { id } = useParams();
  const [tweet, setTweet] = useState("");
  const [getReplies, setGetReplies] = useState([]);

  const data = {
    replyContent: "",
    UserId: 1,
    tweetId: id,
    replyDate: dateTime,
  };
  const [state, setState] = useState(data);
  const { replyContent } = state;

  const replyInfo = {
    userId: 1,
    replyId: 39,
  };

  const [reply, setReply] = useState(replyInfo);
  const { userId, replyId } = reply;

  const handleChange = (event) => {
    setState({
      ...state,
      replyContent: event.target.value,
      replyDate: dateTime,
    });
  };

  const getTweetById = () => {
    fetch("https://localhost:5001/api/tweets/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTweet(data);
        setGetReplies(data.replies);
      });
  };

  const handleClick = () => {
    const data = state;
    fetch("https://localhost:5001/api/replies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
      console.log(data.id);
      getTweetById();
      setState({ ...state, replyContent: "" });
    });
  };

  const handleClickRemove = (id) => {
    fetch(`https://localhost:5001/api/replies/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log(result);
      getTweetById();
    });
  };

  const likeClick = () => {
    fetch("https://localhost:5001/api/replylikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reply),
    }).then((result) => {
      console.log(result);
      setReply({...reply, userId, replyId });
    });
  };

  const history = useHistory();

  const goBack = () => {
    history.push("/")
  }

  useEffect(() => {
    getTweetById();
  }, [])
 

  return (
    <div className="tweetDetail">
      <div className="tweetWrapperDetail" key={tweet.id}>
        <img
          className="profile"
          src="https://memegenerator.net/img/images/14586937.jpg"
          alt="futurama"
        />
        <span className="tweetAction">
        <button onClick={goBack}>
          Back
        </button>
        </span>
        <div className="userHandleDetail">
          <span className="user">{user}</span>
          <div className="handleDetail">@sjomli</div>
          <div className="tweetlistDetail" value={tweet.id}>
            {tweet.content}
          </div>
        </div>
      </div>
      <div className="date">{tweet.date}
    
      </div>
      <div className="tweetIconWrapper">
        <div className="tweetIconDetail">
          <TweetIconList id={id} tweet={tweet} />
        </div>
      </div>
      <div className="reply-wrapper">
        <img
          className="profile"
          src="https://memegenerator.net/img/images/14586937.jpg"
          alt="futurama"
        />
        <input
          value={replyContent}
          name="content"
          className="inputtext"
          type="text"
          placeholder="Tweet your reply"
          onChange={handleChange}
        />
        <button className="reply-button" onClick={handleClick}>
          Reply
        </button>
      </div>
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
                      <button onClick={() => handleClickRemove(tweet.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </span>
                <div className="tweetlist" value={tweet.id}>
                  {tweet.replyContent}
                </div>
                <TweetIconList id={id} />
                <button onClick={likeClick}>addlike</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TweetDetail;
