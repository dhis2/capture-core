// @flow
import { createReducerDescription } from '../../tracker-redux/trackerReducer';
import { actionTypes as fieldActionTypes } from '../../components/D2Form/D2SectionFields.actions';
import { actionTypes as loaderActionTypes } from '../../actions/form.actions';

export const formsValuesDesc = createReducerDescription({
    [loaderActionTypes.OPEN_FORM]: (state, action) => {
        const newState = { ...state };
        newState[action.meta.formId] = action.payload;
        return newState;
    },
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
