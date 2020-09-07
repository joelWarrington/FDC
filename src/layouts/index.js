import React, { Component } from 'react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import getFirebase from '../firebase';
import FirebaseContext from '../components/containers/FirebaseContext';
import '../reset.css';

class Layout extends Component {
  state = {
    firebase: null,
    authenticated: false,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      this.setState({ firebase });

      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      });
    });
  }

  render = () => {
    const { firebase, authenticated } = this.state;
    const { children } = this.props;

    if (!firebase) return null;

    return (
      <FirebaseContext.Provider value={firebase}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </FirebaseContext.Provider>
    );
  };
}

export default Layout;
