module.exports.hasArg = (value) => {
    return process.argv.find((arg) => arg === value) != undefined;
}
