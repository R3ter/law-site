'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/style.scss');

require('./style/ask.scss');

require('./style/main.scss');

require('./style/side.scss');

require('./style/questionpage.scss');

require('./style/pageSelector.scss');

require('./style/confirm.scss');

require('./style/addnote.scss');

require('./style/sign.scss');

require('./style/notes.scss');

require('./style/profile.scss');

require('./style/law.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _top = require('./parts/top');

var _top2 = _interopRequireDefault(_top);

var _reactRouterDom = require('react-router-dom');

var _question = require('./parts/question');

var _question2 = _interopRequireDefault(_question);

var _questionpage = require('./parts/questionpage');

var _questionpage2 = _interopRequireDefault(_questionpage);

var _side = require('./parts/side');

var _side2 = _interopRequireDefault(_side);

var _notes = require('./parts/notes');

var _notes2 = _interopRequireDefault(_notes);

var _message = require('./parts/message');

var _message2 = _interopRequireDefault(_message);

var _law = require('./parts/law');

var _law2 = _interopRequireDefault(_law);

var _sendmessage = require('./parts/sendmessage');

var _sendmessage2 = _interopRequireDefault(_sendmessage);

var _note = require('./parts/note');

var _note2 = _interopRequireDefault(_note);

var _noteInfo = require('./parts/note-info');

var _noteInfo2 = _interopRequireDefault(_noteInfo);

var _lawpage = require('./parts/lawpage');

var _lawpage2 = _interopRequireDefault(_lawpage);

var _ask = require('./parts/ask');

var _ask2 = _interopRequireDefault(_ask);

var _addnote = require('./parts/addnote');

var _addnote2 = _interopRequireDefault(_addnote);

var _profile = require('./parts/profile');

var _profile2 = _interopRequireDefault(_profile);

var _sign = require('./parts/sign');

var _sign2 = _interopRequireDefault(_sign);

var _reports = require('./parts/reports');

var _reports2 = _interopRequireDefault(_reports);

var _loading = require('./parts/loading');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = (0, _socket2.default)();
socket.connect('localhost:3000');
var ask = function ask() {
    return _react2.default.createElement(_ask2.default, null);
};
var log = function log() {
    return _react2.default.createElement(_sign2.default, null);
};

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main(e) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, e));

        if (!localStorage.getItem('key')) {
            localStorage.setItem('key', (0, _uniqid2.default)());
        }
        return _this;
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _reactRouterDom.BrowserRouter,
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_top2.default, null),
                    _react2.default.createElement(_side2.default, null),
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { component: function component(e) {
                                // document.body.scrollTop =
                                // document.documentElement.scrollTop = 0;
                                return _react2.default.createElement(_questionpage2.default, { id: e.match.params.id });
                            },
                            path: '/question:id', exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: ask,
                            path: '/ask', exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: _reports2.default,
                            path: '/reportrater*^$', exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: log,
                            path: '/sign', exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: function component() {
                                return _react2.default.createElement(_addnote2.default, null);
                            },
                            path: '/addnote', exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/profile:id', component: function component(e) {
                                // document.body.scrollTop =
                                // document.documentElement.scrollTop = 0;
                                return _react2.default.createElement(_profile2.default, { name: e.match.params.id });
                            }, exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/Q&a:page', component: function component(e) {
                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                return _react2.default.createElement(_question2.default, { page: e.match.params.page });
                            }, exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/notes&:page', component: function component(e) {
                                return _react2.default.createElement(_notes2.default, { page: e.match.params.page });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/note-info:id', component: function component(e) {
                                return _react2.default.createElement(_noteInfo2.default, { id: e.match.params.id });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/Laws&:id', component: function component(e) {
                                return _react2.default.createElement(_law2.default, { id: e.match.params.id });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/messages', component: function component() {
                                return _react2.default.createElement(_message2.default, null);
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/sendmessage$:id', component: function component(e) {
                                return _react2.default.createElement(_sendmessage2.default, { id: e.match.params.id });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/note&:id&:num', component: function component(e) {
                                document.body.scrollTop = document.documentElement.scrollTop = 474;
                                return _react2.default.createElement(_note2.default, { name: e.match.params.id,
                                    num: e.match.params.num
                                });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/Law:id&:page', component: function component(e) {
                                document.body.scrollTop = document.documentElement.scrollTop = 400;
                                return _react2.default.createElement(_lawpage2.default, { name: e.match.params.id,
                                    page: e.match.params.page });
                            }, exact: true }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: function component() {
                                return _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h1',
                                        { style: {
                                                textAlign: 'center',
                                                color: 'red'

                                            } },
                                        '404 Error page was not found'
                                    ),
                                    _react2.default.createElement(
                                        'h2',
                                        { style: {
                                                textDecoration: "none",
                                                textAlign: 'center'
                                            } },
                                        ' ',
                                        _react2.default.createElement(
                                            _reactRouterDom.Link,
                                            {
                                                style: { color: 'rgb(49, 226, 250)',
                                                    textDecoration: 'none' }, to: '/' },
                                            'back to main page'
                                        )
                                    )
                                );
                            } })
                    )
                )
            );
        }
    }]);

    return Main;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Main, null), document.getElementById("id"));
(0, _loading.hide)();
