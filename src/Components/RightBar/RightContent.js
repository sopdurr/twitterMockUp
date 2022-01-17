import "./RightContent.css";
import TrendList from "./TrendList";

const RightContent = () => {
  var list = [
    {
      trending: "Football - Trending",
      hash: "Lukaku",
      tweets: "96,7K Tweets",
    },
    {
      trending: "Science",
      hash: "ElonMusk",
      tweets: "50K Tweets",
    },
    {
      trending: "Politics",
      hash: "Obama",
      tweets: "25k Tweets",
    },
    {
      trending: "Programming",
      hash: "Diploma",
      tweets: "20K Tweets",
    },
    {
      trending: "Calendar",
      hash: "New Year",
      tweets: "12K Tweets",
    },
  ];

  return (
    <div className="right-container">
      <div className="right-content">
        Trends for you
        <span className="gear">
          <i className="bi bi-gear"></i>
        </span>
      </div>
      {list.map((tweet, index) => {
        return (
          <TrendList
            key={index}
            trending={tweet.trending}
            hash={tweet.hash}
            tweets={tweet.tweets}
          />
        );
      })}
      <div className="show-more">
          Show More
      </div>
    </div>
  );
};

export default RightContent;
