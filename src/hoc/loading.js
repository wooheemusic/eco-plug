import React, { PureComponent } from 'react';
import style from './loading.scss';
import Spinner from '../components/spinner';

function loading({
  component: PureComponentDeferred,
  loadingComponent: LoadingComponent = Spinner,
  startDuration = 300,
  endDuration = startDuration,
}) {
  return class Loader extends PureComponent {
    constructor(props) {
      super(props);

      this.initClassName = props.className;

      this.state = {
        isLoading: props.isLoading,
        ending: false,
        unmounted: false,
      };

      this.startStlye = {};
    }

    getDerivedStateFromProps(nextProps, prevState) {
      const isLoading = nextProps.isLoading || false;
      return {
        isLoading,
        ending: prevState === true && isLoading === false,
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
        ? `${this.initClassName} ${style.loading} ${style.visible}`
        : `${this.initClassName} ${style.loading}`;
    }

    getTransition() {
      const transition = `opaciy ${
        this.state.isLoading === true ? startDuration : endDuration
      }s`;
      return {
        WebkitTransition: transition, // note the capital 'W' here
        msTransition: transition, // 'ms' is the only lowercase vendor pref
        transition,
      };
    }

    render() {
      const { isLoading, unmounted, ending } = this.state;
      if (ending === true) {
        setTimeout(this.unmount, endDuration);
      }
      return (
        <div>
          <PureComponentDeferred {...this.props} />
          {unmounted === false ? (
            <div className={this.getClassName()} style={this.getTransition()}>
              <LoadingComponent />
            </div>
          ) : null}
        </div>
      );
    }
  };
}
