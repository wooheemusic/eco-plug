import React from 'react';
import style from './spinner.scss';
import merge from '../lib/classnames';

export default function Spinner(props) {
  // console.log('style.spinner', style.spinner, props.className);
  const { className, ...rest } = props;
  return (
    <svg className={merge(style.spinner, className)} {...rest}>
      <circle cx="50%" cy="50%" r="40%" />
    </svg>
  );
}
