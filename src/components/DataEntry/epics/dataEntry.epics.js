// @flow
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import { ensureState } from 'redux-optimistic-ui';

import { convertStateFormValuesToClient } from '../../../converters/helpers/formToClient';
import { convertClientValuesToServer } from '../../../converters/helpers/clientToServer';
import { actionTypes, completeEvent, completeEventError, saveEvent, saveEventError } from '../actions/dataEntry.actions';

export const completeEventEpic = (action$, store: ReduxStore) =>
    action$.ofType(actionTypes.START_COMPLETE_EVENT)
        .map((action) => {
            const eventId = action.payload;
            const state = store.getState();
            const clientValuesContainer = convertStateFormValuesToClient(eventId, state);

            if (clientValuesContainer.error) {
                return completeEventError(clientValuesContainer.error);
            }
            const clientValues = clientValuesContainer.values;

            // $FlowSuppress
            const serverValues = convertClientValuesToServer(clientValues, clientValuesContainer.stage);

            return completeEvent(clientValues, serverValues, eventId, ensureState(state.events)[eventId]);
        });

export const saveEventEpic = (action$, store: ReduxStore) =>
    action$.ofType(actionTypes.START_SAVE_EVENT)
        .map((action) => {
            const eventId = action.payload;
            const state = store.getState();
            const clientValuesContainer = convertStateFormValuesToClient(eventId, state);

            if (clientValuesContainer.error) {
                return saveEventError(clientValuesContainer.error);
            }
            const clientValues = clientValuesContainer.values;

            // $FlowSuppress
            const serverValues = convertClientValuesToServer(clientValues, clientValuesContainer.stage);

            return saveEvent(clientValues, serverValues, eventId, ensureState(state.events)[eventId]);
        });