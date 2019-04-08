export function isMethod(method) {
    return (method === 'create'
        || method === 'read'
        || method === 'update'
        || method === 'remove');
}
export function isState(state) {
    return (state === 'new'
        || state === 'received'
        || state === 'processed'
        || state === 'sent');
}
export function isType(type) {
    return (type === 'connect'
        || type === 'data');
}
export function isData(data) {
    return Object.keys(data).every(key => typeof key === 'string');
}
export function isDataArray(dataArr) {
    return dataArr.every(data => isData(data));
}
export function isErr(err) {
    return Object.keys(err).every((key) => typeof err[key] === 'string' && (key === 'reason' || key === 'resolution'));
}
export function isOutput(output) {
    return Object.keys(output).every((key) => {
        switch (key) {
            case 'cid':
                return typeof output[key] === 'string';
            case 'timestamp':
                return typeof output[key] === 'string';
            case 'data':
                return isData(output[key]) || isDataArray(output[key]) || isErr(output[key]);
            case 'success':
                return typeof output[key] === 'boolean';
            default:
                return false;
        }
    });
}
