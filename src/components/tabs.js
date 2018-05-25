import React, { Component } from 'react';
import style from './tabs.scss';
import merge from '../lib/classnames';

export default class Tabs extends Component {
  getClassName(num) {
    // console.warn(num, this.state.filterIndex);
    if (this.props.filterIndex === num) return `${style.tab} ${style.current}`;
    return style.tab;
  }

  render() {
    const {
      className,
      filterIndex,
      data: { length },
      setFilter,
      setFilterByEnter,
    } = this.props;
    return (
      <div className={merge(className, style.tabs)}>
        <div
          role="tab"
          tabIndex="0"
          className={this.getClassName(0)}
          onClick={() => {
            setFilter(0);
          }}
          onKeyDown={(e) => {
            setFilterByEnter(e, 0);
          }}
        >
          {filterIndex === 0 ? `Full List (${length})` : 'Full List'}
        </div>
        <div
          role="tab"
          tabIndex="0"
          className={this.getClassName(1)}
          onClick={() => {
            setFilter(1);
          }}
          onKeyDown={(e) => {
            setFilterByEnter(e, 1);
          }}
        >
          {filterIndex === 1 ? `On Fire (${length})` : 'On Fire'}
        </div>
        <div
          role="tab"
          tabIndex="0"
          className={this.getClassName(2)}
          onClick={() => {
            setFilter(2);
          }}
          onKeyDown={(e) => {
            setFilterByEnter(e, 2);
          }}
        >
          {filterIndex === 2 ? `Unavailable (${length})` : 'Unavailable'}
        </div>
      </div>
    );
  }
}
