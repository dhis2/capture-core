// @flow
import ApiSpecification from '../ApiSpecificationDefinition/ApiSpecification';
import getterTypes from '../fetcher/getterTypes.const';

export default new ApiSpecification((_this) => {
    _this.modelName = 'systemSettings';
    _this.modelGetterType = getterTypes.LIST;
    _this.queryParams = {
        key: 'keyGoogleMapsApiKey&key=keyMapzenSearchApiKey&key=keyCalendar&key=keyDateFormat',
    };
    _this.converter = d2Model => d2Model;
});
