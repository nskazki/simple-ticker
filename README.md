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
    tick: 200.391ms
    tick: 160.210ms
    tick: 120.755ms
    tick: 100.517ms
    tick: 100.342ms
    tick: 100.856ms
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
    tick: 100.629ms
    tick: 101.642ms
    tick: 100.413ms
*/
```
