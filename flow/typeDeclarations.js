// @flow
/* eslint-disable */
import type { Store } from 'redux';

declare type D2 = {
    models: Object,
    system: {
        settings: {
            all: () => Object,
        }
    },
    i18n: Object,
    Api: {
        getApi: () => Object
    }
};

// Redux
declare type ReduxState = Object;
declare type ReduxDispatch = (action: {
    type: string,
    [props: string]: any,
}) => void;

declare type ReduxStore = {
    getState: () => ReduxState,
    dispatch: ReduxDispatch
}

// Events
declare type Event = {
    eventId: string,
    programId: string,
    programStageId: string,
    orgUnitId: string,
    orgUnitName: string,
    trackedEntityInstanceId: string,
    enrollmentId: string,
    enrollmentStatus: string,
    status: string,
    eventDate: string,
    dueDate: string,
};

declare type UiEventData = {
    target: {
        value: any
    }
};