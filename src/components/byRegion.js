import React, { PureComponent } from 'react';
import Resizable from 're-resizable';
import merge from '../lib/classnames';
import style from './byRegion.scss';
import mockDB from '../database/mockDB';
import Map from './map';
import Table from './table';
import Tabs from './tabs';

export default class ByRegion extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterIndex: 0,
    };

    this.setFilter = this.setFilter.bind(this);
    this.setFilterByEnter = this.setFilterByEnter.bind(this);

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

  setFilter(filterIndex) {
    this.setState({ filterIndex });
  }

  setFilterByEnter(e, filterIndex) {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      this.setFilter(filterIndex);
    }
  }

  // componentDidMount(){
  //   if(this.props.data){

  //   }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('ByRegion componentDidUpdate');
    if (!prevProps.data && this.props.data) {
      this.resizable.updateSize({ width: '60%' });
    }
  }

  render() {
    console.log('ByRegion render props', this.props);
    const {
      className,
      path,
      currentPath,
      basePath,
      movePage,
      data = [],
      ...rest
    } = this.props;
    // console.log(data);

    function sortFire(arr) {
      arr.sort(function (a, b) {
        return b.onfire - a.onfire;
      });
    }

    const { filterIndex } = this.state;
    let filteredData;
    if (filterIndex === 1) {
      filteredData = data.filter(v => v.onfire);
    } else if (filterIndex === 2) {
      sortFire((filteredData = data.filter(v => !v.available)));
    } else {
      sortFire((filteredData = data));
    }

    return (
      <div className={merge(className, style.byRegion)} {...rest}>
        <div className={style.header}>
          <div>By Region</div>
          <div>
            <button onClick={this.log}>item 1</button>
            <button className={style.selected} onClick={this.log}>
              item 2
            </button>
            <button onClick={this.log}>item 3</button>
            <button onClick={this.log}>item 4</button>
          </div>
        </div>

        <div className={style.container}>
          <React.Fragment key="1232">
            <div className={style.list}>
              <div className={style.tabsShadow}>-</div>
              <Tabs
                className={style.tabs}
                data={filteredData}
                filterIndex={filterIndex}
                setFilter={this.setFilter}
                setFilterByEnter={this.setFilterByEnter}
              />
              <Table className={style.table} data={filteredData} />
            </div>
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
                data={filteredData}
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
