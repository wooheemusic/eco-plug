const result = {};

function test(time) {
  return new Promise((r) => {
    setTimeout(r(result), time);
  });
}

export default test;
