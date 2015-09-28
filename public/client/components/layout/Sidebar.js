import  React, {Component} from 'react';
import { default as Router, Link, Route, RouteHandler, Redirect } from 'react-router';

export default class Sidebar extends Component {
  render() {



    return (
<div className='sidebar'>
    <div className='title'>
      Example
    </div>
    <ul className='nav'>
      <li>
        <Link to={'/groups'}>{"Groups"}</Link>
      </li>
      <li>
        <Link to={'/groups'}>{"Groups"}</Link>
      </li>
      <li>
        <Link to={'/counter'}>{"Counter"}</Link>
      </li>      
      <li>
        <a className='active'>Milestones</a>
      </li>

    </ul>
  </div>
    );
  }
};



module.exports = Sidebar;