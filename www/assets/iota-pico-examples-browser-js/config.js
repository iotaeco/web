System.config({
    "packages": {
        "": { defaultExtension: "js" }
    },
    "map": {
        "plugin-json": "../../node_modules/systemjs-plugin-json/json.js",
        "@iota-pico": "../../node_modules/@iota-pico"
    },
    "meta": {
        "*": { format: "cjs" },
        "*.json": { "loader": "plugin-json" }
    }
});

var consoleDiv = document.getElementById("console");

var oldConsoleLog = console.log;
console.log = function(message) {
    if (message) {
        consoleDiv.classList.remove("alert-danger", "alert-warning");
        consoleDiv.classList.add("alert", "alert-success");
        consoleDiv.innerHTML += message.replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\r/g, "").replace(/\n/g, "<br/>");
        oldConsoleLog(message);
    }
    consoleDiv.innerHTML += "<br/>";
};

var oldConsoleError = console.error;
console.error = function(message) {
    if (message) {
        consoleDiv.classList.remove("alert-success", "alert-warning");
        consoleDiv.classList.add("alert", "alert-danger");
        consoleDiv.innerHTML += message.replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\r/g, "").replace(/\n/g, "<br/>");
        oldConsoleError(message);
    }
    consoleDiv.innerHTML += "<br/>";
};

var oldConsoleInfo = console.info;
console.info = function(message) {
    if (message) {
        consoleDiv.classList.remove("alert-success", "alert-danger");
        consoleDiv.classList.add("alert", "alert-warning");
        consoleDiv.innerHTML += message.replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\r/g, "").replace(/\n/g, "<br/>");
        oldConsoleInfo(message);
    }
    consoleDiv.innerHTML += "<br/>";
};

function consoleClear() {
    consoleDiv.innerHTML = "";
}

function elementToArray(domElement, defaultValue) {
    var val = document.getElementById(domElement).value;

    return val && val.length > 0 ? val.split(",").map(v => v.trim()) : defaultValue;
}

function elementToNumber(domElement, defaultValue) {
    var val = document.getElementById(domElement).value;
    var numVal = parseInt(val);

    return isNaN(numVal) ? defaultValue : numVal;
}
