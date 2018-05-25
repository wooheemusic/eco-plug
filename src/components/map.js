import React, { Component } from 'react';
import { tryUntilSuccess } from '../lib/buffer';
import { MarkerClusterer } from '../external/markerClusterer';
import imageSrc from '../images/cluster.svg';
import imageSrc1 from '../images/cluster1.svg';
import imageSrc2 from '../images/cluster2.svg';
import imageSrc3 from '../images/cluster3.svg';
import imageSrc4 from '../images/cluster4.svg';
import imageSrc5 from '../images/cluster5.svg';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.maxNumOfTrial = 20;
    // this.mapRef = React.createRef();
    this.map = null;
    this.initMap = this.initMap.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.checkMapReady = this.checkMapReady.bind(this);
    this.center = { lat: 37.566741, lng: 126.985045 }; // 37.566741, 126.985045

    this.imgUrlBase = imageSrc.replace('.svg', '');
    console.log('imgUrlBase', this.imgUrlBase);
    console.log('imgUrlBase', imageSrc);
    console.log('imgUrlBase', imageSrc1);
    console.log('imgUrlBase', imageSrc2);
    console.log('imgUrlBase', imageSrc3);
    console.log('imgUrlBase', imageSrc4);
    console.log('imgUrlBase', imageSrc5);
    this.icons = null;

    this.fireMarkers = [];
    this.normalMarkers = [];
  }

  initIcons() {
    this.icons = {
      dot: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: 0.3,
        scale: 15,
        // strokeColor: 'gold',
        strokeWeight: 0,
      },
      star: {
        path:
          'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 2,
      },
      circle2: {
        path:
          'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 2,
      },
      fire: {
        path:
          'M609.764,163.663C506.548,193.086,487.646,276.53,494.308,329.538C420.68,242.987,423.692,143.42,423.692,0     C187.531,89.046,242.446,345.733,235.384,423.692c-59.387-48.631-70.615-164.77-70.615-164.77     c-62.707,32.271-94.154,118.422-94.154,188.308c0,169.006,136.994,306,306,306c169.006,0,306-136.994,306-306     C682.615,346.792,608.869,300.468,609.764,163.663z M388.385,706.153c-149.493,0-270.692-126.143-270.692-267.75     c0-32.906,0.729-59.575,23.538-85.327c-2.495,14.9,32.883,142.526,148.41,135.84c-5.014-96.955-31.235-334.481,90.576-416.583     c-10.781,129.085,20.831,302.493,161.851,327.82c-8.074-51.761-7.133-137.888,29.141-153.8     c3.884,79.301,62.541,128.237,62.541,204.455C633.749,588.814,500.216,706.153,388.385,706.153z',
        fillColor: 'none',
        fillOpacity: 0.5,
        scale: 0.03,
        strokeColor: 'red',
        strokeWeight: 5,
      },
    };
  }

  componentDidMount() {
    this.tryInit();
  }

  tryInit() {
    tryUntilSuccess(
      () => Boolean(window.google),
      this.initMap,
      () => {
        alert('The Google Maps service is not available.');
      },
      10,
      this.maxNumOfTrial,
    );
  }

  initMap() {
    this.initIcons();

    const map = new google.maps.Map(this.props.mapRef.current, {
      center: this.center,
      zoom: 12,
      disableDefaultUI: true,
      // zoomControl: false,
      // scaleControl: false,
    });

    this.map = map;
    this.props.mapRef.map = map;

    console.log('Map initMap', map);

    // const marker = new google.maps.Marker({
    //   position: this.center,
    //   map,
    // });

    // map.addListener('center_changed', function (e) {
    //   // 3 seconds after the center of the map has changed, pan back to the
    //   // marker.
    //   window.setTimeout(function () {
    //     map.panTo(marker.getPosition());
    //   }, 3000);
    // });

    // marker.addListener('click', function () {
    //   map.setZoom(13);
    //   map.panTo(marker.getPosition());
    // });
  }

  checkMapReady() {
    return Boolean(this.map);
  }

  tryRenderMap() {
    tryUntilSuccess(
      this.checkMapReady,
      this.renderMap,
      () => {
        alert('The Google Maps service is not available.');
      },
      10,
      this.maxNumOfTrial,
    );
  }

  renderMap() {
    const { data } = this.props;
    const { map, fireMarkers, normalMarkers } = this;
    if (data) {
      // console.log('imageSrc', imageSrc);
      const markers = data.forEach((cell, i) => {
        // console.log('cccccc', cell);
        // if (i > 5) return null;
        // console.log(new google.maps.LatLng(cell.lat, cell.lng));
        if (!cell.onfire) {
          const marker = new google.maps.Marker({
            map,
            // position: { lat: cell.lat.toString(), lng: cell.lng.toString() },
            position: { lat: cell.lat, lng: cell.lng },
            // label: i.toString(),
            // draggable: true,
            // title: 'xxx',
            icon: imageSrc,
            // animation: google.maps.Animation.BOUNCE,
            averageCenter: true,
            minimumClusterSize: 0,
          });
          marker.addListener('click', function (e) {
            // map.setZoom(12);
            console.log(e);
            map.panTo(marker.getPosition());
          });
          normalMarkers.push(marker);
        } else {
          const marker = new google.maps.Marker({
            map,
            // position: { lat: cell.lat.toString(), lng: cell.lng.toString() },
            position: { lat: cell.lat, lng: cell.lng },
            // label: i.toString(),
            // draggable: true,
            // title: 'xxx',
            icon: this.icons.fire,
            // animation: google.maps.Animation.BOUNCE,
            averageCenter: true,
            minimumClusterSize: 0,
          });
          marker.addListener('click', function (e) {
            // map.setZoom(12);
            console.log(e);
            map.panTo(marker.getPosition());
          });
          fireMarkers.push(marker);
        }
      });

      new MarkerClusterer(map, normalMarkers, {
        styles: [
          {
            width: 40,
            height: 40,
            url: imageSrc1,
          },
          {
            width: 50,
            height: 50,
            url: imageSrc2,
          },
          {
            width: 60,
            height: 60,
            url: imageSrc3,
          },
          {
            width: 70,
            height: 70,
            url: imageSrc4,
          },
          {
            width: 80,
            height: 80,
            url: imageSrc5,
          },
        ],
      });
      // new MarkerClusterer(map, normalMarkers, {
      //   imagePath: this.imgUrlBase,
      //   imageExtension: 'svg',
      // });
    }
  }

  render() {
    console.log('Map render props', this.props);
    const { mapRef, ...rest } = this.props;
    this.tryRenderMap();
    // const {
    //   currentPath, basePath, movePage, ...rest
    // } = this.props;
    return (
      <div
        {...rest}
        ref={(map) => {
          this.props.mapRef.current = map;
        }}
      />
    );
  }
}

// <script>
//   var map;
//   function initMap() {
//     map =
//   }
// </script>
