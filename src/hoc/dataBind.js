import React, { Component } from 'react';
import loading from './loading';

/**
 * a HOC for databinding.
 * @param {react} WrappedComponent a component
 * @param {function} selectData return a plain object as data or a Promise that returns it. The returned data will be spread to properties of the given component.
 */
export default function dataBind(
  _WrappedComponent,
  selectData,
  LoadingComponent,
  loadingOptions,
) {
  const WrappedComponent = loading(
    _WrappedComponent,
    LoadingComponent,
    loadingOptions,
  );
  const getState = (data) => {
    if (typeof data === 'object' && data !== null) {
      return { isLoading: false, data };
    }
    return { isLoading: false };
  };
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.updateState = this.updateState.bind(this);
    }

    updateState(data) {
      this.setState(getState(data));
    }
    // .then((data) => {
    //   // updateState(data);
    // });

    static getDerivedStateFromProps(nextProps, prevState) {
      // console.log('getDerivedStateFromProps', nextProps, prevState, this);
      // modification check here later
      const data = selectData(nextProps);
      // console.log('data', data);
      if (data instanceof Promise) {
        return { isLoading: true, promise: data };
      }
      return { isLoading: false, data };
    }

    render() {
      // console.log('dataBind render this.state', this.state);
      const { isLoading, promise, data } = this.state;
      if (isLoading) {
        promise.then((_data) => {
          this.setState({ isLoading: false, data: _data });
        });
      }
      return (
        <WrappedComponent {...this.props} isLoading={isLoading} data={data} />
      );
    }
  };
}
