import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Logo from '../assets/images/logo.png';
import { status, eventActions, eventCategories } from '../_constants';
import { commonFunctions, GA } from '../_utilities';
import { connect } from 'react-redux';
import { authActions } from '../_actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        incrisat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      rememberMe:'',
      username:'',
      active:'',
      email: '',
      password: '',
      isSubmitted: false
    }
  }

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    // this.props.history.push('/postlogin/dashboard')
    // this.setState({
    //   isSubmitted: true
    // });
    // const errorData = this.validate(true);
    // if (errorData.isValid) {
    //   const { email, password } = this.state;
    //   const sendData = {
    //     email,
    //     password
    //   };
    //   this.props.dispatch(authActions.login(sendData));
    // }

    event.preventDefault();
   
    this.setState({
      isSubmitted: true
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const { username, password,active } = this.state;
      const sendData = {
        active:"true",
        username,
        password
      };
      this.props.dispatch(authActions.login("?username=" + username + "&password=" + password ));
    }
    
    // this.props.history.push('/postlogin/dashboard')
  };

  validate = (isSubmitted) => {
    const { t } = this.props;
    const validObj = {
      isValid: true,
      message: ""
    };
    let isValid = true;
    const retData = {
      username: validObj,
      password: validObj,
      isValid
    };
    if (isSubmitted) {
      const { username, password } = this.state;
      if (!username) {
        retData.username = {
          isValid: false,
          message: "Email is required"
        };
        isValid = false;
      } else if (username && !commonFunctions.validateEmail(username)) {
        retData.username = {
          isValid: false,
          message: "Enter valid email"
        };
        isValid = false;
      }
      if (!password) {
        retData.password = {
          isValid: false,
          message: "Password is required"
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_login_status !== this.props.user_login_status && this.props.user_login_status === status.SUCCESS) {
      const { user } = this.props;
      console.log("user : ",user);
      if (user && user.info.user && !user.info.user.username) {
        this.props.history.push(`/prelogin/register/${user.token}`);
      } else {

        console.log("user : ",user);
        localStorage.setItem("userInfo", JSON.stringify(this.props.user));
        console.log("userInfo   :: ",localStorage.getItem("userInfo"));
        this.props.history.push('/postlogin/dashboard');
        if (user && user.info.user) {
          GA.dispatchGAEvent(eventCategories.USER, eventActions.LOGIN, `organization=${user.info.user.organization.id};id=${user.info.user._id}`);
        }
      }
    }
  }

  render() {
    const { username, password, isSubmitted } = this.state;
    const { user_login_status } = this.props;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="login-wrapper">
        <Box mb={6}>
          <img src={Logo} alt="" />
        </Box>
        <div id="formContent">
          <Container component="main" maxWidth="xs">
            <div className="paper">
              <form className="form" noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={this.handleStateChange}
                />
                <span className="text-danger">
                            {errorData.username.message}
                          </span>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleStateChange}
                />
                                <span className="text-danger">
                            {errorData.password.message}
                          </span>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.handleSubmit}
                  disabled={user_login_status === status.IN_PROGRESS}
                >
                  Sign In
                </Button>
              </form>
            </div>
          </Container>
        </div>
        <Box mt={6}>
          <Copyright />
        </Box>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("State : ",state);
  const { user_login_status, user } = state.procurement;
  return {
    user_login_status,
    user
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export default (connectedLogin);
