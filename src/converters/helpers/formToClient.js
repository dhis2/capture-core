// @flow
import log from 'loglevel';
import { ensureState } from 'redux-optimistic-ui';

import errorCreator from '../../utils/errorCreator';
import { getTranslation } from '../../d2/d2Instance';
import programCollection from '../../metaData/programCollection/programCollection';
import Stage from '../../metaData/Stage/Stage';
import { valueConvertersForType } from '../formToClient';

const errorMessages = {
    PROGRAM_NOT_FOUND: 'Program not found',
    STAGE_NOT_FOUND: 'Stage not found',
};

export function convertFormValuesToClient(formValues: ?Object, stage: Stage) {
    const convertedValues = stage.convertValues(formValues, valueConvertersForType);
    return convertedValues;
}

export function convertStateFormValuesToClient(eventId: string, state: Object) {
    const event = ensureState(state.events)[eventId];
    const formValues = state.formsValues[eventId];

    const program = programCollection.get(event.programId);
    if (!program) {
        log.error(errorCreator(errorMessages.PROGRAM_NOT_FOUND)({ eventId, event }));
        return { error: getTranslation('generic_error'), values: null, stage: null };
    }

    const stage = program.getStage(event.programStageId);
    if (!stage) {
        log.error(errorCreator(errorMessages.STAGE_NOT_FOUND)({ eventId, event }));
        return { error: getTranslation('generic_error'), values: null, stage: null };
    }

    const convertedValues = convertFormValuesToClient(formValues, stage);

    return { values: convertedValues, error: null, stage };
}
