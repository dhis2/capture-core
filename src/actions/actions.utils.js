// @flow
/* eslint-disable import/prefer-default-export */

/**
 * Generic action-creator
 * @param type of action
 * @returns {object} FSA-compliant action
 */
export function actionCreator(type: string) {
    return (payload: any, meta, error) => {
        if (payload == null) {
            payload = {};
        }

        return {
            type,
            payload,
            meta,
            error,
        };
    };
}
