# node-event-handler
[![npm version][npmimg]][npm] [![build status][travisimg]][travis] [![coverage][coverallsimg]][coveralls]
[![downloads][downloadsimg]][downloads] [![js-standard-style][standardimg]][standard]

A generic Node.js style event handler.

## Installation
```console
$ npm install node-event-handler
```

## Usage

```js
const NodeEventHandler = require('node-event-handler')
const WebSocket = require('ws')

class MyWSController extends SomeOtherClass {
  constructor () {
    this.ws = new WebSocket('ws://localhost:8080')
    this.handler = new NodeEventHandler(this, this.ws)
  }

  // These methods handle the websocket events
  onmessage (data) {}
  onopen () {}
  onerror (error) {}
  onclose () {}
}
```

## API

### `handler = new NodeEventHandler(ctx, [ee])`

Create a new instance of `NodeEventHandler` passing in a context `ctx` (often `this` when created within a class) and optionally a [Node.js style event emitter][ee] `ee` to attach listeners to on instantiation.

The `ctx` should be an object who's prototype contains event handler methods.  Event handler methods must take the form of `on${eventname}` where `eventname` is the name of the event you want to listen on and handle (the name you would pass to `ee.on(eventname)`).  In practice, you can pass a class instance as a `ctx`, or `this` when the instance owns the `NodeEventHanlder` instance.

### `handler.addEventListeners(ee)`

Attach all `event` handler methods on `ctx` to the [Node.js style event emitter][ee] `ee`.

### `handler.removeEventListeners(ee)`

Remove all `event` handler event names on `ctx` from the [Node.js style event emitter][ee] `ee`.

## See also

This module is an API match to [dom-event-handler](http://github.com/bcomnes/dom-event-handler) which has a clever API, but requires the support of the [`handleEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent) on the [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent) interface.  Most Node.js modules have poor support for these interfaces because they are difficult to replicate outside of a browser.

When using [dom-event-handler](http://github.com/bcomnes/dom-event-handler) in a universal context, this can be used as a stand-in on the Node.js side of things.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[stabilityimg]: https://img.shields.io/badge/stability-experimental-orange.svg
[stability]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npmimg]: https://img.shields.io/npm/v/node-event-handler.svg
[npm]: https://npmjs.org/package/node-event-handler
[travisimg]: https://img.shields.io/travis/bcomnes/node-event-handler/master.svg
[travis]: https://travis-ci.org/bcomnes/node-event-handler
[downloadsimg]: http://img.shields.io/npm/dm/node-event-handler.svg
[downloads]: https://npmjs.org/package/node-event-handler
[standardimg]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard]: https://github.com/feross/standard
[coverallsimg]: https://img.shields.io/coveralls/bcomnes/node-event-handler/master.svg
[coveralls]: https://coveralls.io/github/bcomnes/node-event-handler


[ee]: https://nodejs.org/api/events.html
