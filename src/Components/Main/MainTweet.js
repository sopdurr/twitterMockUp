import "./MainTweet.css";

const MainTweet = ({ onChange, content }) => {
  var pic = "https://memegenerator.net/img/images/14586937.jpg";

  return (
    <div className="border">
      <div className="wrapper-one">
        <img className="profile" src={pic} alt="futurama" />
        <input
          value={content}
          name="content"
          className="inputtext"
          type="text"
          placeholder="Whats happening?"
          onChange={onChange}
        />
      </div>
      <div className="wrapper-two">
        <span className="iconmessage">
          <i className="bi bi-globe2"></i>
        </span>
        <span className="iconmessage">Everyone can reply</span>
        <div className="margin"></div>
      </div>

    </div>
  );
};

export default MainTweet;
