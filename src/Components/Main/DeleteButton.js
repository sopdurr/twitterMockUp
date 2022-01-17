import "./DeleteButton.css";

const DeleteButton = ({ remove }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        {" "}
        <i className="bi bi-three-dots"></i>{" "}
      </button>
      <div className="dropdown-content">
        <i className="bi bi-trash"></i>
        <button onClick={remove}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteButton;
