import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
    return (
      <nav style={{ background: "#146C94", color: "#F6F1F1", padding: "10px", display: "flex", alignItems: "center" }}>
        <div>
          {/* <h1 style={{ margin: 10 }}>PartyPro</h1> */}
          <h1><Link to="/" style={{ textDecoration: "none", color: "white", transition: "0.3s" }}>PartyPro</Link></h1>
          <p style={{ margin: 10 }}>Join the Party!</p>
        </div>
        <ul style={{ listStyleType: "none", marginLeft: "auto", display: "flex", alignItems: "center" }}>
        {/* <li style={{ margin: "0 15px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "white", transition: "0.3s" }}>Home Page</Link>
          </li> */}
          <li style={{ margin: "0 15px" }}>
            <Link to="/party" style={{ textDecoration: "none", color: "white", transition: "0.3s" }}>Party Page</Link>
          </li>
          <li style={{ margin: "0 15px" }}>
            <Link to="/guest" style={{ textDecoration: "none", color: "white", transition: "0.3s" }}>Guest Page</Link>
          </li>
          <li style={{ margin: "0 15px" }}>
            <Link to="/food" style={{ textDecoration: "none", color: "white", transition: "0.3s" }}>Food Page</Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;