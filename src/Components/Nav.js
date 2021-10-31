import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";

let Nav = () => {
  let path = typeof window !== "undefined" ? document.location.pathname : null;

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const links = [
    {
      to: "/",
      iconClass: "fas fa-home",
      text: "Home",
    },
    {
      to: "/shop",
      iconClass: "fas fa-store-alt",
      text: "Shop",
    },
    {
      to: "/viewcollection",
      iconClass: "fas fa-shapes",
      text: "Collections",
    },
    {
      to: "/skins",
      iconClass: "fas fa-cube",
      text: "Skins",
    },
    {
      to: "/soundalerts",
      iconClass: "fas fa-volume-up",
      text: "Sounds",
    },
  ];

  return (
    <div className="home">
      <nav>
        <div className="links">
          {links.map((l, i) => {
            return (
              <Link
                key={`link-${i}`}
                to={l.to}
                id={`${path === l.to ? "active" : ""}`}
              >
                <i className={l.iconClass}></i>
                {windowDimensions.width < 595 ? "" : l.text}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Nav);
