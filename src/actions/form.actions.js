// @flow
import log from 'loglevel';

import metaDataCollection from '../metaData/programCollection/programCollection';
import { valueConvertersForType } from '../converters/clientToForm';
import errorCreator from '../utils/errorCreator';
import { actionCreator } from './actions.utils';

export const actionTypes = {
    OPEN_FORM: 'OpenForm',
};

const errorMessages = {
    PROGRAM_NOT_FOUND: 'Program not found',
    STAGE_NOT_FOUND: 'Stage not found',
};

export function openForm(formId: string, store: ReduxStore) {
    const state = store.getState();
    const event: Event = state.events[formId];
    const eventValues = state.eventsValues[formId];

    const program = metaDataCollection.get(event.programId);
    if (!program) {
        log.error(errorCreator(errorMessages.PROGRAM_NOT_FOUND)({ action: 'openForm', event }));
        return actionCreator(actionTypes.OPEN_FORM)();
    }

    const stage = program.getStage(event.programStageId);
    if (!stage) {
        log.error(errorCreator(errorMessages.STAGE_NOT_FOUND)({ action: 'openForm', event }));
        return actionCreator(actionTypes.OPEN_FORM)();
    }

    const convertedValues = stage.convertValues(eventValues, valueConvertersForType);

    return actionCreator(actionTypes.OPEN_FORM)(convertedValues, { formId });
}
