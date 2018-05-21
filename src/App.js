import React, { Component } from 'react';
import './global.css';
import style from './App.scss';
import Nav from './components/nav';
import Container from './components/container';
import { pathMatch } from './lib/pathMatcher';
// import Ap from './components/test1';
// import Bp from './components/test2';

const url = 'username/qwd/';
const mapping = '/username/{id}/**/';
console.log(pathMatch(url, mapping));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { movePage: this.pageMove.bind(this) };

    // window.location.hash = '';
    // window.location.search = '';
    console.log(window.location);
    // window.addEventListener()
  }

  pageMove(path) {
    this.setState({ pageName: path });
  }

  render() {
    return (
      <div className={style.app}>
        <Nav {...this.state} />
        <Container {...this.state} />
        {/* <Ap>
          <Bp scope="s" />
        </Ap> */}
      </div>
    );
  }
}

export default App;
