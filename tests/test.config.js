/* eslint-disable */

// Expect
const extendExpectMatchers = require('@testing-library/jest-dom/dist/matchers');
const {expect} = require('expect');

// Extend our expect with @testing-library/jest-dom
expect.extend(extendExpectMatchers);
global.expect = expect;

// JSDom
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM('', {});

global.window = dom.window;
// global.HTMLElement = window.HTMLElement;
// global.Element = window.Element;
// global.Blob = window.Blob;
global.document = dom.window.document;
global.navigator = {
  userAgent: 'node.js',
  platform: ['Win']
};
location = {}; // avoids leaflet-routing-machine fail
global.DOMParser = window.DOMParser

global.window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};
global.window.cancelAnimationFrame = () => {
  throw new Error('cancelAnimationFrame is not supported in Node');
};
