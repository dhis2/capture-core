// @flow
import log from 'loglevel';

let d2Instance: D2;

export function setD2(d2: D2) {
    d2Instance = d2;
}

const getD2 = () => {
    if (!d2Instance) {
        log.error('please set d2 before using it');
    }
    return d2Instance;
};

export default getD2;
