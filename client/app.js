import React from 'react';
import { render } from 'react-dom';
import Root from 'layouts/Root';
import Dashboard from 'layouts/Dashboard';
import LandingPage from 'layouts/LandingPage';
import './app.scss';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={LandingPage} />
      <Route path="dashboard" component={Dashboard}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
