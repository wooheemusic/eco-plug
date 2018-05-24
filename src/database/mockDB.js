import data1 from './data1.json';
// lat: '{{floating(37.466741, 37.666741)}}',
// lng: '{{floating(126.885045, 127.085045)}}',
import data2 from './data2.json';
// lat: '{{floating(37.556741, 37.576741)}}',
//     lng: '{{floating(126.975045, 126.995045)}}',

const center = { lat: 37.566741, lng: 126.985045 };
console.log(data1);
const data = data1.concat(data2);

// const s = 1;
// const n = 100;
// for (let i = 0; i < n; i++) {
//   const marker = {};
//   // newPoint.lat = center.lat + s * (i / n - 0.5);
//   // newPoint.lng = center.lng;
//   marker.lat = center.lat;
//   marker.lng = center.lng + s * (i / n - 0.5);
//   // newPoint.label = i;
//   data.push(marker);
// }

// console.log(data);

export default data;
