import { useState } from "react";
import Header from "./Header";
import MainTweet from "./MainTweet";
import MainBottom from "./MainBottom";
import MainContent from "./MainContent";

const MainWrapper = () => {

  var today = new Date();
  var dates =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dates + " " + time;

  const data = {
    content: "",
    UserId: 1,
    date: dateTime,
  };
  const [state, setState] = useState(data);
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
      window.top.location.reload(true);
    });
  };

  return (
    <div className="main">
      <Header />
      <MainTweet onChange={handleChange} content={content} />
      <MainBottom submit={handleClick} />
      <MainContent />
    </div>
  );
};

export default MainWrapper;
