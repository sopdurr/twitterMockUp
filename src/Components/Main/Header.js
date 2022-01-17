import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="home">
        Home
        <span className="stars">
          <i className="bi bi-stars stars-hover"></i>
        </span>
      </div>
    </div>
  );
};

export default Header;
