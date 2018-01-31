"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTrytesExample = getTrytesExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getTrytes.
 */
async function getTrytesExample(hashes) {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getTrytes on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getTrytes({ hashes });
        console.log("<== Success");
        console.log();
        if (response.trytes && response.trytes.length > 0) {
            console.log(`\tTotal Trytes: ${response.trytes.length}`);
            console.log();
            response.trytes.slice(0, 50).forEach(tryte => {
                console.log(`\ttryte: ${tryte}`);
            });
            if (response.trytes.length > 50) {
                console.log(`\t...`);
                console.log(`\tlist truncated`);
            }
        } else {
            console.log(`\tNo Trytes Found`);
        }
    } catch (err) {
        console.error("<== Failed");
        console.error();
        console.error(_errorHelper.ErrorHelper.format(err, true));
    }
}