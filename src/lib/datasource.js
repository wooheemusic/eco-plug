import React, { Component } from 'react';
import mockDB from '../database/mockDB';

class DataSource {
  constructor(database) {
    this.database = database;
  }
}

class GeoDataSource extends DataSource {
  select(lat, long) {
    return new Promise();
  }
  selectAll(minLat, maxLat, minLong, maxLong) {
    return new Promise();
  }
}

export default new GeoDataSource(mockDB);
