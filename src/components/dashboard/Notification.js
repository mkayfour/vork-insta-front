import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
    };
  }

  clicked = async (e) => {
    const UserId = e.target.value;

    const getnotification = await axios.get('/api/notification/' + UserId);
    console.log(getnotification.data.data);
    this.setState({show: true});
    this.setState({data: getnotification.data.data});
  };

  componentDidMount = async () => {
    const {user} = this.props.auth;
    const userID = user.id;

    const getnotification = await axios.get('/api/notification/' + userID);
    this.setState({data: getnotification.data.data});
    this.setState({show: true});
  };

  render() {
    const {user} = this.props.auth;
    return (
      <div>
        <div>
          <div class='container'>
            <div class='row'>
              <div class='col-sm-9'>
                <div class='card'>
                  <div class='card-header'>
                    <b>Notification</b>{' '}
                    <button
                      style={{border: '0px'}}
                      onClick={this.clicked}
                      value={user.id}
                    >
                      {' '}
                      Chack Notification
                    </button>
                  </div>
                  <div class='card-body'>
                    {this.state.show
                      ? this.state.data.map((el) => {
                          return (
                            <div>
                              <div class='alert alert-primary' role='alert'>
                                {el.NotificationMessage}
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
                  <div class='card-body'>
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

Notification.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Notification);
