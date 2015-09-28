import React, { Component } from 'react';
import Router, { Redirect, Route } from 'react-router';
import { createHistory } from 'history';

import { Test1 } from '.';

export default class GroupRouter extends Component {
  render() {
    return (
        <Route>
        <Route path="/groups" component={Test1} />
        <Route path="/groups2" component={Test1} />
        </Route>
    );
  }
}