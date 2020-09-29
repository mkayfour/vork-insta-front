import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Feedfreelancer from "./feeds/Feedfreelancer";
import Feedclient from "./feeds/Feedclient";
class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <img
                  src="https://images.pexels.com/photos/4066041/pexels-photo-4066041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  class="rounded-circle"
                  alt="Cinque Terre"
                  width="50"
                  height="50"
                  style={{ alignSelf: "center", marginLeft: "80px" }}
                />
                <hr />
                <h5
                  style={{
                    alignSelf: "center",
                    marginLeft: "20px",
                    fontSize: "15px"
                  }}
                >
                  Username: {user.name}
                </h5>
                <br />
                {/* <h6
                  style={{
                    alignSelf: "center",
                    marginLeft: "20px",
                    fontSize: "10px",
                    marginTop: "-25px"
                  }}
                >
                  email: {user.email}
                </h6> */}
                <br />
                <h6
                  style={{
                    alignSelf: "center",
                    marginLeft: "20px",
                    fontSize: "10px"
                  }}
                >
                  projects: 0
                </h6>

                <h6
                  style={{
                    alignSelf: "center",
                    marginLeft: "20px",
                    fontSize: "10px"
                  }}
                >
                  Account type:{user.role}
                </h6>
              </div>
            </div>
            <br />
            <img
              src="https://i.ibb.co/2qT9Cqp/dev.png"
              alt="dev"
              border="0"
              style={{ width: "200px" }}
            />
            <br />
            <h6 style={{ fontSize: "15px", marginTop: "5px" }}>
              <b> Welcome to vorkinsta</b>
            </h6>
            <br />
            <h6 style={{ fontSize: "10px", marginTop: "-20px" }}>
              We are community where we build a Entherpeneour and meet a clients
              to developer{" "}
            </h6>
            <br />
            <h5 style={{ fontSize: "15px", marginTop: "-20px" }}>
              <b>Follow Us</b>
            </h5>{" "}
            &nbsp;
            <i
              class="fa fa-facebook-official"
              aria-hidden="true"
            ></i> &nbsp; <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
            &nbsp;<i class="fa fa-twitter" aria-hidden="true"></i>
          </div>
          <div class="col-sm-6">
            {user.role === "freelancer" ? <Feedfreelancer /> : <Feedclient />}
          </div>
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <h5>
                  <b>Suggetions</b>
                </h5>
                <hr />
                <a>
                  <h6>react js</h6>
                </a>
                <br />
                <a>
                  <h6>Node js</h6>
                </a>
                <br />
                <a>
                  <h6>Angular js</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Feed.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Feed);
