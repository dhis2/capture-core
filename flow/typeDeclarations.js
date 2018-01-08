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