import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Footer from "./Footer";
import { use } from "passport";
import Feed from "./Feed";
import Navbar from "./Navbar/Navbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    console.log("sadas");
  }

  render() {
    const { user } = this.props.auth;
    console.log(user);

    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
