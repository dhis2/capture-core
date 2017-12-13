// @flow
const unknownTypeCode = 'UNKNOWN';

const elementTypeCodes = [
    'TEXT',
    'LONG_TEXT',
    'NUMBER',
    'INTEGER',
    'POSITIVE_INTEGER',
    'NEGATIVE_INTEGER',
    'POSITIVE_OR_ZERO_INTEGER',
    'YEAR',
    'DATE',
    'DATETIME',
    'TIME',
    'TRUE_ONLY',
    'TRUE_FALSE',
    'ACCOUNTNUMBER',
    'PHONE_NUMBER',
    'EMAIL',
    'ZIPCODE',
    'PASSWORD',
    'DURATION_MINUTES',
    'FILE_RESOURCE',
    unknownTypeCode,
];

const elementTypeKeys = elementTypeCodes.reduce((accKeys, code) => {
    accKeys[code] = code;
    return accKeys;
}, {});

export default elementTypeKeys;

