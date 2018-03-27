module.exports = {
    "env": {
        "mocha": true,
    },
    "rules" : {
        "import/no-extraneous-dependencies": "off" // There are unit test dependencies in this directory (like chai).
    }
};