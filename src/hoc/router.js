import React, { Component } from 'react';
import { pathMatch, relativeMatch } from '../lib/pathMatcher';
import {
  pushState,
  replaceState,
  getFromHistory,
  removeFromHistory,
} from '../lib/historyUtils';

const contextFactory = {};

// to be updated
// params, errorpage
// notFound interface
// both of hoc style, containment style
// fragment performance
// algorithm performance
// pathMatcher option
// multiPath, exactPath
// relative should be default!!!!

// let movePage = undefined;

function getContext(name = 'defaultRouter') {
  return contextFactory[name];
}

function root(
  WrappedComponent,
  { useContext = false, baseUrl = '', name = 'defaultRouter' } = {},
) {
  if (useContext === true) {
    if (name in contextFactory) {
      throw new Error(`The context name '${name}' is duplicated.`);
    }
    contextFactory[name] = React.createContext('');
  }

  return class extends Component {
    constructor(props) {
      super(props);

      this.baseUrl = baseUrl.endsWith('/')
        ? baseUrl.slice(0, baseUrl.length - 1)
        : baseUrl; // 'replace(/\/$/,'')' performs much worse than this.

      this.state = {
        path: this.getPath(),
        isPushing: false,
      };

      this.movePage = this.movePage.bind(this);

      window.addEventListener('popstate', () => {
        this.setState({ path: this.getPath(), isPushing: false });
      });
    }

    getPath() {
      const { pathname, hash, search } = window.location;
      return `${pathname}${hash}${search}`;
    }

    movePage(path, isPushing = true) {
      path = path.startsWith('/')
        ? this.baseUrl + path
        : `${this.baseUrl}/${path}`;
      if (path !== this.state.path) {
        this.setState({ path, isPushing });
      }
    }

    syncHistoryToState() {
      console.log('syncHistoryToState', this.state);
      if (this.state.isPushing) {
        pushState(this.state.path);
      } else {
        replaceState(this.state.path);
      }
    }

    render() {
      this.syncHistoryToState();
      return (
        <WrappedComponent
          movePage={this.movePage}
          currentPath={this.state.path}
          basePath={baseUrl}
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
        path,
        currentPath,
        isRelative = true,
        basePath,
        exact = false,
        ...rest
      } = this.props;

      // currentPath /bbb/aaa/123/ccc/ddd
      // currentPath /bbb/aaa/123/ccc

      // base /bbb
      // path /aaa/{id}/ccc
      // path aaa/{id}/ccc

      // to /bbb/aaa/{id}/ccc

      // last '/' to ''
      // console.log(currentPath, path, isRelative, basePath);
      if (isRelative) {
        const result = relativeMatch(currentPath, basePath, path, exact);
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

class NotFound extends Component {
  render() {
    const { children } = this.props;
    console.log('sdcscscsc', children);
    return <div {...this.props}>{children}</div>;
  }
}

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
      path,
      children,
      tabIndex,
      movePage,
      currentPath,
      basePath,
      ...rest
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

export { root, segment, getContext, Link, NotFound };
