import pathMatch from './pathMatcher';

// put({ username: 'woohee', password: '123' });
function pushState(path, ...objects) {
  window.history.pushState(Object.assign({}, ...objects), null, path);
}

function updateState(...objects) {
  const { state = {} } = window.history;
  Object.assign(state, ...objects);
  window.history.replaceState(state, null, window.location.href);
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

export { pushState, updateState, getFromHistory, removeFromHistory };
