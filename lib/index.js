const {Socket} = require('net');
const {AUTH, EXEC_COMMAND} = require('./constants');
const {createId, createRequest, readResponse} = require('./utils');

const client = new Socket();

const state = {
  connected: false,
};

module.exports = {
  connect: (
    url = '127.0.0.1',
    port = '27020',
    password = '',
  ) => new Promise((resolve, reject) => {
    if (state.connected) {
      reject('Connection already exists')
    }

    client.connect(port, url, () => {
      const id = createId();

      const auth = createRequest(AUTH, id, password);
      client.write(auth);

      client.on('data', (data) => {
        const response = readResponse(data);

        if (response.id === id) {
          state.connected = true;
          resolve();
        }
      });

      client.on('error', err => {
        reject(err);
      })
    });
  }),

  disconnect: () => new Promise((resolve, reject) => {
    if (!state.connected) {
      reject('Not connected')
    }

    client.destroy();

    client.on('close', () => {
      state.connected = false;
      resolve();
    });

    client.on('error', err => {
      reject(err);
    })
  }),

  send: command => new Promise((resolve, reject) => {
    if (!state.connected) {
      reject('Not connected')
    }

    const id = createId();
    const cmd = createRequest(EXEC_COMMAND, id, command);
    client.write(cmd);

    client.on('data', (data) => {
      const response = readResponse(data);

      if (response.id === id) {
        resolve(response.body);
      }
    });

    client.on('error', err => {
      reject(err)
    });
  }),
};
