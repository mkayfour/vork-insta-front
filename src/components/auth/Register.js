import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",

      errors: {},
      role: "freelancer"
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <Link to="/" className="btn-flat waves-effect">
                  <i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;
                  Back To Home
                </Link>
                <hr />
                <img
                  src="https://i.ibb.co/2qT9Cqp/dev.png"
                  alt="dev"
                  border="0"
                  style={{ width: "200px", marginLeft: "150px" }}
                />

                <hr />
                <div class="card">
                  <div class="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Name"
                          onChange={this.onChange}
                          value={this.state.name}
                          error={errors.name}
                          id="name"
                          type="text"
                          className={classnames("", {
                            invalid: errors.name
                          })}
                        />
                        <span className="red-text">{errors.name}</span>
                      </div>

                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email"
                          className={classnames("", {
                            invalid: errors.email
                          })}
                        />
                        <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                        <span className="red-text">{errors.email}</span>
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password
                          })}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          id="password2"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password2
                          })}
                        />
                        <span className="red-text">{errors.password2}</span>
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">
                          selecttype
                        </label>
                        <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                          value={this.state.role}
                          onChange={e => {
                            this.setState({
                              role: e.target.value
                            });
                          }}
                        >
                          <option value="freelancer">Freelancer</option>
                          <option value="client">Client</option>
                        </select>
                      </div>

                      <button type="submit" class="btn btn-primary">
                        SignUp
                      </button>
                    </form>
                    <br />
                    <h6 style={{ fontSize: "15px", marginTop: "-10px" }}>
                      By Clicking <b>Signup</b> Button You are Allow us to enale
                      services you need to follow the rule as our communitity
                      predefined
                    </h6>
                    <h6 style={{ fontSize: "10px" }}>
                      ©2020 All Rights Reserved. VorkInsta private limited®.
                      Terms of service, Privacy.
                    </h6>
                    <br />
                    <h5 style={{ fontSize: "15px", marginTop: "-20px" }}>
                      <b>Follow Us</b>
                    </h5>{" "}
                    &nbsp;
                    <i
                      class="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>{" "}
                    &nbsp; <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
                    &nbsp;<i class="fa fa-twitter" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
