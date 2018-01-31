"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInclusionStatesExample = getInclusionStatesExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getInclusionStates.
 */
async function getInclusionStatesExample(transactions, tips) {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getInclusionStates on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getInclusionStates({ transactions, tips });
        console.log("<== Success");
        console.log();
        if (response.states && response.states.length > 0) {
            console.log(`\tTotal States: ${response.states.length}`);
            console.log();
            response.states.slice(0, 50).forEach(state => {
                console.log(`\tstate: ${state}`);
            });
            if (response.states.length > 50) {
                console.log(`\t...`);
                console.log(`\tlist truncated`);
            }
        } else {
            console.log(`\tNo States Found`);
        }
    } catch (err) {
        console.error("<== Failed");
        console.error();
        console.error(_errorHelper.ErrorHelper.format(err, true));
    }
}