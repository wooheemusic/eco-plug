import React, { PureComponent } from 'react';
import merge from '../lib/classnames';
import style from './loading.scss';

export default function loading(
  PureComponentDeferred,
  LoadingComponent,
  {
    startDuration = 1000,
    endDuration = 100, // startDuration,
    loadingClassName = '',
    loadingStyle,
  } = {},
) {
  return class Loader extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: props.isLoading,
        ending: false,
        unmounted: false,
      };

      this.unmount = this.unmount.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const isLoading = nextProps.isLoading || false;
      // console.log(
      //   'xxxxx',
      //   isLoading,
      //   prevState === true && isLoading === false,
      //   isLoading === true ? false : prevState.unmounted,
      // );
      // console.log(
      //   'yyyyyyy',
      //   isLoading,
      //   prevState.isLoading === true && isLoading === false,
      //   isLoading === true ? false : prevState.unmounted,
      // );
      return {
        isLoading,
        ending: prevState.isLoading === true && isLoading === false,
        unmounted: isLoading === true ? false : prevState.unmounted,
      };
    }

    componentWillUnmount() {
      this.willUnmount = true;
    }

    unmount() {
      if (!this.willUnmount && this.state.ending === true) {
        this.setState({ unmounted: true });
      }
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //   // Are we adding new items to the list?
    //   // Capture the scroll position so we can adjust scroll later.
    //   if (prevProps.list.length < this.props.list.length) {
    //     const list = this.listRef.current;
    //     return list.scrollHeight - list.scrollTop;
    //   }
    //   return null;
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   // If we have a snapshot value, we've just added new items.
    //   // Adjust scroll so these new items don't push the old ones out of view.
    //   // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    //   if (snapshot !== null) {
    //     const list = this.listRef.current;
    //     list.scrollTop = list.scrollHeight - snapshot;
    //   }
    // }

    getClassName() {
      return this.state.isLoading
        ? merge(loadingClassName, style.loading, style.visible)
        : merge(loadingClassName, style.loading);
    }

    // getTransition() {
    //   const transition = `opaciy ${
    //     this.state.isLoading === true ? startDuration : endDuration
    //   }s`;
    //   return {
    //     WebkitTransition: transition, // note the capital 'W' here
    //     msTransition: transition, // 'ms' is the only lowercase vendor pref
    //     transition,
    //   };
    // }

    render() {
      const { isLoading, unmounted, ending } = this.state;
      const { isLoading: x, ...rest } = this.props;
      if (ending === true) {
        setTimeout(this.unmount, endDuration);
      }
      // console.log(
      //   'xxxxxxxxxxxxxx',
      //   isLoading,
      //   ending,
      //   unmounted,
      //   this.getClassName(),
      //   this.props,
      // );
      return (
        <React.Fragment>
          <PureComponentDeferred {...rest} />
          {LoadingComponent && unmounted === false ? (
            <div className={this.getClassName()} style={loadingStyle}>
              <LoadingComponent />
            </div>
          ) : null}
        </React.Fragment>
      );
    }
  };
}
