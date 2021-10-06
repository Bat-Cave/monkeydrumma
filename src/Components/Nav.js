import monkey from "../images/monke_banana_emote_cropped.png";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
let Home = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState();

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home">
      <nav>
        <h1>
          <img className="titleGem1" src={monkey} alt="gem" />
          MonkeyDrumma
          <img className="titleGem2" src={monkey} alt="gem" />
        </h1>
        <div className="links">
          <Link to="/">
            <i className="fas fa-home"></i>
            {windowDimensions.width < 595 ? "" : "Home"}
          </Link>
          <Link to="/shop">
            <i className="fas fa-store-alt"></i>
            {windowDimensions.width < 595 ? "" : "Shop"}
          </Link>
          <Link to="/viewcollection">
            <i className="fas fa-shapes"></i>
            {windowDimensions.width < 595 ? "" : "Collections"}
          </Link>
          <Link to="/skins">
            <i className="fas fa-cube"></i>
            {windowDimensions.width < 595 ? "" : "Skins"}
          </Link>
          <Link to="/soundalerts">
            <i className="fas fa-volume-up"></i>
            {windowDimensions.width < 595 ? "" : "Sounds"}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Home);
