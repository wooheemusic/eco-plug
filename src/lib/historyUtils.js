import pathMatch from './pathMatcher';

// put({ username: 'woohee', password: '123' });
function pushState(path, ...objects) {
  window.history.pushState(Object.assign({}, ...objects), null, path);
}

function replaceState(path, ...objects) {
  const { state } = window.history;
  const newState = state || {};
  Object.assign(newState, ...objects);
  window.history.replaceState(newState, null, path || window.location.href);
}

// get('username', 'password');
function getFromHistory(name) {
  const { state } = window.history;
  if (!state) {
    return undefined;
  }
  return state[name];
}

// remove('username', 'password');
function removeFromHistory(...keys) {
  const { state } = window.history;
  if (state) {
    const l = keys.length;
    for (let i = 0; i < l; i++) {
      delete state[keys[i]];
    }
    window.history.replaceState(state, null, window.location.href);
  }
}

export { pushState, replaceState, getFromHistory, removeFromHistory };
