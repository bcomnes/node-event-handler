class NodeEventHandler {
  constructor (ctx, ee) {
    if (!ctx) throw new Error('NodeEventHandler: A context is required.')
    this.ctx = ctx
    this.boundHandlers = {}
    if (ee) this.addEventListeners(ee)
  };

  get events () {
    return (
      this._events ||
      Object.defineProperty(this, '_events', {
        value: Object.getOwnPropertyNames(this.ctx.constructor.prototype)
          .filter(type => /^on/.test(type))
          .map(type => type.slice(2))
      })._events
    )
  };

  handleEvent (eventType) {
    if (!this.boundHandlers[eventType]) this.boundHandlers[eventType] = (this.ctx['on' + eventType]).bind(this)
    return this.boundHandlers[eventType]
  }

  addEventListeners (ee) { for (let events = this.events, i = events.length; i--; ee.on(events[i], this.handleEvent(events[i]))); };
  removeEventListeners (ee) { for (let events = this.events, i = events.length; i--; ee.off(events[i], this.handleEvent(events[i]))); };
}

module.exports = NodeEventHandler
