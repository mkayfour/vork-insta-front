import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Feedclient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false
    };
  }

  knowmore = async e => {
    console.log(e.target.value);
    const Userid = e.target.value;
    // const fetchuserdetail = await axios.get("/api/users/getuser/" + Userid);
    // console.log(fetchuserdetail);
    const user = await this.state.data.filter(el => {
      return el.id === Userid;
    });

    await this.setState({ data: user });
    await this.setState({ show: true });
  };

  close = async e => {
    this.setState({ show: false });
    const fetchedData = await axios.get("/api/users/getalluser");
    console.log(fetchedData.data.data);
    const datas = fetchedData.data.data.slice(0, 10);
    this.setState({ data: datas });
    console.log(this.state.data);
  };

  componentDidMount = async () => {
    const fetchedData = await axios.get("/api/users/getalluser");
    console.log(fetchedData.data.data);
    const datas = fetchedData.data.data.slice(0, 10);
    this.setState({ data: datas });
    console.log(this.state.data);
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div>
        <div class="row" style={{ marginTop: "10px" }}>
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Find a Job by skills"
            />
          </div>
        </div>
        {this.state.data.map(datamap => {
          return (
            <div>
              <div class="card">
                <h5 class="card-header">{datamap.name}</h5>
                <div class="card-body">
                  <p class="card-text"> {datamap.email}</p>
                  <hr />
                  <div class="row">
                    <div class="col-sm-8">
                      <h6>
                        Member Since:&nbsp;
                        <b>{datamap.Membersince.slice(0, 10)}</b>
                      </h6>
                    </div>
                    <div class="col-sm-2">
                      <button
                        variant="primary"
                        type="button"
                        class="btn btn-primary"
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        style={{ width: "150px" }}
                        value={datamap.id}
                        onClick={this.knowmore}
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        <hr />
        {this.state.show ? (
          <div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{this.state.data[0].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Hire Me</h6>
                <p class="card-text">{this.state.data[0].email}</p>
                <button type="button" class="btn btn-outline-primary">
                  Send Invitation
                </button>

                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={this.close}
                  style={{ marginLeft: "20px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Feedclient.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Feedclient);
