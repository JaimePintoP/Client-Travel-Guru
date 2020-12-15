import React from "react";
import { withAuth } from "../../context/auth-context";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-text">
        <p>Copyright © 2020 Travel Guru </p>
      </div>
    );
  }
}

export default withAuth(Footer);
