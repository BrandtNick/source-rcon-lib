# Source RCON library

A simple [Node.js](https://nodejs.org/en/) library for the [Source RCON Protocol](https://developer.valvesoftware.com/wiki/Source_RCON_Protocol)

## Installation

```shell script
yarn add source-rcon-lib
```

## Usage
This is a promise-based library.

#### Examples

Establishing a connection:
```js
const {connect} = require('source-rcon-lib');

// these values are default
connect('127.0.0.1', '27020', '')
  .then(() => console.log('connected'))
  .catch(err => console.error(err));
```

Sending a command to list all players in server:
```js
const {send} = require('source-rcon-lib');

send('listplayers')
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

Disconnecting from RCON server:
```js
const {disconnect} = require('source-rcon-lib');

disconnect()
  .then(() => console.log('disconnected'))
  .catch(err => console.error(err));
```

#### API
| Function | Arguments | Returns |
| -------- | -------- | ------- |
| connect | url _(string)_, port _(string)_, password _(string)_ | Promise |
| send | command _(string)_ | Promise |
| disconnect | _none_ | Promise |


## Upcoming

- tests
