// @flow
import Model from 'd2/lib/model/Model';

import commonQueryParams from './commonQueryParams';
import getterTypes from './getterTypes.const';
import getD2 from '../../d2/d2Instance';

export type Converter = (d2Model: Model) => any;

export default async function getData(
    d2ModelName: string,
    d2ModelGetterType: $Values<typeof getterTypes>,
    queryParams?: ?Object,
    converter: Converter,
) {
    const d2 = getD2();
    const accQueryParams = { ...commonQueryParams, ...queryParams };

    let retrievedData;
    if (d2ModelGetterType === getterTypes.GET) {
        retrievedData = await d2.models[d2ModelName][d2ModelGetterType]();
    } else {
        retrievedData = await d2.models[d2ModelName][d2ModelGetterType](accQueryParams);
        retrievedData = [...retrievedData.values()];
    }

    const convertedCata = converter(retrievedData);

    return convertedCata;
}
