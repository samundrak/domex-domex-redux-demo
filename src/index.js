import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';

import { Router, Doxpress } from './lib/index';
import DoxpressRedux from './doxpress-redux/DoxpressRedux';
import App from './App';
import userRouter from './routes/user';

const router = new Router();
const doxpress = new Doxpress();
doxpress.addRouter(router);

userRouter(router);

const doxpressRedux = new DoxpressRedux(doxpress);
doxpressRedux.enableDevtool();
const store = doxpressRedux.createStore({
  todo: [],
});

ReactDOM.render(
  <Provider store={store}>
    <App doxpress={doxpress} />
  </Provider>,
  document.getElementById('root'),
);
