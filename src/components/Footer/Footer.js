import React from "react";
import { withAuth } from "../../context/auth-context";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>Copyright © 2020 Travel Guru </p>
      </footer>
    );
  }
}

export default withAuth(Footer);
