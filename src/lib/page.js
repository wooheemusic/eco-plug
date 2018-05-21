import React from 'react';

export default class Page {
  constructor(pageTree, youWannaUsePopstate = true) {
    this.usingPopstate = 'onpopstate' in window && youWannaUsePopstate;

    this.pageTree = pageTree;
    // ex
    this.patterns = [
      new RegExp(/ /),
      '/fruits/apple',
      '/fruits/kiwi',
      '/users/*/',
    ];
  }
  _getNameFromHash() {
    return window.location.hash.slice(1); // strings of length 0 or 1 return ''
  }

  _getPagePopstateName() {
    return window.location.pathname.slice(1); // pathname always starts with '/'
  }

  // return the first key if it does not exist
  // you may define an empty string key for root if you want to
  determineName(name, pagesMapping) {
    return name in pagesMapping ? name : Object.keys(pagesMapping)[0];
  }

  getNameFromUrl(underPopstate = this.usingPopstate) {
    if (underPopstate) {
      return this.determineName(this._getPagePopstateName());
    }
    return this.determineName(this._getNameFromHash());
  }

  pushUrlFromName(name, underPopstate = this.usingPopstate) {
    if (underPopstate) {
      // window.history
    } else {
      if (name === '') {
        window.location.href.substr(0, window.location.href.indexOf('#'));
      }
      window.location.hash = name !== '' ? `#${name}` : '';
    }
  }

  push(path, underPopstate = this.usingPopstate) {
    window.history.pushState(
      window.history.state,
      null,
      underPopstate ? path : `#${path}`,
    );
  }

  replaceUrlFromName(name, underPopstate = this.usingPopstate) {
    if (underPopstate) {
      // window.history
    } else {
      if (name === '') {
        window.location.href.substr(0, window.location.href.indexOf('#'));
      }
      window.location.hash = name !== '' ? `#${name}` : '';
    }
  }
}
