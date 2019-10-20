// DEBUG=debug*,libs* babel-node example/prj1

'use strict'

import Ticker from '../src'

let count = 0
const ticker = new Ticker(100)
  .init()
  .on('tick', () => {
    count++
    console.info('prj1:tick', count)
    if (count === 5) ticker.kill()
  })

