import React, { Component } from 'react';
import {View} from 'react-native'
import { Provider } from 'react-redux';
import { configureStore } from './reducers'
import FrontPage from './FrontPage';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FrontPage/>
      </Provider>
    );
  }
}


