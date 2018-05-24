import React, { PureComponent } from 'react';
import Resizable from 're-resizable';
import merge from '../lib/classnames';
import style from './byRegion.scss';
import mockDB from '../database/mockDB';
import Map from './map';
import Table from './table';

export default class ByRegion extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
    this.mapRef = {};
    this.log = this.log.bind(this);
  }

  log() {
    const { map, current } = this.mapRef;
    if (map) {
      // console.log(map, current);
      console.log(map.getBounds());
      console.log(map.getCenter());
    }
  }

  // componentDidMount(){
  //   if(this.props.data){

  //   }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.data && this.props.data) {
      this.resizable.updateSize({ width: '60%' });
    }
  }

  render() {
    console.log('ByRegion props', this.props);
    const {
      className,
      path,
      currentPath,
      basePath,
      movePage,
      data,
      ...rest
    } = this.props;
    console.log(data);
    return (
      <div className={merge(className, style.byRegion)} {...rest}>
        <div className={style.header}>
          <div>By Region</div>{' '}
          <div>
            <button onClick={this.log}>log</button>
            <button onClick={this.log}>log</button>
            <button onClick={this.log}>log</button>
            <button onClick={this.log}>log</button>
          </div>
        </div>

        <div className={style.container}>
          <React.Fragment key="1232">
            <Table className={style.list} data={data} />
          </React.Fragment>
          <React.Fragment key="123">
            <Resizable
              ref={(ref) => {
                this.resizable = ref;
              }}
              // defaultSize={{
              //   height,
              // }}
              defaultSize={{ width: '100%' }}
              enable={{
                top: false,
                right: false,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              className={style.resizable}
            >
              <Map
                className={style.map}
                data={data}
                mapRef={this.mapRef}
                // currentPath={currentPath}
                // basePath={basePath}
                // movePage={movePage}
                // {...rest}
              />
            </Resizable>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
