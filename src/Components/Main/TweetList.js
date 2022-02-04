import { Link } from "react-router-dom";
import TweetIconList from "./TweetIconList";
import DeleteButton from "./DeleteButton";
import ReactTimeAgo from "react-time-ago";

const TweetList = ({ user, remove, foo, getData, getUser}) => {
  const click = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div>
      {foo
        .slice()
        .reverse()
        .map((tweet) => (
          <div key={tweet.id}>
            <Link className="Link" to={`/tweet/${tweet.id}`}>
              <div className="tweetWrapper">
                <span onClick={click} className="tweetAction">
                  <DeleteButton remove={() => remove(tweet.id)} />
                </span>
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
                  <div className="tweetlist" value={tweet.id}>
                    {tweet.content}
                  </div>
                  <div onClick={click}>
                    <TweetIconList
                      tweet={tweet}
                      user={user}
                      likes={tweet.likes}
                      getData={getData}
                      getUser={getUser}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default TweetList;
