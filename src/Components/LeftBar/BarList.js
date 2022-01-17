import "bootstrap-icons/font/bootstrap-icons.css";
import "./Barlist.css";

const BarList = ({ text, logo }) => {
  return (
    <div className="container">
      <ul className="listwrapper">
        <li className="icontext">
          <i className={logo}></i>
          {text}
        </li>
      </ul>
    </div>
  );
};

export default BarList;
