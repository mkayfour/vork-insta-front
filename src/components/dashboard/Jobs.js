import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Clientjobhistory} from './Clientjobhistory';
import axios from 'axios';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      jobtitle: '',
      jobdescription: '',
      skillsrequire: '',
      budget: Number,
      JObcreatoruserid: '',
      type: '',
      added: '',
      showcardbody: false,
      userjobdata: [],
    };
  }
  getuserdetail = async (e) => {
    this.setState({showcardbody: true});
    console.log(e.target.value);
    let userid = e.target.value;

    let userdata = await axios.get('/api/jobs/getjobsbyuser/' + userid);

    const Userdata = await userdata.data.data;
    console.log(userdata.data.data);
    await this.setState({userjobdata: Userdata});
    console.log(this.state.userjobdata);
  };

  onChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };
  clicked = (e) => {
    this.state.show === false
      ? this.setState({show: true})
      : this.setState({show: false});
    console.log(this.state.show);
  };

  close = (e) => {
    this.setState({show: false, added: ''});
  };
  onSubmit = async (e) => {
    e.preventDefault();

    const NewJOB = {
      jobtitle: this.state.jobtitle,
      jobdescription: this.state.jobdescription,
      skillsrequire: this.state.skillsrequire,
      budget: this.state.budget,
      JobcreatoruserID: this.state.type,
    };
    console.log(NewJOB);
    const sendpost = await axios.post('/api/jobs/createjob', NewJOB);

    if (sendpost.status === 200) {
      this.setState({added: 'Added Sucessfull'});
    } else {
      this.setState({added: sendpost.status});
    }
  };

  clear = (e) => {
    this.setState({
      jobtitle: '',
      jobdescription: '',
      skillsrequire: '',
      budget: '',
      type: '',
      added: '',
    });
  };
  addjobs = (e) => {};

  componentDidMount = async () => {
    const {user} = this.props.auth;
    const userID = user.id;
    this.setState({type: userID});

    const getDatafromdb = await axios.get('/api/jobs/getjobsbyuser/' + userID);

    if (getDatafromdb.data.data[0] === undefined) {
      this.setState({userjobdata: []});
    } else {
      this.setState({userjobdata: getDatafromdb.data.data});
      this.setState({showcardbody: true});
    }

    console.log(this.state.userjobdata);
  };
  render() {
    const {user} = this.props.auth;

    return (
      <div>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-9'>
              <div class='card'>
                <div class='row'>
                  <div
                    class='col-sm-9'
                    style={{marginTop: '15px', marginLeft: '10px'}}
                  >
                    <button
                      variant='primary'
                      type='button'
                      class='btn btn-primary'
                      data-toggle='modal'
                      data-target='#exampleModal'
                      onClick={this.clicked}
                    >
                      Add Jobs
                    </button>
                    <hr />

                    {this.state.show ? (
                      <div class='card'>
                        <h6>{this.state.added}</h6>
                        <div class='container'>
                          <form onSubmit={this.onSubmit}>
                            <div class='form-group'>
                              <input
                                type='text'
                                class='form-control form-control-sm'
                                id='jobtitle'
                                aria-describedby='emailHelp'
                                placeholder='Job Title'
                                onChange={this.onChange}
                                value={this.state.jobtitle}
                              />
                            </div>
                            <br />
                            <div class='form-group'>
                              <input
                                type='text'
                                class='form-control form-control-sm'
                                id='jobdescription'
                                placeholder='jobdescription'
                                onChange={this.onChange}
                                value={this.state.jobdescription}
                              />
                            </div>
                            <br />
                            <div class='form-group'>
                              <input
                                type='text'
                                class='form-control form-control-sm'
                                id='skillsrequire'
                                placeholder='Please Enter saprated by coma(,)'
                                onChange={this.onChange}
                                value={this.state.skillsrequire}
                              />
                            </div>
                            <br />
                            <div class='form-group'>
                              <input
                                type='number'
                                class='form-control form-control-sm'
                                id='budget'
                                placeholder='Enter Budget in $'
                                onChange={this.onChange}
                                value={this.state.budget}
                              />
                            </div>
                            <button
                              type='submit'
                              class='btn btn-primary'
                              style={{marginBottom: '20px'}}
                            >
                              Submit
                            </button>
                            &nbsp; &nbsp;
                            <button
                              onClick={this.clear}
                              class='btn btn-primary'
                              style={{marginBottom: '20px'}}
                            >
                              Clear
                            </button>
                            &nbsp; &nbsp;
                            <button
                              onClick={this.close}
                              class='btn btn-primary'
                              style={{marginBottom: '20px'}}
                            >
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div class='card'>
                <div class='card-header'>
                  <button
                    style={{border: '0px'}}
                    onClick={this.getuserdetail}
                    value={user.id}
                  >
                    {' '}
                    Chack My posted Job click Me
                  </button>
                </div>
                <div class='card-body'>
                  {this.state.showcardbody
                    ? this.state.userjobdata.map((job) => {
                        return (
                          <div>
                            <div class='card'>
                              <div class='card-body'>
                                <h5 class='card-title'>{job.jobtitle}</h5>
                                <h6 class='card-subtitle mb-2 text-muted'>
                                  Budget:{job.budget}
                                </h6>
                                <p class='card-text'>{job.jobdescription}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div class='col-sm-3'>
              <div class='card'>
                <h5 class='card-header'>Total Amount you posted</h5>
                <div class='card-body'>
                  <h5 class='card-title'>0 $</h5>
                </div>
              </div>
              <br />
              <br />
              <img
                src='https://i.ibb.co/2qT9Cqp/dev.png'
                alt='dev'
                border='0'
                style={{width: '200px'}}
              />
              <br />
              <h6 style={{fontSize: '15px', marginTop: '5px'}}>
                <b> Welcome to vorkinsta</b>
              </h6>
              <br />
              <h6 style={{fontSize: '10px', marginTop: '-20px'}}>
                We are community where we build a Entherpeneour and meet a
                clients to developer{' '}
              </h6>
              <br />
              <h5 style={{fontSize: '15px', marginTop: '-20px'}}>
                <b>Follow Us</b>
              </h5>{' '}
              &nbsp;
              <i
                class='fa fa-facebook-official'
                aria-hidden='true'
              ></i> &nbsp; <i class='fa fa-instagram' aria-hidden='true'></i>{' '}
              &nbsp;<i class='fa fa-twitter' aria-hidden='true'></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Jobs);
