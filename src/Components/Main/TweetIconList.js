import { useEffect, useState } from "react";
import Modal from "../Modal";
import "./TweetIconList.css";


const clicked = "bi bi-heart color";
const hover = "bi bi-heart";

const TweetIconList = ({ user, tweet, likes, getUser, getData }) => {
  const [modal, setModal] = useState(null);
  const [color, setColor] = useState(hover);

  const likeInfo = {
    userId: 1,
    tweetId: tweet.id,
  };
  const [like, setLike] = useState(likeInfo);
  const { userId, tweetId } = like;

  const addLike = () => {
    fetch("https://localhost:5001/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(likeInfo),
  }).then((result) => {
    console.log(result);
    setLike({...like,
      userId, tweetId
    })
    getData();
    getUser();
  });
  }


  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getData();
    getUser();
  },[])


  var iconList = [
    {
      icon: (
        <i onClick={toggleModal} className="bi bi-chat">
          {tweet.replies.length}
        </i>
      ),
    },
    {
      icon: <i className="bi bi-arrow-repeat"></i>,
    },
    {
      icon: (
        <i onClick={addLike} className={color}>
          {likes.length}
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

      {modal && <Modal toggleModal={toggleModal} user={user} tweet={tweet} getData={getData} getUser={getUser} />}
    </>
  );
};

export default TweetIconList;
