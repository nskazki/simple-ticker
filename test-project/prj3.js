'use strict'

import Ticker from '../src'

let initCount = 0
let tickCount = 0

console.info('prj3:init')
let ticker = new Ticker(100, 200)
  .init()
  .on('tick', () => {
    tickCount++
    console.info('prj3:tick', tickCount)

    if (tickCount === 3) {
      console.info('prj3:kill')
      ticker.kill()

      if (initCount < 3) {
        initCount++
        console.info('prj3:reinit', initCount)
        tickCount = 0
        ticker.init()
      }
    }
  })

