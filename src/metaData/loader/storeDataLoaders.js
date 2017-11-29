// @flow
import Model from 'd2/lib/model/Model';

import StorageContainer from '../../storage/StorageContainer';
import getD2 from '../../d2/d2Instance';
import commonQueryParams from './commonQueryParams';
import getterTypes from './getterTypes.const';

export type Converter = (d2Model: Model) => ?Array;

export async function loadStoreData(
    storageContainer: StorageContainer,
    objectStore: string,
    queryParams?: ?Object,
    d2ModelName: string,
    d2ModelGetterType: $Values<typeof getterTypes>,
    converter: Converter,
) {
    const d2 = getD2();
    const accQueryParams = { ...queryParams, ...commonQueryParams };

    let retrievedData;
    if (d2ModelGetterType === getterTypes.GET) {
        retrievedData = await d2.models[d2ModelName][d2ModelGetterType]();
    } else {
        retrievedData = await d2.models[d2ModelName][d2ModelGetterType](accQueryParams);
        retrievedData = [...retrievedData.values()];
    }

    const convertedCata = converter(retrievedData);
    if (convertedCata) {
        await storageContainer.setAll(objectStore, convertedCata);
    }
}

export async function loadStoreDataIfNotExists(
    storageContainer: StorageContainer,
    objectStore: string,
    queryParams?: ?Object,
    d2ModelName: string,
    d2ModelGetterType: string,
    converter: Converter,
) {
    const keys = await storageContainer.getKeys(objectStore);
    const alreadyExists = keys && keys.length > 0;
    if (!alreadyExists) {
        await loadStoreData(storageContainer, objectStore, queryParams, d2ModelName, d2ModelGetterType, converter);
    }
}
