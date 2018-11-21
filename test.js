const test = require('tape')
const NodeEventHandler = require('./')
const existy = require('existy')
const EventEmitter = require('events')

test('can insatiate and has required API methods', t => {
  class HandlerClass {
    oncustomevent (ev) {
      console.log(ev)
    }
  }
  const ctx = new HandlerClass()
  const handler = new NodeEventHandler(ctx)
  t.equal(typeof handler.addEventListeners, 'function', 'addEventListeners is defined')
  t.equal(typeof handler.removeEventListeners, 'function', 'removeEventListeners is defined')
  t.equal(typeof handler.handleEvent, 'function', 'handleEvent is defined')
  t.true(Array.isArray(handler.events), 'events getter returns an array')
  t.equal(handler.events.length, 1, 'events getter has one event')
  t.throws(() => {
    const handler = new NodeEventHandler()
    console.log(handler.events)
  }, /context is required/, 'missing context throws')
  t.end()
})

test('works even without handlers', t => {
  class HandlerClass {}
  const ctx = new HandlerClass()
  const handler = new NodeEventHandler(ctx)
  t.true(Array.isArray(handler.events), 'events getter returns an array')
  t.equal(handler.events.length, 0, 'events getter has 0 events')
  t.end()
})

test('handles events when instantiated with a node', t => {
  const ee = new EventEmitter()

  class HandlerClass {
    oncustomevent (ev) {
      t.equal(ev.detail.unicorn, 'rainbows', 'handled event')
      t.end()
    }
  }
  const ctx = new HandlerClass()
  const handler = new NodeEventHandler(ctx, ee)
  t.true(existy(handler), 'handler created')
  ee.emit('customevent', { detail: { unicorn: 'rainbows' } })
})

test('handles events when attached after the fact', t => {
  const ee = new EventEmitter()

  class HandlerClass {
    oncustomevent (ev) {
      t.equal(ev.detail.unicorn, 'rainbows', 'handled event')
      t.end()
    }
  }
  const ctx = new HandlerClass()
  const handler = new NodeEventHandler(ctx)
  handler.addEventListeners(ee)

  ee.emit('customevent', { detail: { unicorn: 'rainbows' } })
})

test('doesnt handle events when removed', t => {
  const ee = new EventEmitter()

  class HandlerClass {
    oncustomevent (ev) {
      t.fail('this shouldnt run')
    }
  }
  const ctx = new HandlerClass()
  const handler = new NodeEventHandler(ctx, ee)
  t.true(existy(handler), 'handler created')

  handler.removeEventListeners(ee)
  ee.emit('customevent', { detail: { unicorn: 'rainbows' } })
  setTimeout(() => {
    t.ok(true, 'event handler doesnt catch anything')
    t.end(null)
  }, 5)
})
