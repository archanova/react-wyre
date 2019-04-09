import React from 'react'
import PropTypes from 'prop-types'

class Wyre extends React.Component {
  constructor (props) {
    super(props)

    this.scriptUrl = 'https://verify.sendwyre.com/js/widget-loader.js'
    this.scriptId = 'wyre-widget'
  }

  componentWillMount () {
    this.loadScript()
  }

  componentWillUnmount () {
    const script = document.getElementById(this.scriptId)
    if (script) {
      script.remove()
    }
  }

  componentWillReceiveProps (props) {
    if (JSON.stringify(this.props.config) !== JSON.stringify(props.config)) {
      this.verifyWyre()
    }

    if (props.open) {
      this.widget.open()
    } else {
      this.widget.close()
    }
  }

  render () {
    return this.props.children
  }

  verifyWyre () {
    this.widget = new window.Wyre.Widget(this.props.config)

    this.widget.on('ready', () => {
      if (this.props.onReady) {
        this.props.onReady()
      }
    })

    this.widget.on('close', event => {
      if (this.props.onClose) {
        this.props.onClose(event)
      }
    })

    this.widget.on('complete', event => {
      if (this.props.onComplete) {
        this.props.onComplete(event)
      }
    })
  }

  handleClick (event) {
    event.preventDefault()
    this.widget.open()
  }

  open () {
    this.widget.open()
  }

  close () {
    this.widget.close()
  }

  loadScript () {
    if (document.getElementById(this.scriptId)) return // already exists

    const script = document.createElement('script')
    script.id = this.scriptId
    script.onload = () => this.verifyWyre()
    script.src = this.scriptUrl
    document.body.appendChild(script)
  }
}

Wyre.propTypes = {
  config: PropTypes.object,
  onReady: PropTypes.func,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
}

export default Wyre
