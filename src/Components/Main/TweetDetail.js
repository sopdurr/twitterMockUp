import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useLike from "../ReUsableComp/useLike";
import useDate from "../ReUsableComp/useDate";
import TweetReplyList from "./TweetReplyList";
import "./TweetIconList.css";
import "./TweetDetail.css";

const TweetDetail = ({ user }) => {
  const { dateTime } = useDate();
  const { id } = useParams();
  const [tweet, setTweet] = useState("");
  const [getReplies, setGetReplies] = useState([]);
  const [getLikes, setGetLikes] = useState([]);

  const { addLike } = useLike("https://localhost:5001/api/likes", tweet.id);

  const likeClick = () => {
    addLike();
    getTweetById();
  };

  const data = {
    replyContent: "",
    UserId: 1,
    tweetId: id,
    replyDate: dateTime,
  };
  const [state, setState] = useState(data);
  const { replyContent } = state;

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
      getTweetById();
      setState({ ...state, replyContent: "" });
      console.log(tweet.id);
    });
  };

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
        setGetLikes(data.likes);
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

  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  var iconList = [
    {
      icon: <i className="bi bi-chat">{getReplies.length}</i>,
    },
    {
      icon: <i className="bi bi-arrow-repeat"></i>,
    },
    {
      icon: (
        <i onClick={likeClick} className="bi bi-heart">
          {getLikes.length}
        </i>
      ),
    },
    {
      icon: <i className="bi bi-upload"></i>,
    },
    {
      icon: <i className="bi bi-bar-chart"></i>,
    },
  ];

  useEffect(() => {
    getTweetById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="tweetDetail">
      <div className="tweetWrapperDetail" key={tweet.id}>
        <img
          className="profile"
          src="https://memegenerator.net/img/images/14586937.jpg"
          alt="futurama"
        />
        <span className="tweetAction">
          <button className="back-button" onClick={goBack}>
            Back
          </button>
        </span>
        <div className="userHandleDetail">
          <span className="userTweet">{user}</span>
          <div className="handleDetail">@sjomli</div>
          <div className="tweetlistDetail" value={tweet.id}>
            {tweet.content}
          </div>
        </div>
      </div>
      <div className="date">{tweet.date}</div>
      <div className="tweetIconWrapper">
        <div className="tweetIconDetail">
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
      <TweetReplyList
        user={user}
        getReplies={getReplies}
        submit={handleClickRemove}
        getTweetById={getTweetById}
      />
    </div>
  );
};

export default TweetDetail;
