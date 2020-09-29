import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="card" style={{ marginTop: "200px" }}>
              <div class="card-body">
                <a href="">
                  <img
                    src="https://i.ibb.co/2qT9Cqp/dev.png"
                    alt="dev"
                    border="0"
                    style={{ marginLeft: "90px" }}
                  />
                </a>
                <hr />
                <h5 style={{ marginLeft: "100px" }}>
                  <b> vorkinsta We Build Entrpreneur</b>
                </h5>
                <div
                  class="row"
                  style={{ alignItems: "center", marginTop: "40px" }}
                >
                  <div class="col-sm-6">
                    <Link to="/register">
                      {" "}
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        style={{ marginLeft: "140px" }}
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                  <div class="col-sm-6">
                    <Link to="/login">
                      {" "}
                      <button type="button" class="btn btn-outline-primary">
                        Login
                      </button>
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    );
  }
}

export default Landing;
