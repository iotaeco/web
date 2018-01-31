"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBalancesExample = getBalancesExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getBalances.
 */
async function getBalancesExample(addresses, threshold) {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getBalances on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getBalances({ addresses, threshold });
        console.log("<== Success");
        console.log();
        if (response.balances && response.balances.length > 0) {
            console.log(`\tTotal Balances: ${response.balances.length}`);
            console.log();
            response.balances.slice(0, 50).forEach(balance => {
                console.log(`\tbalance: ${balance}`);
            });
            if (response.balances.length > 50) {
                console.log(`\t...`);
                console.log(`\tlist truncated`);
            }
        } else {
            console.log(`\tNo Balances Found`);
        }
    } catch (err) {
        console.error("<== Failed");
        console.error();
        console.error(_errorHelper.ErrorHelper.format(err, true));
    }
}