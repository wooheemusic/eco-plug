import React, { PureComponent } from 'react';
import style from './byTime.scss';
import mockDB from '../database/mockDB';
import { xxx, set } from './test';

console.log('22222');
export default class ByTime extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    set(222);
    console.log(xxx, set);
    return <div className={style.byTime}>ByTime</div>;
  }
}
