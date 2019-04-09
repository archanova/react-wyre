import React from 'react'
import Wyre from '../index'

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
            secretKey: genSecretKey()
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

function genSecretKey () {
  return Array.prototype.map.call(
    window.crypto.getRandomValues(new Uint8Array(25)),
    x => ('00' + x.toString(16)).slice(-2)).join('')
}

export default App
