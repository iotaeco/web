"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEndPoint = getEndPoint;
exports.getAdditionalHeaders = getAdditionalHeaders;
exports.getNetworkClient = getNetworkClient;

var _INetworkClient = require("@iota-pico/core/dist/interfaces/INetworkClient");

var _INetworkEndPoint = require("@iota-pico/core/dist/interfaces/INetworkEndPoint");

var _networkEndPoint = require("@iota-pico/core/dist/network/networkEndPoint");

var _browserNetworkClient = require("@iota-pico/pal-browser/dist/network/browserNetworkClient");

var _networkConfig = require("../config/networkConfig.json");

var _networkConfig2 = _interopRequireDefault(_networkConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Example network configuration.
 */
function getEndPoint() {
    return new _networkEndPoint.NetworkEndPoint(_networkConfig2.default.protocol, _networkConfig2.default.host, _networkConfig2.default.path, _networkConfig2.default.port);
}

function getAdditionalHeaders() {
    return _networkConfig2.default.additionalHeaders;
}

function getNetworkClient(networkEndPoint) {
    return new _browserNetworkClient.BrowserNetworkClient(networkEndPoint);
}