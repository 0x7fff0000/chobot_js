module.exports.isBool = (value) => {
    switch (typeof value) {
        case 'boolean': return value;
        case 'string': return value === 'true';
    }
};
