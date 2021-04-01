/* eslint-disable */

const L = require('leaflet');
global.L = L;

const RTL = require('@testing-library/react');

afterEach(() => {
  RTL.cleanup();
});
