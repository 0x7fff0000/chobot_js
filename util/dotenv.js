module.exports.parse = (value) => {
    switch (value) {
        case 'true':
        case 'false':
            return value === 'true';
        case 'null': return null;
        case 'undefined': return undefined;
        default: return value;
    }
};
