import React, { PureComponent } from 'react';
import cn from 'classnames/bind';
import style from './table.scss';
import merge from '../lib/classnames';
import Gage from '../componentsReusable/gage';
import Fire from '../componentsReusable/fire';
// import Dot from '../componentsReusable/dot';
import Modal from './modal';

const cx = cn.bind(style);

export default class Table extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tuple: null };
    this.onHide = this.onHide.bind(this);
    this.onShow = this.onShow.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.warn(this.state.filterIndex, nextState.filterIndex);
  //   return this.state.filterIndex !== nextState.filterIndex;
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // data에 있는지 검열 후 null로 할 지 결정, data에 하이라이팅
    return { tuple: null };
  }

  onHide() {
    this.setState({ tuple: null });
  }

  onShow(v) {
    // console.warn(v);
    this.setState({ tuple: v });
  }

  render() {
    console.log('Table render props', this.props);
    const {
      data,
      className,
      currentPath,
      basePath,
      movePage,
      onRowClick,
      ...rest
    } = this.props;

    if (!data) {
      return <div>no result</div>;
    }

    const { tuple } = this.state;

    return (
      <div className={merge(className, style.tableContainer)} {...rest}>
        {/* {JSON.stringify(data)} */}
        <div className={style.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Fire</th>
                <th>Signal</th>
                <th>Battery</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => {
                const {
                  id, onfire, available, battery, address, lat, lng,
                } = v;
                return (
                  <tr key={id} onClick={() => this.onShow(v)}>
                    <td>{onfire ? <Fire className={style.fire} /> : null}</td>
                    <td>
                      {/* <Dot
                        className={style.dot}
                        color={available ? 'green' : 'red'}
                      /> */}
                      {available ? (
                        <span className={style.ok}>on </span>
                      ) : (
                        <span className={style.notOk}>off </span>
                      )}
                    </td>
                    <td>
                      <Gage
                        className={style.gage}
                        percentage={battery}
                        title={`${battery}%`}
                      />
                    </td>
                    <td>{address}</td>
                    <td>{lat}</td>
                    <td>{lng}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          END OF TABLE
        </div>
        <Modal
          className={cx('modal', { show: Boolean(tuple) })}
          onHide={this.onHide}
          {...tuple}
        />
      </div>
    );
  }
}
