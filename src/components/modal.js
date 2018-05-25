import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import merge from '../lib/classnames';
import style from './modal.scss';
import Close from '../componentsReusable/close';

export default class Modal extends PureComponent {
  render() {
    const {
      className, onHide, id, ...rest
    } = this.props;
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'This is a fake example',
          backgroundColor: 'rgba(239,193,78,0.5)',
          borderColor: 'rgba(239,193,78,0.5)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239,193,78,1)',
          hoverBorderColor: 'rgba(239,193,78,1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    console.log('Modal render props', this.props);
    return (
      <div className={merge(style.modal, className)}>
        <div className={style.header}>
          <div>{id ? `Detail (${id})` : ' '}</div>
          <button onClick={onHide}>
            <Close className={style.close} color="white" />
          </button>
        </div>
        <div className={style.body}>
          {id ? (
            <Bar
              data={data}
              // width={100}
              // height={300}
              options={{
                maintainAspectRatio: false,
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
