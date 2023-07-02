
import "./Header.css";
import img from "../../../Assets/header-image.jpg"



// function Header(): JSX.Element {
//     return (
//     <div className="Header">
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Your Vacation Planner
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <img src={img}alt="" />
//       </div>
//     );
//   }
  
//   export default Header;
import React, { useEffect } from 'react';
import './Header.css'; // Import CSS file
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";


function Header(): JSX.Element {
  // const [animationClass, setAnimationClass] = React.useState('');

  // useEffect(() => {
  //   // Trigger the animation by adding the animation class
  //   setAnimationClass('animation');
  // }, []);

  return (
    <div className="container" style={{ backgroundImage: `url(${img})` }}>
      <AuthMenu/>
    <div className={`caption animation`}>
      <h1>Roll to the next destination</h1>
    </div>
  </div>
  );
}

export default Header;

