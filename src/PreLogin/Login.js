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
    event.preventDefault();
    this.props.history.push('/postlogin/dashboard')
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
  };

  validate = (isSubmitted) => {
    const { t } = this.props;
    const validObj = {
      isValid: true,
      message: ""
    };
    let isValid = true;
    const retData = {
      email: validObj,
      password: validObj,
      isValid
    };
    if (isSubmitted) {
      const { email, password } = this.state;
      if (!email) {
        retData.email = {
          isValid: false,
          message: "Email is required"
        };
        isValid = false;
      } else if (email && !commonFunctions.validateEmail(email)) {
        retData.email = {
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
      if (user && user.userDetails && !user.userDetails.emailVerified) {
        this.props.history.push(`/prelogin/register/${user.token}`);
      } else {
        localStorage.setItem("userData", JSON.stringify(this.props.user));
        this.props.history.push('/postlogin/dashboard');
        if (user && user.userDetails) {
          GA.dispatchGAEvent(eventCategories.USER, eventActions.LOGIN, `organization=${user.userDetails.organizationId.name};id=${user.userDetails._id}`);
        }
      }
    }
  }

  render() {
    const { email, password, isSubmitted } = this.state;
    const { user_login_status } = this.props;
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={this.handleStateChange}
                />
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
  const { user_login_status, user } = state.procurement;
  return {
    user_login_status,
    user
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export default (connectedLogin);
