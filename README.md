<h3 align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/168240/55785987-3d1e3800-5a68-11e9-9c5f-5c06a0c40747.png" alt="logo" width="500" />
  <br />
  <br />
  <br />
</h3>

# react-wyre

> [React](https://facebook.github.io/react/) component for the [wyre](https://www.sendwyre.com/) widget.

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/archanova/react-wyre/master/LICENSE)
[![Build Status](https://travis-ci.org/archanova/react-wyre.svg?branch=master)](https://travis-ci.org/archanova/react-wyre)
[![dependencies Status](https://david-dm.org/archanova/react-wyre/status.svg)](https://david-dm.org/archanova/react-wyre)
[![NPM version](https://badge.fury.io/js/react-wyre.svg)](http://badge.fury.io/js/react-wyre)

## Install

```bash
npm install react-wyre
```

## Getting started

```javascript
import React from 'react'
import Wyre from 'react-wyre'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <Wyre
        config={{
          env: 'test',
          accountId: 'AC-BAAA2222',
          auth: {
            type: 'secretKey',
            secretKey: '6a6f7f9187f766f66938638f1afd79b20fb5989e2837e6f989'
          },
          operation: {
            type: 'debitcard',
            destCurrency: 'ETH',
            destAmount: 0.01,
            dest: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
          },
          style: {
            primaryColor: '#0055ff'
          }
        }}
        onReady={() => console.log('ready')}
        onClose={event => console.log('close', event)}
        onComplete={event => console.log('complete', event)}
        open={this.state.open}>

        <button onClick={() => this.setState({ open: true })}>
          Buy ETH
        </button>

      </Wyre>
    )
  }
}


export default App
```

Please read the [Wyre documentation](https://docs.sendwyre.com/docs/widget-api) for the configuration options.

## License

[MIT](License)
