/* eslint-disable */

// Expect
const chai = require('chai');
global.expect = chai.expect;


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
global.window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};
global.window.cancelAnimationFrame = () => {
  throw new Error('cancelAnimationFrame is not supported in Node');
};

const RTL = require('@testing-library/react');
RTL.configure({
  testIdAttribute: 'data-elm-id'
});
