"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTipsExample = getTipsExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getTips.
 */
async function getTipsExample() {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getTips on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getTips();
        console.log("<== Success");
        console.log();
        if (response.hashes && response.hashes.length > 0) {
            console.log(`\tTotal Tips: ${response.hashes.length}`);
            console.log();
            response.hashes.slice(0, 50).forEach(hash => {
                console.log(`\thash: ${hash}`);
            });
            if (response.hashes.length > 50) {
                console.log(`\t...`);
                console.log(`\tlist truncated`);
            }
        } else {
            console.log(`\tNo Tips Found`);
        }
    } catch (err) {
        console.log("<== Failed");
        console.log();
        console.log(_errorHelper.ErrorHelper.format(err, true));
    }
}