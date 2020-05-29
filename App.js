import React from 'react';
import {StatusBar, View} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Reduxthunk from 'redux-thunk';
import CartReducer from './src/store/reducer/CartReducer';

const rootReducer = combineReducers({
  cartItems: CartReducer,
});

const store = createStore(rootReducer, applyMiddleware(Reduxthunk));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </Provider>
  );
};

export default App;
