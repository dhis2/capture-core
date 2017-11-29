// @flow
/* eslint-disable no-unused-expressions */
import StorageContainer from '../../storage/StorageContainer';
import getterTypes from '../loader/getterTypes.const';
import type { Converter } from '../loader/storeDataLoaders';

type Loader = (
storageContainer: StorageContainer,
objectStore: string,
queryParams?: ?Object,
d2ModelName: string,
d2ModelGetterType: $Values<typeof getterTypes>,
converter: Converter) => Promise<void>;

class LoadSpecification {
    objectStore: string;
    queryParams: ?Object;
    loader: Loader;
    d2ModelName: string;
    d2ModelGetterType: $Values<typeof getterTypes>;
    converter: Converter;

    constructor(initFn: (_this: LoadSpecification) => void) {
        initFn && initFn(this);
    }

    load(storageContainer: StorageContainer) {
        return this.loader(storageContainer, this.objectStore, this.queryParams, this.d2ModelName, this.d2ModelGetterType, this.converter);
    }
}

export default LoadSpecification;
