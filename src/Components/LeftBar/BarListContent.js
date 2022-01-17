import "bootstrap-icons/font/bootstrap-icons.css";
import BarList from "./BarList";
import TweetButton from "./TweetButton";

const BarListContent = () => {
  var list = [
    {
      name: "bi bi-twitter",
    },
    {
      name: "bi bi-house-door",
      text: <span>Home</span>,
    },
    {
      name: "bi bi-hash",
      text: <span>Explore</span>,
    },
    {
      name: "bi bi-bell",
      text: <span>Notifications</span>,
    },
    {
      name: "bi bi-envelope",
      text: <span>Messages</span>,
    },
    {
      name: "bi bi-bookmark",
      text: <span>Bookmarks</span>,
    },
    {
      name: "bi bi-card-text",
      text: <span>Lists</span>,
    },
    {
      name: "bi bi-person",
      text: <span>Profile</span>,
    },
    {
      name: "bi bi-three-dots",
      text: <span>More</span>,
    },
  ];

  return (
    <div>
      {list.map((logo, index) => {
        return (
            <BarList 
            key={index}
            logo={logo.name} 
            text={logo.text}
            />
            );
        })}
      <TweetButton />
    </div>
  );
};

export default BarListContent;
