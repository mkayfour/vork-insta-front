import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
class Feedfreelancer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      modeldata: [],
      show: false,
      Bidingpostid: '',
      BiderUserID: '',
      BidingDescription: '',
      BidingPrice: Number,
      jobposteduserID: '',
      type: '',
      status:
        'Once you submit we notify client so please wait for second once you submitt!',
      color: '',
    };
  }

  getJobId = async (e) => {
    console.log(e.target.value);
    const JobId = e.target.value;
    // const fetchuserdetail = await axios.get("/api/users/getuser/" + Userid);
    // console.log(fetchuserdetail);
    console.log(this.state.data);
    const job = await this.state.data.filter((el) => {
      return el._id === JobId;
    });
    console.log(job);

    await this.setState({data: job});
    await this.setState({show: true});
  };

  close = async (e) => {
    this.setState({show: false});
    const fetchedData = await axios.get('/api/jobs/getjobs');
    console.log(fetchedData.data.data);
    const datas = fetchedData.data.data.slice(0, 10);
    this.setState({data: datas});
    this.setState({
      status: '',
      color: '',
      BidingDescription: '',
      BidingPrice: '',
      type: '',
    });
    console.log(this.state.data);
  };

  componentDidMount = async () => {
    const fetchedData = await axios.get('/api/jobs/getjobs');
    console.log(fetchedData.data.data);
    this.setState({data: fetchedData.data.data});
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      Bidingpostid: this.state.data[0]._id,
      jobcreatorID: this.state.data[0].JobcreatoruserID._id,
      BiderUserID: this.state.type,
      BidingDescription: 'This IS test',
      BidingPrice: 62,
    };
    console.log(obj);

    const Bidconform = await axios.post('/api/bid', obj);
    if (Bidconform.status === 200) {
      this.setState({status: 'Your Bid Submitted Thank you', color: 'green'});
    } else {
      this.setState({status: 'Wait Let Me Chack WIth Client', color: 'red'});
    }
  };

  render() {
    const {user} = this.props.auth;

    return (
      <div>
        <div class='row' style={{marginTop: '10px'}}>
          <div class='col-sm-12'>
            <input
              type='text'
              class='form-control form-control-sm'
              id='colFormLabelSm'
              placeholder='Find a Job by skills'
            />
          </div>
        </div>
        {this.state.data.map((datamap) => {
          return (
            <div>
              <div class='card'>
                <h5 class='card-header'>
                  {datamap.jobtitle.slice(0, 40)}{' '}
                  <button
                    variant='primary'
                    type='button'
                    class='btn btn-primary'
                    data-toggle='modal'
                    data-target='#exampleModal'
                    value={datamap._id}
                    onClick={this.getJobId}
                    style={{width: '100px', marginLeft: '30%'}}
                  >
                    Bid
                  </button>
                </h5>
                <div class='card-body'>
                  <p class='card-text'>{datamap.jobdescription}</p>

                  <hr />
                  <div class='row'>
                    <div class='col-sm-4'>
                      <h6>
                        Budget:<b>{datamap.budget}</b>
                      </h6>
                    </div>
                    <div class='col-sm-4'>
                      <b>
                        <i class='fa fa-calendar' aria-hidden='true'></i>
                        &nbsp; {datamap.JobPosted}
                        {datamap.date.slice(0, 10)}
                      </b>
                    </div>
                    <div class='col-sm-4'></div>
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
            <div class='card'>
              <div class='card-body'>
                <h5 class='card-title' style={{fontSize: '25px'}}>
                  <b>{this.state.data[0].jobtitle}</b>
                </h5>
                <h6 class='card-subtitle mb-2 text-muted'>
                  Budget($):{this.state.data[0].budget}
                </h6>
                <p class='card-text'>{this.state.data[0].jobdescription}</p>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div class='form-group'>
                    <label for='BidingDescription'>Description</label>
                    <input
                      type='text'
                      class='form-control'
                      id='BidingDescription'
                      placeholder='Please Try To Describe How you can Help?'
                      value={this.state.BidingDescription}
                      onChange={(e) => {
                        this.setState({
                          BidingDescription: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div class='form-group'>
                    <label for='BidingDescription'>What's your Offer</label>
                    <input
                      type='number'
                      class='form-control'
                      id='BidingPrice'
                      placeholder='Please Enter your Offer'
                      value={this.state.BidingPrice}
                      onChange={(e) => {
                        this.setState({
                          BidingPrice: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div class='form-group'>
                    <label for='exampleFormControlSelect1'>
                      Are you Teachnical Person
                    </label>
                    <select
                      class='form-control'
                      value={this.state.type}
                      onChange={(e) => {
                        this.setState({
                          type: e.target.value,
                        });
                      }}
                    >
                      <option>Please Selct Type</option>
                      <option value={user.id}>Technical</option>
                    </select>
                  </div>
                  <h6 style={{color: this.state.color, fontSize: '10px'}}>
                    {this.state.status}
                  </h6>
                  <button type='submit' class='btn btn-primary'>
                    Submit
                  </button>
                </form>
                <hr />
                <button
                  type='button'
                  class='btn btn-outline-primary'
                  onClick={this.close}
                  style={{marginLeft: '20px'}}
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

Feedfreelancer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Feedfreelancer);
