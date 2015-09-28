import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import rootReducer from '../reducers';
import createHistory from 'history/lib/createBrowserHistory';

let middleware = [thunkMiddleware];



export default function configureStore(initialState) {
const store = compose(
  applyMiddleware(...middleware),
  reduxReactRouter({ createHistory })
)(createStore)(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

