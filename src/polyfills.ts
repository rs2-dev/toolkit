(window as any).global = window;
(window as any).global.Buffer = require('buffer').Buffer;
(window as any).process = require('process/browser.js');
