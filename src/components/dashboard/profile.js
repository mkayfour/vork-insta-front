import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      color: "red"
    };
  }

  editmode = e => {
    if (this.state.show === true) {
      this.setState({ show: false });
      this.setState({ color: "red" });
    } else if (this.state.show === false) {
      this.setState({ show: true });
      this.setState({ color: "green" });
    } else {
      console.log("cool");
    }

    console.log(this.state.show);
  };

  render() {
    const { user } = this.props.auth;
    console.log(user.name);
    return (
      <div>
        <div>
          <div class="container">
            <div class="row">
              <div class="col-sm-9">
                <div class="card">
                  <div class="card-header">
                    <b>Profile</b>
                  </div>
                  <div class="card-body">
                    <img
                      src="https://images.pexels.com/photos/4066041/pexels-photo-4066041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      class="rounded-circle"
                      alt="Cinque Terre"
                      width="100"
                      height="100"
                      style={{ alignSelf: "center", marginLeft: "300px" }}
                    />
                    <hr />
                    <div class="card">
                      <div class="card-body">
                        <div style={{ marginLeft: "250px" }}>
                          <h5>
                            <b>Name : {user.name}</b>
                          </h5>
                          <br />
                          <h5>
                            <b>emailID : {user.email}</b>
                          </h5>
                          <br />
                          <h5>
                            <b>password : ***********</b>
                          </h5>
                        </div>

                        <hr />
                        <div class="row">
                          <div class="col-sm-6">
                            <div style={{ marginLeft: "10px" }}>
                              <b> Edit mode </b>: &nbsp;
                              <div
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  backgroundColor: this.state.color,
                                  borderRadius: "50%"
                                }}
                              ></div>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div style={{ marginLeft: "100px" }}>
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                onClick={this.editmode}
                              >
                                EditMode
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {this.state.show ? (
                          <form>
                            <div class="form-group">
                              <label for="exampleInputEmail1">
                                Email address
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                              />
                              <small
                                id="emailHelp"
                                class="form-text text-muted"
                              >
                                We'll never share your email with anyone else.
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Password
                              </label>
                              <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                              />
                            </div>
                            <div class="form-group form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="exampleCheck1"
                              />
                              <label
                                class="form-check-label"
                                for="exampleCheck1"
                              >
                                Check me out
                              </label>
                            </div>
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
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
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);
