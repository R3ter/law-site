"use strict";

require("./style/style.scss");

require("./style/ask.scss");

require("./style/main.scss");

require("./style/side.scss");

require("./style/foot.scss");

require("./style/questionpage.scss");

require("./style/iframe.scss");

require("./style/pageSelector.scss");

require("./style/confirm.scss");

require("./style/addnote.scss");

require("./style/sign.scss");

require("./style/notes.scss");

require("./style/profile.scss");

require("./style/law.scss");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _top = _interopRequireDefault(require("./parts/top"));

var _reactRouterDom = require("react-router-dom");

var _question = _interopRequireDefault(require("./parts/question"));

var _questionpage2 = _interopRequireDefault(require("./parts/questionpage"));

var _side2 = _interopRequireDefault(require("./parts/side"));

var _notes2 = _interopRequireDefault(require("./parts/notes"));

var _message = _interopRequireDefault(require("./parts/message"));

var _chat = _interopRequireDefault(require("./parts/chat"));

var _law2 = _interopRequireDefault(require("./parts/law"));

var _sendmessage = _interopRequireDefault(require("./parts/sendmessage"));

var _note = _interopRequireDefault(require("./parts/note"));

var _noteInfo = _interopRequireDefault(require("./parts/note-info"));

var _lawpage = _interopRequireDefault(require("./parts/lawpage"));

var _ask2 = _interopRequireDefault(require("./parts/ask"));

var _addnote2 = _interopRequireDefault(require("./parts/addnote"));

var _profile2 = _interopRequireDefault(require("./parts/profile"));

var _reports = _interopRequireDefault(require("./parts/reports"));

var _loading = require("./parts/loading");

var _socket = _interopRequireDefault(require("socket.io-client"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _sign2 = _interopRequireDefault(require("./parts/sign"));

var _foot2 = _interopRequireDefault(require("./parts/foot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// const socket=io()
// socket.connect('localhost:3000')
var ask = function ask() {
  document.title = 'ask some shit';
  return _react["default"].createElement(_ask2["default"], null);
};

var Main =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(e) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, e));

    if (!localStorage.getItem('key')) {
      localStorage.setItem('key', (0, _uniqid["default"])());
    }

    _this.update = _this.update.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Main, [{
    key: "update",
    value: function update() {
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_reactRouterDom.BrowserRouter, null, _react["default"].createElement("div", null, _react["default"].createElement(_top["default"], null), _react["default"].createElement(_side2["default"], null), _react["default"].createElement(_reactRouterDom.Switch, null, _react["default"].createElement(_reactRouterDom.Route, {
        component: function component(e) {
          document.title = 'Question';
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_questionpage2["default"], {
            id: e.match.params.id
          });
        },
        path: "/question:id",
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        component: ask,
        path: "/ask",
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        component: _reports["default"],
        path: "/reportrater*^$",
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        component: function component() {
          return _react["default"].createElement(_sign2["default"], {
            update: _this2.update
          });
        },
        path: "/sign",
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        component: function component() {
          return _react["default"].createElement(_addnote2["default"], null);
        },
        path: "/addnote",
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/profile:id",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_profile2["default"], {
            name: e.match.params.id
          });
        },
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_question["default"], {
            page: 1,
            type: e.match.params.type
          });
        },
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/Q&a:page$:type",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_question["default"], {
            page: e.match.params.page,
            type: e.match.params.type
          });
        },
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/Q&a:page",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_question["default"], {
            page: e.match.params.page
          });
        },
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/notes&:page",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          return _react["default"].createElement(_notes2["default"], {
            page: e.match.params.page
          });
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/note-info:id",
        component: function component(e) {
          return _react["default"].createElement(_noteInfo["default"], {
            id: e.match.params.id
          });
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/Laws&:id",
        component: function component(e) {
          return _react["default"].createElement(_law2["default"], {
            id: e.match.params.id
          });
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/messages",
        component: function component() {
          return _react["default"].createElement(_chat["default"], null);
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/sendmessage$:id",
        component: function component(e) {
          return _react["default"].createElement(_sendmessage["default"], {
            id: e.match.params.id
          });
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/note&:id&:num",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 474;
          return _react["default"].createElement(_note["default"], {
            name: e.match.params.id,
            num: e.match.params.num
          });
        }
      }), _react["default"].createElement(_reactRouterDom.Route, {
        path: "/Law:id&:page",
        component: function component(e) {
          document.body.scrollTop = document.documentElement.scrollTop = 400;
          return _react["default"].createElement(_lawpage["default"], {
            name: e.match.params.id,
            page: e.match.params.page
          });
        },
        exact: true
      }), _react["default"].createElement(_reactRouterDom.Route, {
        component: function component() {
          return _react["default"].createElement("div", null, _react["default"].createElement("h1", {
            style: {
              textAlign: 'center',
              color: 'red'
            }
          }, "404 Error page was not found"), _react["default"].createElement("h2", {
            style: {
              textDecoration: "none",
              textAlign: 'center'
            }
          }, " ", _react["default"].createElement(_reactRouterDom.Link, {
            style: {
              color: 'rgb(49, 226, 250)',
              textDecoration: 'none'
            },
            to: "/"
          }, "back to main page")));
        }
      })), _react["default"].createElement(_foot2["default"], null)));
    }
  }]);

  return Main;
}(_react["default"].Component);

_reactDom["default"].render(_react["default"].createElement(Main, null), document.getElementById("id"));

(0, _loading.hide)();
