import "./TrendList.css";

const TrendList = ({ trending, hash, tweets }) => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="trending">
          {trending}
          <span className="dots">
            <i className="bi bi-three-dots"></i>
          </span>
        </div>
        <div className="hash">{hash}</div>
        <div className="trending">{tweets}</div>
      </div>
    </div>
  );
};

export default TrendList;
