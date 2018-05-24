import React, { Component } from 'react';
import style from './container.scss';
import merge from '../lib/classnames';
import { segment } from '../hoc/router';
import _ByRegion from './byRegion';
import _ByTime from './byTime';
import Spinner from '../componentsReusable/spinner';
import SimpleSpin from '../componentsReusable/simpleSpin';
import dataBind from '../hoc/dataBind';
import loading from '../hoc/loading';
import { getAll } from '../repositories/geoRepository';

const _Main = (props) => {
  console.log('Main', props);
  return <div>main</div>;
};

const Main = segment(_Main);
// const ByRegion = segment(dataBind(_ByRegion), props => get(props.id));
const ByRegion = segment(dataBind(_ByRegion, props => getAll(), Spinner, {
  loadingClassName: style.loading,
}));
const ByTime = segment(dataBind(_ByTime, props => getAll(), Spinner, {
  loadingClassName: style.loading,
}));

export default class Container extends Component {
  render() {
    console.log('Container props', this.props);

    const { className, path, ...rest } = this.props;
    return (
      <div className={merge(className, style.container)}>
        <Main {...rest} className={style.flexFull} path="" exact />
        <ByRegion
          {...rest}
          className={style.flexFull}
          path="/byRegion{params}"
        />
        <ByTime {...rest} className={style.flexFull} path="/byTime" isLoading />
        {/* <Main path="" exact {...rest} />
        <ByRegion path="/byRegion{params}" {...rest} />
        <ByTime path="/byTime" isLoading {...rest} /> */}
      </div>
    );
  }
}
