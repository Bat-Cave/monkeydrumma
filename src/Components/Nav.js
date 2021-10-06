import monkey from "../images/monke_banana_emote_cropped.png";
import { Link, withRouter } from "react-router-dom";
let Nav = () => {
  // const getWindowDimensions = () => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // };

  // const [windowDimensions, setWindowDimensions] = useState();

  // useEffect(() => {
  // setWindowDimensions(getWindowDimensions());
  // const handleResize = () => {
  //   setWindowDimensions(getWindowDimensions());
  // };
  // window.addEventListener("resize", handleResize);
  // return () => window.removeEventListener("resize", handleResize);
  // }, []);

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
            {"Home"}
          </Link>
          <Link to="/shop">
            <i className="fas fa-store-alt"></i>
            {"Shop"}
          </Link>
          <Link to="/viewcollection">
            <i className="fas fa-shapes"></i>
            {"Collections"}
          </Link>
          <Link to="/skins">
            <i className="fas fa-cube"></i>
            {"Skins"}
          </Link>
          <Link to="/soundalerts">
            <i className="fas fa-volume-up"></i>
            {"Sounds"}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Nav);
