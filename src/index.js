'use strict'

import { debugEvents, debugMethods } from 'simple-debugger'
import EventEmitter from 'events'
import Debug from 'debug'

const tickerDebug = new Debug('libs-ticker')

export default class Ticker extends EventEmitter {
  constructor(_tickSize, _initialTickSize=_tickSize, _reduceStep=_tickSize) {
    super()
    this.setMaxListeners(0)

    debugEvents(this)
    debugMethods(this, ['on', 'once', 'emit', 'addListener', 'removeListener'])

    this._status = 'newborn'
    this._config = { _tickSize, _initialTickSize, _reduceStep }
    this._bindedInstance = this._instance.bind(this)
  }

  init() {
    this._finTickSize = this._config._tickSize
    this._curTickSize = this._config._initialTickSize
    this._reduceStep  = this._config._reduceStep

    this._start = new Date().valueOf()
    this._ideal = 0
    this._timeoutId = null

    this._tickCount = 0
    this._status = 'inited'
    this._instance()

    return this
  }

  kill() {
    this._status = 'killed'
    clearTimeout(this._timeoutId)
    return this
  }

  _instance() {
    if (this._status === 'ticking') {
      this._curTickSize = this._curTickSize <= this._finTickSize
        ? this._finTickSize
        : (this._curTickSize - this._reduceStep) > this._finTickSize
          ? this._curTickSize - this._reduceStep
          : this._finTickSize
      this._tickCount++
    }

    const real = new Date().valueOf() - this._start
    const diff = real - this._ideal
    const realTickSize = this._curTickSize - diff
    this._ideal += this._curTickSize

    tickerDebug(`stat: \
      \n\t tickCount:    ${this._tickCount} \
      \n\t curTickSize:  ${this._curTickSize}ms \
      \n\t realTickSize: ${realTickSize}ms \
      \n\t finTickSize:  ${this._finTickSize}ms \
      \n\t reduceStep:   ${this._reduceStep}ms`)

    this._timeoutId = setTimeout(
      this._bindedInstance, realTickSize)

    if (this._status === 'ticking') {
      this.emit('tick')
    } else {
      tickerDebug('first run - without tick')
    }

    if (this._status === 'inited') {
      this._status = 'ticking'
    }
  }
}
