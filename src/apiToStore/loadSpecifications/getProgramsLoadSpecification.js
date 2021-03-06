// @flow
import LoadSpecification from '../LoadSpecificationDefinition/LoadSpecification';
import { loadStoreData } from '../loader/storeDataLoaders';
import ApiSpecification from '../../api/ApiSpecificationDefinition/ApiSpecification';

export default function getProgramsLoadSpecification(
    storeName: string = 'programs',
    apiSpecification: ApiSpecification): LoadSpecification {
    return new LoadSpecification((_this) => {
        _this.loader = loadStoreData;
        _this.objectStore = storeName;
    }, apiSpecification);
}
