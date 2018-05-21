function setValue(name, value, obj) {
  if (typeof obj === 'object' && obj !== null) {
    const arr = name.split('.');
    let loop = obj;
    const l = arr.length;
    const e = l - 1;
    for (let i = 0; i < l; i++) {
      const p = arr[i]; // 'users'
      if (i !== e) {
        if (Number(arr[i + 1]) >= 0) {
          // true for "0", "1", ....
          if (typeof loop[p] !== 'object' || loop[p].length === undefined) {
            loop[p] = [];
          }
        } else if (typeof loop[p] !== 'object') {
          loop[p] = {};
        }
        loop = loop[p];
      } else {
        loop[p] = value;
        return true;
      }
    }
  }
  return false;
}

function getRegex(mapping) {
  return new RegExp(`^${mapping
    .replace(/\{(\w|\.|-)*\w\}/g, function (v) {
      return '*';
    })
    .replace(/[^?*\w]/g, function (v) {
      return '\\'.concat(v);
    })
    .replace(/[?*]/g, function (v) {
      if (v === '?') return '.';
      return '.*';
    })}$`);
}

function isMatching(segment, mapping) {
  return getRegex(mapping).test(segment);
}

function getNonBraceArray(mapping) {
  const regexp = /([^\{\}]+|^)(?=\{(\w|\.|-)*\w\})/;
  const intersections = [];
  let matchResult;
  while ((matchResult = mapping.match(regexp))) {
    intersections.push(matchResult[0]);
    mapping = mapping.slice(mapping.search('}') + 1);
  }
  intersections.push(mapping);
  return intersections;
}

// get an array of values embraced by the values of the filter array.
// If the last value of the filter array is empty string, it means 'to the end'.
function getFilteredArray(str, array) {
  const valueArray = [];
  const il = array.length;
  for (let i = 0; i < il - 1; i++) {
    if (str.slice(0, array[i].length) !== array[i]) {
      return null;
    }
    str = str.slice(array[i].length);
    const nextIndex =
      i === il - 2 && array[i + 1] === ''
        ? str.length
        : str.indexOf(array[i + 1]);
    const value = str.slice(0, nextIndex);
    valueArray.push(value);
    str = str.slice(value.length);
  }
  if (str !== array[il - 1]) {
    return null;
  }
  return valueArray;
}

function unbrace(brace) {
  // return brace.slice(1, brace.length - 1 );
  return brace.replace(/(^\{|\}$)/g, '');
}

function update(segment, mapping, result = {}) {
  const valueArray = getFilteredArray(segment, getNonBraceArray(mapping));
  if (valueArray === null) {
    return result;
  }
  const matches = mapping.match(/\{(\w|\.|-)+\}/g);
  if (matches) {
    const l = matches.length;
    for (let i = 0; i < l; i++) {
      setValue(unbrace(matches[i]), valueArray[i], result);
    }
  }
  return result;
}

// Apache Ant style matcher... + Spring's @PathVariable interface
// https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html
// https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-requestmapping-pattern-comparison
function pathMatch(url, urlMapping) {
  const result = {};
  // const urlMatches = url.match(/\/[^\/]+/g); // every element starts with '/'
  // const regex = /[^\/]+(?=\/|$)/g;
  const urlMatches = url.replace(/^\//, '').split('/');
  const mappingMatches = urlMapping.replace(/^\//, '').split('/');

  const { length: urlMatchesLength } = urlMatches;
  const { length: mappingMatchesLength } = mappingMatches;

  const collapseIndex = mappingMatches.indexOf('**');
  const gap = urlMatchesLength - mappingMatchesLength;
  if (gap < -1 || (collapseIndex === -1 && gap !== 0)) {
    return null;
  }
  for (let i = 0; i < mappingMatchesLength; i++) {
    const mapping = mappingMatches[i];
    if (mapping === '*' || mapping === '**') {
      continue;
    }
    const segment = urlMatches[i > collapseIndex ? i + gap : i];
    if (isMatching(segment, mapping)) {
      update(segment, mapping, result);
    } else {
      return null;
    }
  }
  return result; // returns null if not match
}
function relativeMatch(url, base, mapping) {
  const adjustedPath = (
    (mapping.startsWidth('/') ? '' : '/') + mapping
  ).replace(/\/$/, '');
  const newBasePath = base + adjustedPath;
  const numOfSlashes = newBasePath.match(/\//g).length;
  const l = url.length;
  let indexOfNth = -1;
  let hit = 0;
  for (let i = 0; i < l; i++) {
    if (url[i] === '/') {
      hit++;
      if (hit === numOfSlashes + 1) {
        indexOfNth = i;
        break;
      }
    }
  }
  const projectedCurrentPath = indexOfNth !== -1 ? url.slice(indexOfNth) : url;
  const result = pathMatch(projectedCurrentPath, newBasePath);
  result.basePath = projectedCurrentPath;
  return result;
}

export { pathMatch, relativeMatch };
