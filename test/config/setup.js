require('babel-register')();

let canvas;
try {
  canvas = require('canvas');
}
catch(e) {
  canvas = require('canvas-prebuilt');
}

const JSDOM = require('jsdom').JSDOM;
const jsdom = new JSDOM('<!doctype html><html><body><div></div></body></html>', {url: 'http://localhost/'});
const document = jsdom.window.document;
const window = document.defaultView;

const canvasMethods = [
  'HTMLCanvasElement',
];

Object.keys(window).forEach(property => {
  if(typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

canvasMethods.forEach(method =>
  global[method] = window[method]
);

global['CanvasRenderingContext2D'] = canvas.Context2d;

global.navigator = {
  userAgent: 'node.js'
};
