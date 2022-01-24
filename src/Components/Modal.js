import { useState } from "react";
import MainBottom from "./Main/MainBottom";
import ReactTimeAgo from "react-time-ago";
import useDate from "./ReUsableComp/useDate";

const Modal = ({ toggleModal, user, tweet }) => {
  const {dateTime} = useDate();

  const data = {
    replyContent: "",
    UserId: 1,
    tweetId: tweet.id,
    replyDate: dateTime,
  };
  const [state, setState] = useState(data);
  const { replyContent } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      replyContent: event.target.value,
      replyDate: dateTime,
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
      setState({ ...state, replyContent: "" });
      toggleModal();
    });
  };


  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <div className="tweetWrapper">
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
                date={Date.parse(tweet.date)}
                locale="en-US"
                timeStyle="twitter"
              />
            </div>
            <div className="tweetlist">{tweet.content}</div>
          </div>
        </div>
        <div className="reply-modal">
          Replying to <span className="reply-modal-handle">@sjomli</span>
        </div>
        <div className="flex">
          <img
            className="profile"
            src="https://memegenerator.net/img/images/14586937.jpg"
            alt="futurama"
          />{" "}
          <div>
            <input
            value={replyContent}
              className="reply-tweet-modal"
              name="content"
              type="text"
              placeholder="Tweet your reply"
              onChange={handleChange}
            />
          </div>
        </div>
        <MainBottom submit={handleClick} />
      </div>
    </div>
  );
};

export default Modal;
