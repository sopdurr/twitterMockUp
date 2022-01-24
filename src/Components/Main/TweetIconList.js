import { useState } from "react";
import "./TweetIconList.css";
import Modal from "../Modal";
import useLike from "../ReUsableComp/useLike";

const clicked = "bi bi-heart color";
const hover = "bi bi-heart";

const TweetIconList = ({ id, user, tweet }) => {
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState(hover);


  const { userId, tweetId, addLike } = useLike("https://localhost:5001/api/likes", id);

  const likeClick = () => {
    addLike();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeColor = () => {
    likeClick();
    if (2 < 1) {
      setColor(hover);
    } else {
      setColor(clicked);
    }
  };

  var iconList = [
    {
      icon: <i onClick={toggleModal} className="bi bi-chat"></i>,
    },
    {
      icon: <i className="bi bi-arrow-repeat"></i>,
    },
    {
      icon: (
        <i onClick={changeColor} className={color}>
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



  return (
    <>
      <div className="tweet-icon-container">
        <ul className="tweet-icon-wrapper">
          {iconList.map((icon, index) => (
            <li key={index} className="tweet-icon-list">
              {icon.icon}
            </li>
          ))}
        </ul>
      </div>

      {modal && <Modal toggleModal={toggleModal} user={user} tweet={tweet} />}
    </>
  );
};

export default TweetIconList;
