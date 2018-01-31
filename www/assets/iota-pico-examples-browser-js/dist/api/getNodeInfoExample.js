"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNodeInfoExample = getNodeInfoExample;

var _apiClient = require("@iota-pico/api/dist/client/apiClient");

var _errorHelper = require("@iota-pico/core/dist/helpers/errorHelper");

var _networkConfig = require("../networkConfig");

var networkConfig = _interopRequireWildcard(_networkConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Example of API getNodeInfo.
 */
async function getNodeInfoExample() {
    const networkEndPoint = networkConfig.getEndPoint();
    const networkClient = networkConfig.getNetworkClient(networkEndPoint);
    const apiClient = new _apiClient.ApiClient(networkClient, "1", networkConfig.getAdditionalHeaders());

    console.info(`==> Performing getNodeInfo on ${networkEndPoint.getUri()}`);
    console.info();

    try {
        const response = await apiClient.getNodeInfo();
        console.log("<== Success");
        console.log();
        console.log(`\tappName: ${response.appName}`);
        console.log(`\tappVersion: ${response.appVersion}`);
        console.log(`\tjreAvailableProcessors: ${response.jreAvailableProcessors}`);
        console.log(`\tjreFreeMemory: ${response.jreFreeMemory}`);
        console.log(`\tjreVersion: ${response.jreVersion}`);
        console.log(`\tjreMaxMemory: ${response.jreMaxMemory}`);
        console.log(`\tjreTotalMemory: ${response.jreTotalMemory}`);
        console.log(`\tlatestMilestone: ${response.latestMilestone}`);
        console.log(`\tlatestMilestoneIndex: ${response.latestMilestoneIndex}`);
        console.log(`\tlatestSolidSubtangleMilestone: ${response.latestSolidSubtangleMilestone}`);
        console.log(`\tlatestSolidSubtangleMilestoneIndex: ${response.latestSolidSubtangleMilestoneIndex}`);
        console.log(`\tneighbors: ${response.neighbors}`);
        console.log(`\tpacketsQueueSize: ${response.packetsQueueSize}`);
        console.log(`\ttime: ${response.time}`);
        console.log(`\ttips: ${response.tips}`);
        console.log(`\ttransactionsToRequest: ${response.transactionsToRequest}`);
        console.log(`\tduration: ${response.duration}`);
    } catch (err) {
        console.log("<== Failed");
        console.log();
        console.log(_errorHelper.ErrorHelper.format(err, true));
    }
}