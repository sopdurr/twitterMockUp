import "./MainBottom.css";
import { AiOutlineFileGif } from "react-icons/ai";

const MainBottom = ({ submit }) => {
  var iconList = [
    {
      icon: <i className="bi bi-image"></i>,
    },
    {
      icon: <AiOutlineFileGif />,
    },
    {
      icon: <i className="bi bi-bar-chart-fill"></i>,
    },
    {
      icon: <i className="bi bi-emoji-smile"></i>,
    },
    {
      icon: <i className="bi bi-calendar-event-fill"></i>,
    },
    {
      icon: <i className="bi bi-geo-alt"></i>,
    },
  ];

  return (
    <div className="listcontainer">
      <ul className="iconwrapper">
        {iconList.map((icon, index) => (
          <li className="iconlist" key={index}>
            {icon.icon}
          </li>
        ))}
      </ul>
      <div>
        <button className="mainbutton" onClick={submit}>
          Tweet
        </button>
      </div>
    </div>
  );
};

export default MainBottom;
