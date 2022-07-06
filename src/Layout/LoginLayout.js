import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { GA } from '../_utilities';
import { eventActions, eventCategories } from '../_constants';
import routes from '../_routes/loginRoutes';

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.props.history.listen((location, action) => {
      GA.dispatchGAEvent(eventCategories.USER, eventActions.PAGEVIEW, `page=${location.pathname}`);
    });
  }
  createRoutes = () => {
    const retData = routes.map((route, index) => {
      return (route.component) ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => (
            <route.component {...props} />
          )} />
      ) : (null);
    });
    return retData;
  };
  render() {
    return (
      <>
        {this.createRoutes()}
      </>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

const connectedLoginLayout = connect(mapStateToProps)(LoginLayout);
export { connectedLoginLayout as LoginLayout };

