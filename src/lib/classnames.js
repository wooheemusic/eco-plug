export default function merge(...classNames) {
  const result = [];
  for (const i in classNames) {
    if (classNames[i]) {
      result.push(classNames[i]);
    }
  }
  return result.join(' ');
}
