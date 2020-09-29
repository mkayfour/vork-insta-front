import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';

class Chatsss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      userNamewhithchat: '',
      message: '',
      show: 'false',
      Message: [],
      recivername: '',
      reciverid: '',
    };
  }

  clickchat = async (e) => {
    console.log(e.target.value);
    const {user} = this.props.auth;
    const userID = user.id;
    const recivernamespliting = e.target.value.split(',');
    console.log(recivernamespliting);
    this.setState({recivername: recivernamespliting[1]});
    this.setState({reciverid: recivernamespliting[0]});
    this.setState({userNamewhithchat: recivernamespliting[1]});
    setInterval(async () => {
      const getdata = {
        senderuserid: userID,
        ReciverUserid: this.state.reciverid,
      };
      const getChat = await axios.post('/getchatdata', getdata);
      console.log(getChat.data.data);
      this.setState({Message: getChat.data.data});
    }, 2000);
    console.log(this.state.Message);
  };

  submit = async (e) => {
    e.preventDefault();
    console.log(this.state.message);
    this.setState({message: ''});
    const {user} = this.props.auth;
    const userName = user.name;
    const userId = user.id;
    let sendobj = {
      SenderuserName: userName,
      senderuserid: userId,
      ReciverUsername: this.state.userNamewhithchat,
      ReciverUserid: this.state.reciverid,
      Message: this.state.message,
    };

    const sendmessage = await axios.post('/postchatmessage', sendobj);
    console.log(sendmessage.data.data);
  };

  componentDidMount = async () => {
    const {user} = this.props.auth;
    const userID = user.id;
    console.log(userID);
    const fetchedassignjob = await axios.get('/api/getanyuser/' + userID);
    console.log(fetchedassignjob.data.data);
    console.log(user.name);
    this.setState({users: fetchedassignjob.data.data});
  };

  render() {
    const {user} = this.props.auth;
    return (
      <div>
        <div>
          <div class='container'>
            <div class='row'>
              <div class='col-sm-12'>
                <div class='card'>
                  <div class='card-header'>
                    <b>chat</b>
                  </div>
                  <div class='card-body'>
                    <div class='row'>
                      <div class='col-sm-2'>
                        <div class='card'>
                          {this.state.users.map((el) => {
                            return (
                              <React.Fragment>
                                <div
                                  class='card'
                                  style={{margin: '10px 10px 10px 10px'}}
                                >
                                  <div class='card-header'>
                                    <b> {el.JobID.jobtitle}</b>
                                  </div>
                                  <div class='card-body'>
                                    <h6 style={{fontSize: '7px'}}>
                                      Assign User: {el.JobAssigntoUserID.name}
                                    </h6>
                                    <h6 style={{fontSize: '7px'}}>
                                      Job Creator: {el.JobcreatorUserID.name}
                                    </h6>
                                    <button
                                      type='button'
                                      class='btn btn-primary'
                                      value={
                                        el.JobAssigntoUserID._id +
                                        `,${el.JobAssigntoUserID.name}`
                                      }
                                      onClick={this.clickchat}
                                    >
                                      Chat
                                    </button>
                                  </div>
                                </div>
                                <hr />
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                      <div class='col-sm-10'>
                        <div class='card'>
                          <div class='alert alert-light' role='alert'>
                            <h6>
                              <b>TO:{this.state.userNamewhithchat}</b>
                            </h6>
                            <hr />

                            {this.state.Message.map((e) => {
                              return (
                                <div>
                                  <div
                                    class='alert alert-secondary'
                                    role='alert'
                                  >
                                    <h6> {e.Message} </h6>
                                  </div>
                                </div>
                              );
                            })}

                            <hr />
                            <form onSubmit={this.submit}>
                              <div class='input-group mb-3'>
                                <input
                                  type='text'
                                  class='form-control'
                                  placeholder='Message'
                                  aria-label="Recipient's username"
                                  aria-describedby='button-addon2'
                                  value={this.state.message}
                                  onChange={(e) => {
                                    this.setState({message: e.target.value});
                                  }}
                                />
                                <div class='input-group-append'>
                                  <button
                                    class='btn btn-outline-secondary'
                                    type='submit'
                                    id='button-addon2'
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
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

Chatsss.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Chatsss);
