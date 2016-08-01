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
          <div>
            <Header />
          </div>

          <div className="default-primary-color"
            style={{
              // marginTop: '56px' ,
              paddingTop: '40px',
              minHeight: '450px',
              textAlign: 'center',
              position: 'absolute',
              display: 'block',
              top: '48px',
              width: '100%'
             }} >
            {this.props.children}
          </div>

          <div style={{
            height: 45,
            fontSize: 15,
            backgroundColor: '#464646',
            color: 'white',
            display: 'block',
          }} className="light-primary-color">
            <Footer />
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
};

export default connect(null, actions)(App);
