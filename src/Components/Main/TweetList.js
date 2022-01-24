import { Link } from "react-router-dom";
import TweetIconList from "./TweetIconList";
import DeleteButton from "./DeleteButton";
import ReactTimeAgo from "react-time-ago";

const TweetList = ({foo, user, remove }) => {
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
          <div>
            <Link className="Link" to={`/tweet/${tweet.id}`}>
              <div className="tweetWrapper" key={tweet.id}>
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
                    <TweetIconList foo={foo} tweet={tweet} user={user} />
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
