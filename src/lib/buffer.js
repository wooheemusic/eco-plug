const bufferStorage = {};

export function deleteBuffer(groupName) {
  delete bufferStorage[groupName];
}

// please use this if the function spends too long time.
export function buffer(
  groupName,
  func,
  milliseconds = 200,
  isSavingLast = true,
  includeElapsed = true,
) {
  const givenTime = Date.now();
  if (!(groupName in bufferStorage)) {
    bufferStorage[groupName] = {
      ignoreSince: givenTime,
      timeout: 0,
      milliseconds,
    };
    func();
  } else if (bufferStorage[groupName].timeout === 0) {
    // ignores any if setTimeout is preserved.
    const { ignoreSince, milliseconds: _milliseconds } = bufferStorage[
      groupName
    ];
    const waited = givenTime - ignoreSince;
    if (waited > _milliseconds) {
      if (includeElapsed) {
        func();
        bufferStorage[groupName].ignoreSince = Date.now();
      } else {
        bufferStorage[groupName].ignoreSince = givenTime;
        func();
      }
    } else if (isSavingLast) {
      const executeAfter = _milliseconds - waited + 1;
      bufferStorage[groupName].timeout = window.setTimeout(function () {
        // window.setTimeout always returns a positive integer.
        if (includeElapsed) {
          func();
          bufferStorage[groupName].ignoreSince = Date.now();
        } else {
          bufferStorage[groupName].ignoreSince = Date.now();
          func();
        }
        bufferStorage[groupName].timeout = 0;
      }, executeAfter);
    }
  }

  // clearBufferStorage
  const keys = Object.keys(bufferStorage);
  const l = keys.length;

  if (l > 10) {
    for (let i = 0; i < l; i++) {
      const name = keys[i];
      if (name !== groupName) {
        const {
          timeout,
          ignoreSince,
          milliseconds: _milliseconds,
        } = bufferStorage[name];
        if (timeout === 0 && givenTime - ignoreSince > _milliseconds) {
          deleteBuffer(name);
        }
      }
    }
  }
}

export function tryUntilSuccess(
  check,
  onSuccess,
  onFail,
  duration = 10,
  max = 10,
  trial = 0,
) {
  trial++;
  if (check()) {
    onSuccess();
    return;
  }
  if (trial < max) {
    setTimeout(
      tryUntilSuccess,
      duration,
      check,
      onSuccess,
      onFail,
      duration,
      max,
      trial,
    );
  } else {
    onFail();
  }
}

export function returnPromise(callback, latency = 0) {
  return new Promise((resolve) => {
    // console.log('xxxxxxxxxxx', latency);
    if (latency >= 0) {
      setTimeout(() => {
        // console.log('yyyyyyyyyy');
        resolve(callback());
      }, latency);
    } else {
      resolve(callback());
    }
  });
}
