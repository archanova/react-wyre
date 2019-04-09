(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Wyre = function (_React$Component) {
    _inherits(Wyre, _React$Component);

    function Wyre(props) {
      _classCallCheck(this, Wyre);

      var _this = _possibleConstructorReturn(this, (Wyre.__proto__ || Object.getPrototypeOf(Wyre)).call(this, props));

      _this.scriptUrl = 'https://verify.sendwyre.com/js/widget-loader.js';
      _this.scriptId = 'wyre-widget';
      return _this;
    }

    _createClass(Wyre, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.loadScript();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var script = document.getElementById(this.scriptId);
        if (script) {
          script.remove();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if (JSON.stringify(this.props.config) !== JSON.stringify(props.config)) {
          this.verifyWyre();
        }

        if (props.open) {
          this.widget.open();
        } else {
          this.widget.close();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }, {
      key: 'verifyWyre',
      value: function verifyWyre() {
        var _this2 = this;

        this.widget = new window.Wyre.Widget(this.props.config);

        this.widget.on('ready', function () {
          if (_this2.props.onReady) {
            _this2.props.onReady();
          }
        });

        this.widget.on('close', function (event) {
          if (_this2.props.onClose) {
            _this2.props.onClose(event);
          }
        });

        this.widget.on('complete', function (event) {
          if (_this2.props.onComplete) {
            _this2.props.onComplete(event);
          }
        });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        event.preventDefault();
        this.widget.open();
      }
    }, {
      key: 'open',
      value: function open() {
        this.widget.open();
      }
    }, {
      key: 'close',
      value: function close() {
        this.widget.close();
      }
    }, {
      key: 'loadScript',
      value: function loadScript() {
        var _this3 = this;

        if (document.getElementById(this.scriptId)) return; // already exists

        var script = document.createElement('script');
        script.id = this.scriptId;
        script.onload = function () {
          return _this3.verifyWyre();
        };
        script.src = this.scriptUrl;
        document.body.appendChild(script);
      }
    }]);

    return Wyre;
  }(_react2.default.Component);

  Wyre.propTypes = {
    config: _propTypes2.default.object,
    onReady: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onComplete: _propTypes2.default.func,
    open: _propTypes2.default.bool
  };

  exports.default = Wyre;
});