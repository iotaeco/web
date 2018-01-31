"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNeighborsExample = getNeighborsExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getNeighbors.
 */
async function getNeighborsExample() {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getNeighbors on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getNeighbors();
        console.log("<== Success");
        console.log();
        if (response.neighbors && response.neighbors.length > 0) {
            response.neighbors.forEach(neighbour => {
                console.log(`\taddress: ${neighbour.address}`);
                console.log(`\tnumberOfAllTransactions: ${neighbour.numberOfAllTransactions}`);
                console.log(`\tnumberOfInvalidTransactions: ${neighbour.numberOfInvalidTransactions}`);
                console.log(`\tnumberOfNewTransactions: ${neighbour.numberOfNewTransactions}`);
                console.log();
            });
        } else {
            console.log(`\tNo Neighbours Found`);
        }
    } catch (err) {
        console.log("<== Failed");
        console.log();
        console.log(_errorHelper.ErrorHelper.format(err, true));
    }
}