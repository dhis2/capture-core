// @flow
import moment from '../utils/moment/momentResolver';

import elementTypes from '../metaData/DataElement/elementTypes';
import parseNumber from '../utils/parsers/number.parser';

export const valueConvertersForType = {
    [elementTypes.NUMBER]: parseNumber,
    [elementTypes.INTEGER]: parseNumber,
    [elementTypes.INTEGER_POSITIVE]: parseNumber,
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: parseNumber,
    [elementTypes.INTEGER_NEGATIVE]: parseNumber,
    [elementTypes.DATE]: (d2Value: string) => moment(d2Value, 'L').toISOString(),
    [elementTypes.DATETIME]: (d2Value: string) => moment(d2Value, 'L').toISOString(),
    [elementTypes.TRUE_ONLY]: (d2Value: string) => ((d2Value === 'true') || null),
    [elementTypes.BOOLEAN]: (d2Value: string) => (d2Value === 'true'),
};
