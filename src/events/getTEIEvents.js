// @flow
import log from 'loglevel';
import { getApi } from '../d2/d2Instance';
import programCollection from '../metaData/programCollection/programCollection';
import errorCreator from '../utils/errorCreator';
import { valueConvertersForType } from '../converters/serverToClient';

type apiDataValue = {
    dataElement: string,
    value: any
};

type apiTEIEvent = {
    program: string,
    programStage: string,
    dataValues: Array<apiDataValue>
};

const errorMessages = {
    PROGRAM_NOT_FOUND: 'Program not found',
    STAGE_NOT_FOUND: 'Stage not found',
};

function getValuesById(apiDataValues: Array<apiDataValue>) {
    return apiDataValues.reduce((accValues, dataValue) => {
        accValues[dataValue.dataElement] = dataValue.value;
        return accValues;
    }, {});
}

function convertToClientEvent(event: apiTEIEvent) {
    const programMetaData = programCollection.get(event.program);
    if (!programMetaData) {
        log.error(errorCreator(errorMessages.PROGRAM_NOT_FOUND)({ fn: 'convertToClientEvent', event }));
        return null;
    }

    const stageMetaData = programMetaData.getStage(event.programStage);
    if (!stageMetaData) {
        log.error(errorCreator(errorMessages.STAGE_NOT_FOUND)({ fn: 'convertToClientEvent', event }));
        return null;
    }

    const dataValuesById = getValuesById(event.dataValues);
    const convertedDataValues = stageMetaData.convertValues(dataValuesById, valueConvertersForType);

    return {
        dataValues: convertedDataValues,
        program: event.program,
        programStage: event.programStage,
    };
}

export default async function getTEIEvents() {
    const api = getApi();
    const apiRes = await api
        .get('events?trackedEntityInstance=a5l62eP6vKb&program=WSGAb5XwJ3Y&programStage=edqlbukwRfQ');

    if (!apiRes || !apiRes.events || apiRes.events.length === 0) {
        return null;
    }

    return apiRes.events.reduce((accEvents, apiEvent) => {
        const event = convertToClientEvent(apiEvent);
        if (event) {
            accEvents.push(event);
        }
        return accEvents;
    }, []);
}
