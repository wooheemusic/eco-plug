import React, { Component } from 'react';
import { pathMatch, relativeMatch } from '../lib/pathMatcher';
import {
  pushState,
  updateState,
  getFromHistory,
  removeFromHistory,
} from '../lib/historyUtils';

let Context = null;

// to be updated
// params, errorpage
// notFound
// both of hoc style, containment style
// fragment performance
// algorithm performance
// pathMatcher option

// let movePage = undefined;

function root(WrappedComponent, { useContext = false, baseUrl = '/' }) {
  if (useContext === true) {
    Context = React.createContext('');
  }

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        path: this.getPath(),
      };

      this.movePage = this.movePage.bind(this);

      window.addEventListener('popstate', () => {
        this.setState({ path: this.getPath() });
      });
    }

    getPath() {
      const { pathname, hash, search } = window.location;
      return `${pathname}${hash}${search}`;
    }

    movePage(path) {
      if (path.startsWith('/')) {
        this.setState({ path });
      } else {
        this.setState({ path: `/${path}` });
      }
    }

    syncHistoryToState() {
      pushState(this.state.path);
    }

    render() {
      this.syncHistoryToState();
      return (
        <WrappedComponent
          movePage={this.movePage}
          currentPath={this.state.path}
          basePath=""
          relativePath={this.state.path}
          {...this.props}
        />
      );
    }
  };
}

// the props propagation for descendingUrl is interrupted
function segment(WrappedComponent, mapping) {
  // pathMatch;
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      const {
        path, currentPath, isRelative, basePath, ...rest
      } = this.props;

      // currentPath /bbb/aaa/123/ccc/ddd
      // currentPath /bbb/aaa/123/ccc

      // base /bbb
      // path /aaa/{id}/ccc
      // path aaa/{id}/ccc

      // to /bbb/aaa/{id}/ccc

      // last '/' to ''

      if (isRelative) {
        const result = relativeMatch(currentPath, basePath, path);
        if (result) {
          return (
            <WrappedComponent
              currentPath={currentPath}
              // basePath={xxx} // this is in result
              {...result}
              {...rest}
            />
          );
        }
        return null;
      }
      const result = pathMatch(currentPath, path);
      if (result) {
        return (
          <WrappedComponent
            currentPath={currentPath}
            basePath={basePath}
            {...result}
            {...rest}
          />
        );
      }
      return null;
    }
  };
}

// class Segment extends Component {
//   constructor(props) {
//     super(props);
//     const { path } = props;
//     if (typeof path !== 'string') {
//       console.warn('The prop of \'path\' is missing.');
//     }
//   }
//   render() {
//     const { path, children, isRelative } = this.props;
//     return path ? children : null;
//   }
// }

class Link extends Component {
  constructor(props) {
    super(props);
    if (!props.movePage) {
      console.warn('The prop of \'movePage\' is missing.');
    }

    this.go = this.go.bind(this);
    this.goByKey = this.goByKey.bind(this);
  }

  go() {
    const { movePage, path } = this.props;
    movePage(path);
  }

  goByKey(e) {
    if (e.keyCode === 13) {
      this.go();
    }
  }

  render() {
    const {
      path, children, tabIndex, movePage, ...rest
    } = this.props;
    return (
      <div
        role="button"
        tabIndex={tabIndex || 0}
        onClick={this.go}
        onKeyDown={this.goByKey}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

export { root as default, segment, Context };
