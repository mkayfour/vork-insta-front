import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import Feed from "../Feed";
import Connection from "../Connection";
import Jobs from "../Jobs";
import Chatsss from "../Chat";
import Notification from "../Notification";
import Profile from "../profile";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//       )}
//     />
//   );
// }

// const routes = [
//     {
//       path: "/",
//       component: Feed
//     },
//     {
//       path: "/dashboard/Connection",
//       component: Connection
//     }
//   ];
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log(user.name);

    return (
      <Router>
        <div>
          <nav>
            <div class="navbar-fixed" style={{ backgroundColor: "#00a6ff" }}>
              <a href="#" class="brand-logo" style={{ margin: "10px 10px" }}>
                <h6
                  style={{
                    marginTop: "10px",
                    letterSpacing: "2px"
                  }}
                >
                  vorkInsta
                </h6>
              </a>
              <ul class=" right hide-on-med-and-down">
                <li style={{ marginRight: "5px" }}>
                  <Link to="/dashboard">
                    <h6 style={{ marginTop: "15px" }}>Home</h6>{" "}
                  </Link>
                </li>

                <li style={{ marginRight: "5px" }}>
                  <Link to="/dashboard/Connection">
                    {" "}
                    <h6 style={{ marginTop: "15px" }}>My-Bids</h6>{" "}
                  </Link>
                </li>

                <li style={{ marginRight: "5px" }}>
                  <Link to="/dashboard/Jobs">
                    <h6 style={{ marginTop: "15px" }}>Jobs</h6>{" "}
                  </Link>
                </li>
                <li style={{ marginRight: "5px" }}>
                  <Link to="/dashboard/Chat">
                    <h6 style={{ marginTop: "15px" }}>Chat</h6>{" "}
                  </Link>
                </li>
                <li style={{ marginRight: "200px" }}>
                  <Link to="/dashboard/notification">
                    <h6 style={{ marginTop: "15px" }}>Notification</h6>{" "}
                  </Link>
                </li>
                <li style={{ marginRight: "2px" }}>
                  <Link to="/dashboard/profile">
                    <i class="Large material-icons">perm_identity</i>{" "}
                  </Link>
                </li>

                <li style={{ marginRight: "0px" }}>
                  <a href="#" onClick={this.onLogoutClick}>
                    <i class="Large material-icons">exit_to_app</i>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/dashboard">
              <Feed />
            </Route>
            <Route path="/dashboard/Connection">
              <Connection />
            </Route>
            <Route path="/dashboard/Jobs">
              <Jobs />
            </Route>
            <Route path="/dashboard/Chat">
              <Chatsss />
            </Route>
            <Route path="/dashboard/notification">
              <Notification />
            </Route>
            <Route path="/dashboard/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
