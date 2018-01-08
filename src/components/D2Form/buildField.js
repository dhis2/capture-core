// @flow
import log from 'loglevel';

import errorCreator from '../../utils/errorCreator';
import TextField from '../FormFields/Generic/D2TextField.component';

import getValidators from './validators';
import MetaDataElement from '../../metaData/DataElement/DataElement';
import elementTypes from '../../metaData/DataElement/elementTypes';

const changeEvents = {
    ON_BLUR: 'onBlur',
};
const errorMessages = {
    NO_FORMFIELD_FOR_TYPE: 'Formfield component not specified for type',
};

const getBaseComponentProps = () => ({
    changeEvent: changeEvents.ON_BLUR,
    style: {
        width: '100%',
    },
});

const getBaseFieldProps = (metaData: MetaDataElement) => ({
    validators: getValidators(metaData),
});

const createComponentProps = (componentProps: Object) => ({
    ...getBaseComponentProps(),
    ...componentProps,
});

const createFieldProps = (fieldProps: Object, metaData: MetaDataElement) => ({
    ...getBaseFieldProps(metaData),
    ...fieldProps,
});

const getBaseTextField = (metaData: MetaDataElement, value: any) => {
    const props = createComponentProps({
        label: metaData.name,
        labelIsFloating: true,
        multiLine: false,
    });

    return createFieldProps({
        name: metaData.id,
        value,
        component: TextField,
        props,
    }, metaData);
};

const fieldForTypes = {
    [elementTypes.TEXT]: (metaData: MetaDataElement, value: any) => {
        return getBaseTextField(metaData, value);
    },
    [elementTypes.LONG_TEXT]: (metaData: MetaDataElement, value: any) => {
        const baseField = getBaseTextField(metaData, value);
        const props = { ...baseField.props, multiLine: true };
        return { ...baseField, props };
    },
    [elementTypes.NUMBER]: (metaData: MetaDataElement, value: any) => {
        return getBaseTextField(metaData, value);
    },
    [elementTypes.INTEGER_POSITIVE]: (metaData: MetaDataElement, value: any) => {
        return getBaseTextField(metaData, value);
    },
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: (metaData: MetaDataElement, value: any) => {
        return getBaseTextField(metaData, value);
    },
    [elementTypes.UNKNOWN]: () => null,
};

export default function buildField(metaData: MetaDataElement, value: any) {
    const type = metaData.type;
    if (!fieldForTypes[type]) {
        log.warn(errorCreator(errorMessages.NO_FORMFIELD_FOR_TYPE)({ metaData }));
        return fieldForTypes[elementTypes.UNKNOWN](metaData, value);
    }

    return fieldForTypes[type](metaData, value);
}
