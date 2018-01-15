// @flow
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import isArray from 'd2-utilizr/src/isArray';

import isValidDate from '../../../utils/validators/date.validator';
import { getTranslation } from '../../../d2/d2Instance';
import { formatterOptions } from '../../../utils/string/format.const';
import MetaDataElement from '../../../metaData/DataElement/DataElement';
import elementTypes from '../../../metaData/DataElement/elementTypes';

type Validator = (value: any) => boolean;

type ValidatorContainer = {
    validator: Validator,
    message: string
}

type ValidatorBuilder = (metaData: MetaDataElement) => Array<ValidatorContainer>;

const wordValidatorKeys = {
    COMPULSORY: 'required',
    NUMBER: 'number',
    POSITIVE_NUMBER: 'positive_number',
    EMAIL: 'email',
};

const errorMessages = {
    INTEGER: 'value_should_be_an_integer',
    POSITIVE_INTEGER: 'value_should_be_a_positive_integer',
    ZERO_OR_POSITIVE_INTEGER: 'value_should_be_zero_or_a_positive_integer',
    DATE: 'value_should_be_a_valid_date',
    TIME: 'value_should_be_a_valid_time',
};

const isValidTime = (value: string) => (/^(([0-1]*[0-9])|(2[0-3]))([:.])*([0-5][0-9])$/.test(value));

const isInteger = (value: string) => {
    const isValidNumberFn = wordToValidatorMap.get(wordValidatorKeys.NUMBER);
    if (!isValidNumberFn(value)) {
        return false;
    }

    const number = Number(value);
    return Number.isSafeInteger(number);
};

const isPositiveInteger = (value: string) => {
    const isValidPositiveNumberFn = wordToValidatorMap.get(wordValidatorKeys.POSITIVE_NUMBER);
    if (!isValidPositiveNumberFn(value)) {
        return false;
    }

    const number = Number(value);
    return Number.isSafeInteger(number);
};

const isZeroOrPositiveInteger = (value: any) => {
    if (value === 0) {
        return true;
    }
    return isPositiveInteger(value);
};


const validatorsForTypes = {
    [elementTypes.NUMBER]: () => ({
        validator: wordToValidatorMap.get(wordValidatorKeys.NUMBER),
        message: getTranslation(wordToValidatorMap.get(wordValidatorKeys.NUMBER).message, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.INTEGER]: () => ({
        validator: isInteger,
        message: getTranslation(errorMessages.INTEGER, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.INTEGER_POSITIVE]: () => ({
        validator: isPositiveInteger,
        message: getTranslation(errorMessages.POSITIVE_INTEGER, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: () => ({
        validator: isZeroOrPositiveInteger,
        message: getTranslation(errorMessages.ZERO_OR_POSITIVE_INTEGER, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.TIME]: () => ({
        validator: isValidTime,
        message: getTranslation(errorMessages.TIME, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.DATE]: () => ({
        validator: isValidDate,
        message: getTranslation(errorMessages.DATE, formatterOptions.CAPITALIZE_FIRST_LETTER),
    }),
    [elementTypes.EMAIL]: () => ({
        validator: wordToValidatorMap.get(wordValidatorKeys.EMAIL),
        message: getTranslation(wordToValidatorMap.get(wordValidatorKeys.EMAIL).message),
    }),
};

function buildTypeValidators(metaData: MetaDataElement): Array<ValidatorContainer> {
    let validatorContainersForType = validatorsForTypes[metaData.type] && validatorsForTypes[metaData.type](metaData);

    if (!validatorContainersForType) {
        return [];
    }

    validatorContainersForType = isArray(validatorContainersForType) ? validatorContainersForType : [validatorContainersForType];

    validatorContainersForType = validatorContainersForType.map(validatorContainer => ({
        ...validatorContainer,
        validator: (value: any) => {
            if (!value && value !== 0 && value !== false) {
                return true;
            }
            return validatorContainer.validator(value);
        },
    }));

    return validatorContainersForType;
}

function buildCompulsoryValidator(metaData: MetaDataElement): Array<ValidatorContainer> {
    return metaData.compulsory ? [
        {
            validator: wordToValidatorMap.get(wordValidatorKeys.COMPULSORY),
            message: getTranslation(wordToValidatorMap.get(wordValidatorKeys.COMPULSORY).message),
        },
    ] :
        [];
}

function compose(validatorBuilders: Array<ValidatorBuilder>, metaData: MetaDataElement) {
    const validators = validatorBuilders.reduce((accValidators: Array<ValidatorContainer>, builder: ValidatorBuilder) => [...accValidators, ...builder(metaData)], []);
    return validators;
}

export default function getValidators(metaData: MetaDataElement) {
    const builders = [buildCompulsoryValidator, buildTypeValidators];
    return compose(builders, metaData);
}
