
import "./OpeningScreen.css";
import img from "../../../Assets/header-image.jpg"



function OpeningScreen(): JSX.Element {
  return (
    <div className="container" style={{ backgroundImage: `url(${img})` }}>
    <div className={`caption animation`}>
      <h1>Roll to the next destination</h1>
    </div>
  </div>
  );
}

export default OpeningScreen;

