// @flow
/* eslint-disable import/prefer-default-export */
import { createReducerDescription } from '../../tracker-redux/trackerReducer';
import { actionTypes as fieldActionTypes } from '../../components/D2Form/D2SectionFields.actions';

export const formsValuesDesc = createReducerDescription({
    [fieldActionTypes.UPDATE_FIELD]: (state, action) => {
        const newState = { ...state };
        const meta = action.meta;
        const formValues = newState[meta.containerId] = { ...newState[meta.containerId] };
        formValues[meta.elementId] = action.payload;
        return newState;
    },
}, 'formsValues');

export const formsSectionsDesc = createReducerDescription({
    
});
