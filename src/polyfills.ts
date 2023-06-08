(window as any).global = window;
(window as any).global.Buffer = require('buffer').Buffer;
(window as any).global.os = require('os-browserify/browser');
(window as any).process = {};
