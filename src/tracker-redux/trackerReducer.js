// @flow
import { isDefined } from 'd2-utilizr';
import log from 'loglevel';
// import type { Reducer } from 'redux';

import environments from '../constants/environments';

type ReducerDescription = {
    initValue: any,
    name: string,
    updaters: Object
};

type Action = {
    type: string,
    [props: string]: any
}

type ActionOnReducerData = (state: any, action: Action) => void;

function updateStatePartInProduction<T>(
    state: ?T, action: Action, updatersForActionTypes: {[actionType: string]: () => T}, initValue: T): T {
    if (!isDefined(state) || state === null) {
        state = initValue;
    }

    if (updatersForActionTypes[action.type]) {
        const newState = updatersForActionTypes[action.type](state, action);
        return newState;
    }

    // $FlowSuppress
    return state;
}

function updateStatePartInDevelopment<T>(
    state: ?T, action: Action, updatersForActionTypes: {[actionType: string]: () => T}, initValue: T, onUpdaterFound: ActionOnReducerData, onUpdaterExecuted: ActionOnReducerData): T {
    if (!isDefined(state) || state === null) {
        state = initValue;
    }

    if (updatersForActionTypes[action.type]) {
        onUpdaterFound(state, action);
        const newState = updatersForActionTypes[action.type](state, action);
        onUpdaterExecuted(state, action);
        return newState;
    }

    // $FlowSuppress
    return state;
}

const getUpdaterFoundFn =
    (reducerDescription: ReducerDescription) =>
        (state: any, action: Action) => {
            log.trace(`Updater for ${action.type} started in ${reducerDescription.name}. Starting state is: ${JSON.stringify(state)}`);
        };

const getUpdaterExecutedFn =
    (reducerDescription: ReducerDescription) =>
        (state: any, action: Action) => {
            log.trace(`Updater for ${action.type} executed in ${reducerDescription.name}. New state is: ${JSON.stringify(state)}`);
        };

const getProductionReducer =
    (reducerDescription: ReducerDescription) =>
        (state: any, action: Action) =>
            updateStatePartInProduction(state, action, reducerDescription.updaters, reducerDescription.initValue);

const getDevelopmentReducer = (reducerDescription: ReducerDescription) => {
    const updaterFoundFn = getUpdaterFoundFn(reducerDescription);
    const updaterExecutedFn = getUpdaterExecutedFn(reducerDescription);
    return (state: any, action: Action) => {
        log.trace(`reducer ${reducerDescription.name} starting. Action is: ${JSON.stringify(action)}`);
        const newState = updateStatePartInDevelopment(state, action, reducerDescription.updaters, reducerDescription.initValue, updaterFoundFn, updaterExecutedFn);
        log.trace(`reducer ${reducerDescription.name} finished`);
        return newState;
    };
};

function buildReducer(reducerDescription: ReducerDescription) {
    const currentEnvironment = process && process.env && process.env.NODE_ENV && process.env.NODE_ENV;

    const reducer = currentEnvironment === environments.prod
        ? getProductionReducer(reducerDescription)
        : getDevelopmentReducer(reducerDescription);
    return reducer;
}

export function buildReducersFromDescriptions(reducerDescriptions: Array<ReducerDescription>) {
    // $FlowSuppress
    const reducers = reducerDescriptions.reduce((accReducers: {[reducerName: string]: Reducer<any, Action>}, description: ReducerDescription) => {
        accReducers[description.name] = buildReducer(description);
        return accReducers;
    }, {});
    return reducers;
}

export function createReducerDescription(updaters: Object, name: string, initValue: any = {}): ReducerDescription {
    return {
        initValue,
        name,
        updaters,
    };
}
