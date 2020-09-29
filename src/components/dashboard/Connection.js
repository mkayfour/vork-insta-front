import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';

class Connection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requirenmentbids: [],
      show: false,
      AssignedBid: [],
      showAssignJobs: false,
      assignJobStstus: '',
    };
  }

  acceptthisjob = async (e) => {
    console.log(e.target.value);
    const AssignJOBID = e.target.value;

    const FindObj = await this.state.requirenmentbids.filter((el) => {
      return AssignJOBID === el._id;
    });
    console.log(FindObj);

    let SendDataObj = {
      JobID: FindObj[0].Bidingpostid,
      JobcreatorUserID: FindObj[0].jobcreatorID,
      JobAssigntoUserID: FindObj[0].BiderUserID._id,
    };

    console.log(SendDataObj);
    const AssignJoba = await axios.post('/api/assigJob/', SendDataObj);

    console.log(AssignJoba.status);
    if (AssignJoba.status === 200) {
      this.setState({assignJobStstus: 'Assign Sucessfull'});
    } else {
      this.setState({assignJobStstus: 'Wait This IS not assigned'});
    }

    const {user} = this.props.auth;
    const userID = user.id;
    const getmyrequirenmentBid = await axios.get('/api/client/bid/' + userID);
    const myPostBidding = getmyrequirenmentBid.data.data;
    console.log(myPostBidding);
    if (getmyrequirenmentBid.data.data[0] === undefined) {
      this.setState({show: false});
    } else {
      this.setState({requirenmentbids: myPostBidding});
      this.setState({show: true});
      // console.log(this.state.requirenmentbids);
    }
  };

  getassignedjob = (e) => {
    console.log(e.target.value);
  };

  deletthis = async (e) => {
    let Id = e.target.value;
    console.log(Id);
    const DeletBYID = await axios.delete('/api/deletBid/' + Id);
    console.log(DeletBYID.status === 200);

    if (DeletBYID.status === 200) {
      const {user} = this.props.auth;
      const userID = user.id;
      const getmyrequirenmentBid = await axios.get('/api/client/bid/' + userID);
      const myPostBidding = getmyrequirenmentBid.data.data;
      console.log(myPostBidding);
      if (getmyrequirenmentBid.data.data[0] === undefined) {
        this.setState({show: false});
      } else {
        this.setState({requirenmentbids: myPostBidding});
        this.setState({show: true});
        // console.log(this.state.requirenmentbids);
      }
    } else {
    }
    // // console.log(Id);
    // const {user} = this.props.auth;
    // const userID = user.id;

    // console.log(userID);
    // const deletbid = await axios.delete('/api/deletBid/' + Id);
    // const getmyrequirenmentBid = await axios.get(
    //   '/app/getbids/creator/' + userID
    // );
    // const myPostBidding = getmyrequirenmentBid.data.data;

    // this.setState({requirenmentbids: myPostBidding});

    // console.log(deletbid);
  };
  componentDidMount = async () => {
    const {user} = this.props.auth;
    const userID = user.id;
    // const AssignJobs = await axios.get('/api/assignjob/freelancer/' + userID);
    // console.log(AssignJobs.data.data);
    // if (user.role === 'freelancer') {
    //   const fetcheddata = await axios.get(
    //     '/api/assignjob/freelancer/' + userID
    //   );

    //   console.log(fetcheddata);
    // } else if (user.role === 'client') {
    //   const {user} = this.props.auth;
    //   const userID = user.id;

    //   const fetcheddata = await axios.get('/api/assignjob/client/' + userID);
    //   console.log(fetcheddata.data.data);
    // } else {
    //   console.log('Somthing Goes wrong');
    // }

    const getmyrequirenmentBid = await axios.get('/api/client/bid/' + userID);

    const myPostBidding = getmyrequirenmentBid.data.data;
    console.log(myPostBidding);
    if (getmyrequirenmentBid.data.data[0] === undefined) {
      this.setState({show: false});
    } else {
      this.setState({requirenmentbids: myPostBidding});
      this.setState({show: true});
      // console.log(this.state.requirenmentbids);
    }

    const GetMyAssignJobs = await axios.get('/api/getanyuser/' + userID);
    const assignjobs = GetMyAssignJobs.data.data;
    console.log(assignjobs);
    await this.setState({AssignedBid: assignjobs});

    // await this.setState({ AssignedBid: GetMyAssignJobs });

    // if (assignjobs === undefined) {
    //   this.setState({ showAssignJobs: false });
    // } else {
    //   this.setState({ AssignedBid: GetMyAssignJobs });
    //   this.setState({ showAssignJobs: true });
    // }
  };

  render() {
    const {user} = this.props.auth;
    return (
      <div>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-9'>
              <div class='card'>
                <div class='card-header'>
                  <b>My Requirenmets Bids</b>
                </div>
                <div class='card-body'>
                  <h6 style={{fontSize: '10px'}}>
                    Make Sure Once you assign Job To Any user All beed with That
                    Job Will be Deleted
                  </h6>
                  {this.state.show ? (
                    this.state.requirenmentbids.map((el) => {
                      return (
                        <div>
                          <div class='card'>
                            <div class='card-body'>
                              <h5 class='card-title'>
                                <b>{el.Bidingpostid.jobtitle}</b>
                              </h5>
                              <h6 class='card-subtitle mb-2 text-muted'>
                                User-Name:{el.BiderUserID.name}/ BiddingPrice:
                                {el.BidingPrice}
                              </h6>
                              <p class='card-text'>{el.BidingDescription}</p>
                              <button
                                type='button'
                                class='btn btn-success'
                                value={el._id}
                                onClick={this.acceptthisjob}
                              >
                                Accept
                              </button>
                              <button
                                type='button'
                                class='btn btn-danger'
                                style={{marginLeft: '10px'}}
                                value={el._id}
                                onClick={this.deletthis}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h6>No Bid Found On Your Any Post</h6>
                  )}
                </div>
              </div>
              <hr />
              <div class='card'>
                <div class='card-header'>
                  <b>Assigned Jobs</b> <h6>{this.state.assignJobStstus}</h6>
                  <button value={user.id} onClick={this.getassignedjob}>
                    {' '}
                    Get My AssignedJob
                  </button>
                </div>
                <div class='card-body'>
                  {this.state.AssignedBid.map((el) => {
                    return (
                      <div>
                        <div class='card'>
                          <div class='card-body'>
                            <h5 class='card-title'>
                              <b>{el.JobID.jobtitle}</b>
                            </h5>
                            <h6 class='card-subtitle mb-2 text-muted'>
                              Assign To:{el.JobAssigntoUserID.name}
                            </h6>
                            <p class='card-text'>
                              JobCreator:{el.JobcreatorUserID.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div class='col-sm-3'>
              <div class='card'>
                <div class='card-body'>
                  <h5>
                    <b>Suggetions</b>
                  </h5>
                  <hr />
                  <a>
                    <h6>react js</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Connection.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Connection);
