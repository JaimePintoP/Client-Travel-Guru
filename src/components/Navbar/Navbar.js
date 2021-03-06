import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";

//css
import "./Navbar.css";
//bootstrap css
import "bootstrap/dist/css/bootstrap.css";

class OurNavbar extends Component {
  render() {
    return (
      <Navbar className="ourNavbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Travel Guru</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {this.props.isLoggedIn ? (
            <Nav className="ml-auto">
              <Nav.Link href="/dashboard">Search</Nav.Link>
              <Nav.Link href={`/profile/${this.props.user._id}`}>
                Profile
              </Nav.Link>
              <NavDropdown title="Travel Posts" id="collasible-nav-dropdown">
                <NavDropdown.Item href={`/myPosts/${this.props.user._id}`}>
                  My Travel posts
                </NavDropdown.Item>
                <NavDropdown.Item href="/createPost">
                  Create Travel Posts
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href={`/favoritePosts/${this.props.user._id}`}>
                My Favorites
              </Nav.Link>
              <Nav.Link href="/travelLogs">My Travel Log</Nav.Link>
              <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
            </Nav>
          ) : (
              <Nav className="ml-auto">
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuth(OurNavbar);
