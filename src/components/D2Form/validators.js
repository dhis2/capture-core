// @flow
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import isArray from 'd2-utilizr/src/isArray';

import getD2 from '../../d2/d2Instance';
import MetaDataElement from '../../metaData/DataElement/DataElement';
import elementTypes from '../../metaData/DataElement/elementTypes';

type Validator = (value: any) => boolean;

type ValidatorContainer = {
    validator: Validator,
    message: string
}

type ValidatorBuilder = (metaData: MetaDataElement) => Array<ValidatorContainer>;

let d2;

const wordValidatorKeys = {
    COMPULSORY: 'required',
    NUMBER: 'number',
    POSITIVE_INTEGER: 'positive_number',
    EMAIL: 'email',
};

const errorMessages = {
    ZERO_OR_POSITIVE_NUMBER: 'value_should_be_zero_or_a_positive_number',
};

const isZeroOrPositiveNumber = (value: any) => {
    if (value === 0) {
        return true;
    }
    return wordToValidatorMap.get(wordValidatorKeys.POSITIVE_INTEGER);
};

const validatorsForTypes = {
    [elementTypes.NUMBER]: () => ({
        validator: wordToValidatorMap.get(wordValidatorKeys.NUMBER),
        message: d2.i18n.getTranslation(wordToValidatorMap.get(wordValidatorKeys.NUMBER).message),
    }),
    [elementTypes.INTEGER_POSITIVE]: () => ({
        validator: wordToValidatorMap.get(wordValidatorKeys.POSITIVE_INTEGER),
        message: d2.i18n.getTranslation(wordToValidatorMap.get(wordValidatorKeys.POSITIVE_INTEGER).message),
    }),
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: () => ({
        validator: isZeroOrPositiveNumber,
        message: d2.i18n.getTranslation(errorMessages.ZERO_OR_POSITIVE_NUMBER),
    }),
    [elementTypes.EMAIL]: () => ({
        validator: wordToValidatorMap.get(wordValidatorKeys.EMAIL),
        message: d2.i18n.getTranslation(wordToValidatorMap.get(wordValidatorKeys.EMAIL).message),
    }),
};

function buildTypeValidators(metaData: MetaDataElement): Array<ValidatorContainer> {
    const validatorsForType = validatorsForTypes[metaData.type] && validatorsForTypes[metaData.type](metaData);

    if (!validatorsForType) {
        return [];
    }

    return isArray(validatorsForType) ? validatorsForType : [validatorsForType];
}

function buildCompulsoryValidator(metaData: MetaDataElement): Array<ValidatorContainer> {
    return metaData.compulsory ? [
        {
            validator: wordToValidatorMap.get(wordValidatorKeys.COMPULSORY),
            message: d2.i18n.getTranslation(wordToValidatorMap.get(wordValidatorKeys.COMPULSORY).message),
        },
    ] :
        [];
}

function compose(validatorBuilders: Array<ValidatorBuilder>, metaData: MetaDataElement) {
    const validators = validatorBuilders.reduce((accValidators: Array<ValidatorContainer>, builder: ValidatorBuilder) => [...accValidators, ...builder(metaData)], []);
    return validators;
}

export default function getValidators(metaData: MetaDataElement) {
    d2 = getD2();
    const builders = [buildCompulsoryValidator, buildTypeValidators];
    return compose(builders, metaData);
}
