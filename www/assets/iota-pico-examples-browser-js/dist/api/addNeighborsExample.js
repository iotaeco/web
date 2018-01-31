"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addNeighborsExample = addNeighborsExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API addNeighbors.
 */
async function addNeighborsExample(uris) {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing addNeighbors on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.addNeighbors({ uris });
        console.log("<== Success");
        console.log();
        console.log(`\tNeighbours Added: ${response.addedNeighbors}`);
        console.log();
    } catch (err) {
        console.error("<== Failed");
        console.error();
        console.error(_errorHelper.ErrorHelper.format(err, true));
    }
}