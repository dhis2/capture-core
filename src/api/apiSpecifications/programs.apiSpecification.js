// @flow
import isDefined from 'd2-utilizr/lib/isDefined';
import Model from 'd2/lib/model/Model';

import ApiSpecification from '../ApiSpecificationDefinition/ApiSpecification';
import getterTypes from '../fetcher/getterTypes.const';

function convertFromCollectionToArray(collection) {
    if (!collection || collection.size === 0) {
        return [];
    }
    return [...collection.toArray()];
}

function getProgramStageSections(d2SectionsCollection) {
    const d2Sections = convertFromCollectionToArray(d2SectionsCollection);
    return d2Sections.map(section => ({
        id: section.id,
    }));
}

function getProgramStages(d2ProgramStagesCollection) {
    const d2ProgramStages = convertFromCollectionToArray(d2ProgramStagesCollection);

    const programStages = d2ProgramStages.map((d2ProgramStage) => {
        const programStage = { ...d2ProgramStage.dataValues };
        programStage.programStageSections = getProgramStageSections(programStage.programStageSections);
        programStage.notificationTemplates = convertFromCollectionToArray(programStage.notificationTemplates).map(template => ({
            id: template.id,
        }));
        return programStage;
    });
    programStages.sort((a, b) => {
        const mainSortField = 'sortOrder';

        if (!isDefined(a[mainSortField])) {
            return 1;
        } else if (!isDefined(b[mainSortField])) {
            return -1;
        }

        return a[mainSortField] - b[mainSortField];
    });

    return programStages;
}

function getOrganisationUnits(d2OrganisationUnitsCollection) {
    const d2OrganisationUnits = convertFromCollectionToArray(d2OrganisationUnitsCollection);

    return d2OrganisationUnits.reduce((accOrganisationUnits, organisationUnit) => {
        accOrganisationUnits[organisationUnit.id] = {
            id: organisationUnit.id,
            name: organisationUnit.name,
            displayName: organisationUnit.displayName,
        };
        return accOrganisationUnits;
    }, {});
}

export default new ApiSpecification((_this) => {
    _this.modelName = 'programs';
    _this.modelGetterType = getterTypes.LIST;
    _this.queryParams = {
        fields: '*,dataEntryForm[*],relatedProgram[id,displayName],relationshipType[id,displayName],trackedEntity[id,displayName],categoryCombo[id,displayName,isDefault,categories[id,displayName,categoryOptions[id,displayName,organisationUnits[id]]]],organisationUnits[id,displayName],userRoles[id,displayName],programStages[*,dataEntryForm[*],programStageSections[id,displayName,description,sortOrder,dataElements[id]],programStageDataElements[*,dataElement[*,optionSet[id]]]],programTrackedEntityAttributes[*,trackedEntityAttribute[id,unique]]',
    };
    _this.converter = (d2Programs) => {
        if (!d2Programs || d2Programs.length === 0) {
            return null;
        }

        const programs = d2Programs.map((d2Program: Model) => ({
            id: d2Program.id,
            name: d2Program.name,
            displayName: d2Program.displayName,
            displayShortName: d2Program.displayShortName,
            created: d2Program.created,
            description: d2Program.displayDescription,
            programStages: getProgramStages(d2Program.programStages),
            organisationUnits: getOrganisationUnits(d2Program.organisationUnits),
        }));

        return programs;
    };
});

