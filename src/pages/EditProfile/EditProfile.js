import axios from "axios";
import React from "react";
import { withAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import "./EditProfile.css";

class EditProfile extends React.Component {
  state = {
    name: undefined,
    username: undefined,
    nationality: undefined,
    myFavoriteTrip: undefined,
    description: undefined,
    image: undefined,
    isReady: true,
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    //used an if statement to avoid error when rending editProfile page from another page that is not the Profile page
    if (this.props.location.state) {
      this.setState({
        name: this.props.location.state.userInfo.name,
        username: this.props.location.state.userInfo.username,
        nationality: this.props.location.state.userInfo.nationality,
        myFavoriteTrip: this.props.location.state.userInfo.myFavoriteTrip,
        description: this.props.location.state.userInfo.description,
        image: this.props.location.state.userInfo.image,
      });
    } else {
      this.props.history.push(`/profile/${userId}`);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      username,
      nationality,
      myFavoriteTrip,
      description,
      image,
    } = this.state;
    const { userId } = this.props.match.params;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/editProfile/${userId}`,
        { name, username, nationality, myFavoriteTrip, description, image },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push(`/profile/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  handleFileUpload = (e) => {

    const file = e.target.files[0];
    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("image", file);

    this.setState({ isReady: false }, () => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
          withCredentials: true,
        })
        .then((response) => {
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state
          // this.setState({ image: response.data.secure_url });
          this.setState({ image: response.data.secure_url, isReady: true });
        })
        .catch((err) => {
          console.log("Error while uploading the file: ", err);
        });
    });
  };

  render() {
    return (
      <div>
        <header className="edit-form-header">
          <img
            className="profile-image"
            src={this.state.image}
            alt="User profile"
          />
          <h1>{this.state.name}</h1>
        </header>

        <form className="edit-form" onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label>Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={this.state.nationality}
            onChange={this.handleChange}
          />

          <label>Favorite Trip:</label>
          <input
            type="text"
            name="myFavoriteTrip"
            value={this.state.myFavoriteTrip}
            onChange={this.handleChange}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <label className="image-label">Image</label>
          <img
            style={{ width: "100px" }}
            src={this.state.image && this.state.image}
            alt=""
          ></img>
          <input
            id="image-upload"
            name="image"
            type="file"
            onChange={this.handleFileUpload}
          ></input>
          <span></span>

          <button
            className="form-button"
            type="submit"
            value="Submit"
            disabled={!this.state.isReady}
          >
            Save
          </button>
        </form>
        {this.props.location.state.userInfo ? (
          <div className="button-container">
            <Link
              to={`/deleteProfileConfirmation/${this.props.location.state.userInfo._id}`}
            >
              <button className="warning-button">Delete Account</button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth(EditProfile);
