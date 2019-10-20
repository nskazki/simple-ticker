// DEBUG=debug*,libs* babel-node example/prj2

'use strict'

import Ticker from '../src'

let count = 0
const ticker = new Ticker(100, 400, 130)
  .init()
  .on('tick', () => {
    count++
    console.info('prj2:tick', count)
    if (count === 5) ticker.kill()
  })

