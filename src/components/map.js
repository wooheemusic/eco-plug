import React, { Component } from 'react';
import { tryUntilSuccess } from '../lib/buffer';
import { MarkerClusterer } from '../external/markerClusterer';
import imageSrc from '../images/m1.png';

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
    const map = new google.maps.Map(this.props.mapRef.current, {
      center: this.center,
      zoom: 12,
      disableDefaultUI: true,
      // zoomControl: false,
      // scaleControl: false,
    });

    this.map = map;
    this.props.mapRef.map = map;

    console.log(map);

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
    const { map } = this;
    if (data) {
      console.log('imageSrc', imageSrc);
      const markers = data.map((cell, i) => {
        // console.log('cccccc', cell);
        // if (i > 5) return null;
        // console.log(new google.maps.LatLng(cell.lat, cell.lng));
        const marker = new google.maps.Marker({
          map,
          // position: { lat: cell.lat.toString(), lng: cell.lng.toString() },
          position: { lat: cell.lat, lng: cell.lng },
          label: i.toString(),
          // draggable: true,
          // title: 'xxx',
          icon: null,
          // animation: google.maps.Animation.BOUNCE,
          averageCenter: true,
          minimumClusterSize: 0,
        });
        marker.addListener('click', function (e) {
          // map.setZoom(12);
          console.log(e);
          map.panTo(marker.getPosition());
        });
        return marker;
      });

      new MarkerClusterer(map, markers, {
        imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      });
    }
  }

  render() {
    console.log('Map render', this.props);
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
