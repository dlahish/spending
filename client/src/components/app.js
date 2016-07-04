import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';



class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="default-primary-color">
            <Header />
            <div style={{ padding: 30, textAlign: 'center' }} >
              {this.props.children}
            </div>

          </div>
          <div style={{height: 45}} className="light-primary-color">
            <Footer />
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
};

export default connect(null, actions)(App);
