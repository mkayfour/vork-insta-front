import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      defaultlogindom: true,
      findaccountemail: "",
      statusformail: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  forgot = async e => {
    console.log("clicked");

    this.setState({ defaultlogindom: false });
  };
  backtoLogin = e => {
    this.setState({ defaultlogindom: true });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onSubmit2 = async e => {
    e.preventDefault();

    const userData = {
      findaccountemail: this.state.findaccountemail
    };
    if (this.state.findaccountemail === "") {
      this.setState({ statusformail: "Need To Provide a ID" });
    } else {
      let sendObj = { email: this.state.findaccountemail };

      let sendarequest = await axios.post("/api/user/resettocken", sendObj);

      console.log(sendarequest);
      this.setState({ statusformail: sendarequest.data.message });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div
        className="container"
        style={{
          backgroundImage: `url($("https://images.pexels.com/photos/461064/pexels-photo-461064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")`
        }}
      >
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
                />
                <hr />
                <div class="card">
                  <div class="card-body">
                    {this.state.defaultlogindom ? (
                      <div>
                        <form onSubmit={this.onSubmit}>
                          <div class="form-group">
                            <input
                              onChange={this.onChange}
                              value={this.state.email}
                              error={errors.email}
                              id="email"
                              type="email"
                              placeholder="Enter Email"
                              className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                            />
                            <span className="red-text">{errors.name}</span>
                          </div>
                          <div class="form-group">
                            <input
                              onChange={this.onChange}
                              value={this.state.password}
                              error={errors.password}
                              id="password"
                              type="password"
                              placeholder="Enter password"
                              className={classnames("", {
                                invalid:
                                  errors.password || errors.passwordincorrect
                              })}
                            />
                          </div>
                          <button type="submit" class="btn btn-primary">
                            SignIn
                          </button>
                        </form>
                        <hr />
                      </div>
                    ) : (
                      <div>
                        <form onSubmit={this.onSubmit2}>
                          <div class="form-group">
                            <input
                              onChange={this.onChange}
                              value={this.state.findaccountemail}
                              error={errors.email}
                              id="findaccountemail"
                              type="email"
                              placeholder="Enter Email"
                              className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                            />
                            <span className="red-text">{errors.name}</span>
                          </div>

                          <button type="submit" class="btn btn-primary">
                            Find my Account
                          </button>
                          <h6>{this.state.statusformail}</h6>
                        </form>
                        <button
                          onClick={this.backtoLogin}
                          style={{
                            backgroundColor: "#FFFFFF",
                            display: "block",
                            border: "0px"
                          }}
                        >
                          Back to Login
                        </button>
                      </div>
                    )}
                    <hr />
                    <h6>
                      <button
                        onClick={this.forgot}
                        style={{
                          backgroundColor: "#FFFFFF",
                          display: "block",
                          border: "0px"
                        }}
                      >
                        forgot Password
                      </button>
                    </h6>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

// <div className='container'>
//         <div style={{marginTop: '4rem'}} className='row'>
//           <div className='col s8 offset-s2'>
//             <Link to='/' className='btn-flat waves-effect'>
//               <i className='material-icons left'>keyboard_backspace</i> Back to
//               home
//             </Link>
//             <div className='col s12' style={{paddingLeft: '11.250px'}}>
//               <h4>
//                 <b>Login</b> below
//               </h4>
//               <p className='grey-text text-darken-1'>
//                 Don't have an account? <Link to='/register'>Register</Link>
//               </p>
//             </div>
//             <form noValidate onSubmit={this.onSubmit}>
//               <div className='input-field col s12'>
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.email}
//                   error={errors.email}
//                   id='email'
//                   type='email'
//                   className={classnames('', {
//                     invalid: errors.email || errors.emailnotfound,
//                   })}
//                 />
//                 <label htmlFor='email'>Email</label>
//                 <span className='red-text'>
//                   {errors.email}
//                   {errors.emailnotfound}
//                 </span>
//               </div>
//               <div className='input-field col s12'>
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.password}
//                   error={errors.password}
//                   id='password'
//                   type='password'
//                   className={classnames('', {
//                     invalid: errors.password || errors.passwordincorrect,
//                   })}
//                 />
//                 <label htmlFor='password'>Password</label>
//                 <span className='red-text'>
//                   {errors.password}
//                   {errors.passwordincorrect}
//                 </span>
//               </div>
//               <div className='col s12' style={{paddingLeft: '11.250px'}}>
//                 <button
//                   style={{
//                     width: '150px',
//                     borderRadius: '3px',
//                     letterSpacing: '1.5px',
//                     marginTop: '1rem',
//                   }}
//                   type='submit'
//                   className='btn btn-large waves-effect waves-light hoverable blue accent-3'
//                 >
//                   Login
//                 </button>

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
