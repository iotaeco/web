"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkConsistencyExample = checkConsistencyExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API checkConsistency.
 */
async function checkConsistencyExample(tails) {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing checkConsistency on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.checkConsistency({ tails });
        console.log("<== Success");
        console.log();
        console.log(`\tState: ${response.state}`);
        console.log(`\tInfo: ${response.info}`);
    } catch (err) {
        console.error("<== Failed");
        console.error();
        console.error(_errorHelper.ErrorHelper.format(err, true));
    }
}