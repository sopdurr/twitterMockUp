import { useState, useEffect } from "react";
import "./TweetIconList.css";

const clicked = "bi bi-heart color";
const hover = "bi bi-heart";

const TweetIconList = () => {
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState(hover);
  const [active, setActive] = useState(false);
  const [likeList, setLikeList] = useState("")
  
  const likeInfo = {
    userId:1,
    tweetId:1
  }

  const [state, setState] = useState(likeInfo);
  const { userId, tweetId} = state;

  const getLikes = () => {
    fetch("https://localhost:5001/api/likes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setLikeList(data.length)
      });
  };

  const likeClick = () => {
    const likeInfo = state;
    fetch("https://localhost:5001/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(likeInfo),
    }).then((result) => {
      console.log(result);
      setState({
        userId,
        tweetId
      })
    });
  };


  const toggleModal = () => {
    setModal(!modal);
  };

  const changeColor = () => {
    likeClick();
    getLikes();
    if (likeList < 1) {
      setColor(hover);
    } else if (likeList > 1)
    {
      setColor(clicked);
    }
    console.log(active);
  };

  var iconList = [
    {
      icon: <i onClick={toggleModal} className="bi bi-chat"></i>,
    },
    {
      icon: <i className="bi bi-arrow-repeat"></i>,
    },
    {
      icon: <i onClick={changeColor} className={color}>{likeList}</i>,
    },
    {
      icon: <i className="bi bi-upload"></i>,
    },
    {
      icon: <i className="bi bi-bar-chart"></i>,
    },
  ];

  useEffect(() => {
    getLikes();
  })

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

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>asdadadasdadadadad</p>
            <button onClick={toggleModal} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetIconList;
