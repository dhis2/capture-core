// @flow
import LoadSpecification from '../LoadSpecificationDefinition/LoadSpecification';
import { loadStoreDataIfNotExists } from '../loader/storeDataLoaders';
import systemSettingsApiSpec from '../../api/apiSpecifications/systemSettings.apiSpecification';

export default function getSystemSettingsLoadSpecification(
    storeName: string = 'systemSettings'): LoadSpecification {
    return new LoadSpecification((_this) => {
        _this.loader = loadStoreDataIfNotExists;
        _this.objectStore = storeName;
    }, systemSettingsApiSpec);
}
