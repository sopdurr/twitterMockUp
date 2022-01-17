
import "./App.css";
import BarListContent from "./Components/LeftBar/BarListContent";
import RightHeader from "./Components/RightBar/RightHeader";
import RightContent from "./Components/RightBar/RightContent";
import MainWrapper from "./Components/Main/MainWrapper";

function App() {


  return (
    <div className="grid-container">
      <div className="leftbar">
        <BarListContent />
      </div>
        <MainWrapper/>
      <div className="rightbar">
        <RightHeader />
        <RightContent />
      </div>
    </div>
  );
}

export default App;
