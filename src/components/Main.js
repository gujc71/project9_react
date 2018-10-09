import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import MySnackbar from "./mycom/MySnackbar";
import Menu from './menu/Menu';
import BoardList from './BoardList';
import UserProfile from './UserProfile';
import SignIn from './SignIn'; 

import {login} from '../reducer/App_reducer';
import {firebaseAuth} from '../reducer/Firestore';
import {firebase_board_list} from '../reducer/App_reducer';

const styles = theme => ({
  root: { 
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: '92vh',    
  },
});

function PrivateRoute ({component: Component, uid, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => uid !==null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/SignIn', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, uid, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => uid === null
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

class Main extends React.Component {

  componentDidMount () {
    this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
          this.props.login(user.uid);
          this.props.firebase_board_list();           
      } else this.props.login(null);
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }
  
  render() {
    const { classes, uid } = this.props;
    return (
        <Router>
          <div className={classes.root}>
            <Menu/>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <PrivateRoute uid={uid} exact path="/" component={BoardList}/>
                <PrivateRoute uid={uid} path="/BoardList" component={BoardList}/>
                <PrivateRoute uid={uid} path="/UserProfile" component={UserProfile}/>

                <PublicRoute uid={uid} path="/SignIn" component={SignIn}/>
                <PublicRoute uid={uid} component={NoMatch}/>
              </Switch>
            </main>
            <MySnackbar />
          </div>
        </Router>
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match url for <code>{location.pathname}</code>
    </h3>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
      uid: state.uid,
      boards: state.boards,
      selectedBoard: state.selectedBoard
    };
}

const mapDispatchToProps = dispatch => ({
  login: uid => dispatch(login(uid)),
  firebase_board_list: () =>  dispatch(firebase_board_list()),
})

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Main));



