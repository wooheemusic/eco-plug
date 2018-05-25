import React, { Component } from 'react';
import style from './gage.scss';

export default class Gage extends Component {
  constructor(props) {
    super(props);

    const { defaultColor, thresholds } = this.props;

    this.thresholds = thresholds || [
      { threshold: 20, color: 'red' },
      { threshold: 45, color: 'orange' },
    ];
    this.defaultColor = defaultColor || 'green';
  }

  getColor(percentage) {
    const { thresholds } = this;
    const l = thresholds.length;
    let myColor;
    let index = -1;
    for (let i = 0; i < l; i++) {
      const currentThreshold = thresholds[i].threshold;
      if (
        percentage < currentThreshold &&
        (index === -1 || currentThreshold < thresholds[index].threshould)
      ) {
        index = i;
      }
    }
    if (index !== -1) {
      myColor = thresholds[index].color;
    }
    return myColor || this.defaultColor;
  }

  render() {
    const {
      className,
      percentage,
      stroke = '#aaaaaa',
      strokeWidth = 1,
      title: _title,
      ...rest
    } = this.props;
    return (
      <svg
        className={className ? `${className} ${style.gage}` : style.gage}
        width="70"
        height="10"
        {...rest}
      >
        {/* <title>{_title}<title> */}
        <rect
          width={`${percentage}%`}
          fill={this.getColor(percentage)}
          height="100%"
          stroke="transparent"
          strokeWidth={strokeWidth}
        />
        <rect
          width="100%"
          fill="transparent"
          height="100%"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }
}
