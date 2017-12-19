// @flow
import log from 'loglevel';
import errorCreator from '../../utils/errorCreator';
import TextField from '../FormFields/Generic/D2TextField.component';

import MetaDataElement from '../../metaData/DataElement/DataElement';
import elementTypes from '../../metaData/DataElement/elementTypes';

const changeEvents = {
    ON_BLUR: 'onBlur',
};
const errorMessages = {
    NO_FORMFIELD_FOR_TYPE: 'Formfield component not specified for type',
};

const getBaseFieldProps = () => ({
    changeEvent: changeEvents.ON_BLUR,
    style: {
        width: '100%',
    },
});

const fieldForTypes = {
    [elementTypes.TEXT]: (metaData: MetaDataElement, value: any) => {
        const props = { ...getBaseFieldProps(),
            ...{
                label: metaData.name,
                labelIsFloating: true,
                multiLine: false,
            } };
        return {
            name: metaData.id,
            value,
            component: TextField,
            props,
        };
    },
    [elementTypes.UNKNOWN]: (metaData: MetaDataElement, value: any) => {
        const props = { ...getBaseFieldProps(),
            ...{
                label: metaData.name,
                labelIsFloating: true,
                multiLine: false,
            } };
        return {
            name: metaData.id,
            value,
            component: TextField,
            props,
        };
    },
};

export default function buildField(metaData: MetaDataElement, value: any) {
    const type = metaData.type;
    if (!fieldForTypes[type]) {
        log.warn(errorCreator(errorMessages.NO_FORMFIELD_FOR_TYPE)({ metaData }));
        return fieldForTypes[elementTypes.UNKNOWN](metaData, value);
    }

    return fieldForTypes[type](metaData, value);
}
