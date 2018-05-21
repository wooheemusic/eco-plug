import React, { PureComponent } from 'react';
import style from './byRegion.scss';
import mockDB from '../database/mockDB';
import { xxx, set } from './test';

export default class ByRegion extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(xxx, set);
    console.log(style);
    return (
      <div className={style.byRegion}>
        ByRegion
        {/* <button
          onClick={() => {
            this.props.movePage('byTime');
          }}
        >
          byTime
        </button> */}
      </div>
    );
  }
}
