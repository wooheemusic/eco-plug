import React, { Component } from 'react';
import './global.css';
import style from './App.scss';
import _Nav from './components/nav';
import _Container from './components/container';
import { segment } from './hoc/router';

// test
import { pathMatch } from './lib/pathMatcher';

// const url = 'username/qwd/';
// const mapping = '/username/{id}/**/';
// console.log('pathMatcherTest', pathMatch(url, mapping));

const Nav = _Nav;
const Container = _Container;
// const Container = segment(_Container);

class App extends Component {
  render() {
    console.log('App props', this.props);
    return (
      <div className={style.app}>
        <Nav {...this.props} />
        <Container path="aaa" {...this.props} />
        {/* <Container path="/info/**" {...this.props} /> */}
      </div>
    );
  }
}

export default App;
