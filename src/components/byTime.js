import React, { PureComponent } from 'react';
import style from './byTime.scss';
import merge from '../lib/classnames';
import mockDB from '../database/mockDB';

export default class ByTime extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log('ByTime', this.props);
    const {
      className, currentPath, basePath, movePage, ...rest
    } = this.props;
    return (
      <div className={merge(className, style.byTime)} {...rest}>
        ByTime{this.props.info}
      </div>
    );
  }
}
