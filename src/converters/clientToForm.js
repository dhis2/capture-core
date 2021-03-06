// @flow
import moment from '../utils/moment/momentResolver';
import elementTypes from '../metaData/DataElement/elementTypes';

import stringifyNumber from './common/stringifyNumber';

type DateTimeFormValue = {
    date: string,
    time: string
};

function convertDateForEdit(rawValue: string): string {
    const date = moment(rawValue);
    const dateString = date.format('L');
    return dateString;
}

function convertDateTimeForEdit(rawValue: string): DateTimeFormValue {
    const dateTime = moment(rawValue);
    const dateString = dateTime.format('L');
    const timeString = dateTime.format('LT');
    return {
        date: dateString,
        time: timeString,
    };
}

export const valueConvertersForType = {
    [elementTypes.NUMBER]: stringifyNumber,
    [elementTypes.INTEGER]: stringifyNumber,
    [elementTypes.INTEGER_POSITIVE]: stringifyNumber,
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: stringifyNumber,
    [elementTypes.INTEGER_NEGATIVE]: stringifyNumber,
    [elementTypes.DATE]: convertDateForEdit,
    [elementTypes.DATETIME]: convertDateTimeForEdit,
    [elementTypes.TRUE_ONLY]: () => 'true',
    [elementTypes.BOOLEAN]: (rawValue: boolean) => (rawValue ? 'true' : 'false'),
};
