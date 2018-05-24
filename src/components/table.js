import React, { Component } from 'react';
import style from './table.scss';

console.log('xxxxxxxxxx', style);

const Dot = (
  <svg>
    <circle cx="50" cy="50" r="40" fill="red" />
  </svg>
);

export default class Table extends Component {
  render() {
    console.log('Table', this.props);
    const {
      data,
      className,
      currentPath,
      basePath,
      movePage,
      ...rest
    } = this.props;

    if (!data) {
      return null;
    }
    data.sort(function (a, b) {
      return b.onfire ? 1 : -1;
    });

    return (
      <div className={className} {...rest}>
        {/* {JSON.stringify(data)} */}
        <table className={style.table}>
          <thead>
            <tr>
              <td>fire</td>
              <td>available</td>
              <td>battery</td>
              <td>address</td>
              <td>latitude</td>
              <td>longitude</td>
            </tr>
          </thead>
          <tbody>
            {data.map((v) => {
              if (v.onfire) {
                console.log(v.onfire);
              }
              return (
                <tr key={v.id}>
                  <td>{v.onfire ? 'yes' : 'no'}</td>
                  <td>{v.available ? 'yes' : 'no'}</td>
                  <td>{v.battery}</td>
                  <td>{v.address}</td>
                  <td>{v.lat}</td>
                  <td>{v.lng}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
