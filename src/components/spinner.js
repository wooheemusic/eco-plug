import React from 'react';
import style from './spinner.scss';

export default function Spinner(props) {
  return (
    <svg className={style.spinner} {...props}>
      <circle cx="50%" cy="50%" r="40%" />
    </svg>
  );
}
