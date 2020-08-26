/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';

export const createStore = () => {
  return reduxCreateStore(rootReducer);
};

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);
