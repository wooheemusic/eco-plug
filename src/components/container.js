import React, { Component } from 'react';
import style from './container.scss';
import ByRegion from './byRegion';
import ByTime from './byTime';

export default class Container extends Component {
  getPage() {
    const { pageName, ...rest } = this.props;
    switch (pageName) {
    case 'byRegion':
      return <ByRegion {...rest} />;
    case 'byTime':
      return <ByTime {...rest} />;
    default:
      return null;
    }
  }

  render() {
    return <div className={style.container}>{this.getPage()}</div>;
  }
}
