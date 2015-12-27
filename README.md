# simple-ticker

```
npm i -S simple-ticker
```

#### Simple example

```js
import Ticker from 'simple-ticker'
var ticker = new Ticker(100)

console.time('tick')
ticker.init().on('tick', () => {
    console.timeEnd('tick')
    console.time('tick')
})

/*
    tick: 100.467ms
    tick: 99.607ms
    tick: 100.485ms
    ...
*/
```

#### Optional arguments

```js
import Ticker from 'simple-ticker'
var ticker = new Ticker(
    100, // target tick interval
    200, // init tick interval (default = targer tick interval)
    40)  // reduce step (default = targe tick interval)

console.time('tick')
ticker.init().on('tick', () => {
    console.timeEnd('tick')
    console.time('tick')
})

/*
    tick: 203.391ms
    tick: 158.210ms
    tick: 119.755ms
    tick: 100.517ms
    tick: 102.342ms
    tick: 96.856ms
    ...
*/
```

#### `#init` and `#kill`

```js
import Ticker from 'simple-ticker'
var ticker = new Ticker(100)

console.time('tick')
ticker.init().on('tick', () => {
    console.timeEnd('tick')
    console.time('tick')

    ticker.kill().init()
})

/*
    tick: 101.631ms
    tick: 103.629ms
    tick: 102.642ms
    tick: 103.413ms
*/
```
