import mockDB from '../database/mockDB';
import { returnPromise } from '../lib/buffer';

const isLocal = false;

function getLatency() {
  return 1000;
  // return Math.random() * 1000;
}

function _get(id) {
  return mockDB(id);
}

function get(id) {
  if (isLocal) {
    return _get(id);
  }
  return returnPromise(() => _get(id), getLatency());
}

function _getAll() {
  return mockDB;
}

function getAll() {
  if (isLocal) {
    return _getAll();
  }
  return returnPromise(() => _getAll(), getLatency());
}

export { get, getAll };
