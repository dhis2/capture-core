// @flow
import ApiSpecification from '../ApiSpecificationDefinition/ApiSpecification';
import getterTypes from '../fetcher/getterTypes.const';

export default new ApiSpecification((_this) => {
    _this.modelName = 'programs';
    _this.modelGetterType = getterTypes.LIST;
    _this.queryParams = {
        fields: '*,dataEntryForm[*],relatedProgram[id,displayName],relationshipType[id,displayName],trackedEntity[id,displayName],categoryCombo[id,displayName,isDefault,categories[id,displayName,categoryOptions[id,displayName,organisationUnits[id]]]],organisationUnits[id,displayName],userRoles[id,displayName],programStages[*,dataEntryForm[*],programStageSections[id,displayName,description,sortOrder,dataElements[id]],programStageDataElements[*,dataElement[*,optionSet[id]]]],programTrackedEntityAttributes[*,trackedEntityAttribute[id,unique]]',
    };
    _this.converter = d2Model => d2Model;
});
