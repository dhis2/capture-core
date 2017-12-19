// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import isFunction from 'd2-utilizr/src/isFunction';

import Section from './Section';

// import log from 'loglevel';
// import isDefined from 'd2-utilizr/src/isDefined';
// import isArray from 'd2-utilizr/src/isArray';
// import isObject from 'd2-utilizr/src/isObject';
// import Option from './optionSet/Option';
// import OptionSet from './optionSet/OptionSet';
// import elementTypeKeys from '../DataElement/elementTypes';

export default class Stage {
    _id: string;
    _name: string;
    _description: ?string;
    _programId: string;
    _sections: Map<string, Section>;

    constructor(initFn: ?(_this: Stage) => void) {
        this._sections = new Map();
        initFn && isFunction(initFn) && initFn(this);
    }

    set id(id: string) {
        this._id = id;
    }
    get id(): string {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set description(description: ?string) {
        this._description = description;
    }
    get description(): ?string {
        return this._description;
    }

    set programId(programId: string) {
        this._programId = programId;
    }
    get programId(): string | number {
        return this._programId;
    }

    get sections(): Map<string, Section> {
        return this._sections;
    }

    addSection(newSection: section) {
        this._sections.set(newSection.id, newSection);
    }

    getSection(id: string) {
        return this._sections.get(id);
    }

    /*
    convertValueKeysFromCodeNameToId(values: ?Object): ?Object {
        if (values) {
            const valuesWithIdKey = {};
            this.elements.forEach((element: element) => {
                // $FlowSuppress
                if (isDefined(values[element.codeName])) {
                    valuesWithIdKey[element.id] = values[element.codeName];
                }
            });
            return valuesWithIdKey;
        }
        return values;
    }

    convertValueKeysFromIdToCodeName(values: ?Object): ?Object {
        if (values) {
            return Object.keys(values).reduce((inProgressValues, key) => {
                const element = this.getElement(key);
                // $FlowSuppress
                return (element ? Object.assign(inProgressValues, { [element.codeName]: values[key] }) : inProgressValues);
            }, {});
        }
        return values;
    }

    convertValues(values: ?valuesType | Array<valuesType>, typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any}, useCodeNameKey: boolean = false) {
        if (values) {
            if (isArray(values)) {
                // $FlowSuppress
                return this.convertArrayValues(values, typeConverters, useCodeNameKey);
            } else if (isObject(values)) {
                // $FlowSuppress
                return this.convertObjectValues(values, typeConverters, useCodeNameKey);
            }

            log.warn('metadata can not be used to convert values that are not contained in an object');
        }
        return values;
    }

    convertArrayValues(arrayOfValues: Array<valuesType>, typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any}, useCodeNameKey: boolean = false) {
        return arrayOfValues.map((values: valuesType) => this.convertObjectValues(values, typeConverters, useCodeNameKey));
    }

    convertObjectValues(values: valuesType, typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any}, useCodeNameKey: boolean = false) {
        return Object.keys(values).reduce((inProgressValues, key) => {
            const metaElement = useCodeNameKey ? this.getElementByCodeName(key) : this.getElement(key);
            const rawValue = values[key];
            return Object.assign(inProgressValues,
                { [key]: (((rawValue || rawValue === false || rawValue === 0) && metaElement && typeConverters[metaElement.details.type])
                    ? (isArray(rawValue) ? rawValue.map(valuePart => typeConverters[metaElement.details.type](valuePart, metaElement)) : typeConverters[metaElement.details.type](rawValue, metaElement))
                    : rawValue) });
        }, {});
    }

    convertDynamicOptionSets(dynamicOptionSets: ?dynamicOptionSetsType,
        typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any},
        keyForValueToConvertInOption: string,
        useCodeNameKey: boolean = false) {
        if (dynamicOptionSets) {
            return Object.keys(dynamicOptionSets).reduce((accOptionSets, key) => {
                const metaElement = useCodeNameKey ? this.getElementByCodeName(key) : this.getElement(key);
                const optionSet = dynamicOptionSets[key];
                const type = metaElement && metaElement.details && metaElement.details.type;

                if (optionSet && type && typeConverters[type]) {
                    const convertedOptionSet = optionSet.map((option: Object) => {
                        const value = option[keyForValueToConvertInOption];
                        return Object.assign({}, option, { [keyForValueToConvertInOption]: ((value || value === false || value === 0) ? typeConverters[type](option[keyForValueToConvertInOption], metaElement) : value) });
                    });
                    return Object.assign(accOptionSets, { [key]: convertedOptionSet });
                }

                return Object.assign(accOptionSets, { [key]: optionSet });
            }, {});
        }
        return dynamicOptionSets;
    }

    convertDynamicOptionSetsWithOptionSetObject(dynamicOptionSets: ?OptionSet,
        typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any},
        useCodeNameKey: boolean = true) {
        const keyForValueToConvertInOption = 'value';

        if (dynamicOptionSets) {
            return Object.keys(dynamicOptionSets).reduce((accOptionSets, key) => {
                const metaElement = useCodeNameKey ? this.getElementByCodeName(key) : this.getElement(key);
                const optionSet = dynamicOptionSets[key];
                const type = metaElement && metaElement.details && metaElement.details.type;

                if (optionSet && optionSet._options && type && typeConverters[type]) {
                    const convertedOptions = optionSet._options.map((option: Option) => {
                        const value = option[keyForValueToConvertInOption];
                        return Object.assign({}, option, { [keyForValueToConvertInOption]: ((value || value === false || value === 0) ? typeConverters[type](option[keyForValueToConvertInOption], metaElement) : value) });
                    });

                    const newOptionSet = new OptionSet(convertedOptions);
                    newOptionSet._emptyText = optionSet._emptyText;
                    return Object.assign(accOptionSets, { [key]: newOptionSet });
                }

                return Object.assign(accOptionSets, { [key]: optionSet });
            }, {});
        }
        return dynamicOptionSets;
    }

    getConvertedOptionSets(typeConverters: {[type: $Keys<typeof elementTypeConstants>]: (rawValue: any, metaDataElement: element) => any}, getCodeNameKey: boolean = false): ?{[key: string]: OptionSet} {
        const convertedOptionSets = {};
        this.elements.forEach((element: element) => {
            if (element.details && element.details.optionSet) {
                const orgOptionSet = element.details.optionSet;
                const type = element.details && element.details.type;
                const converter = typeConverters[type];
                const convertedOptions = orgOptionSet._options.map((option: Option) => new Option((_this) => {
                    _this.text = option.text;
                    _this.value = (((option.value || option.value === false || option.value === 0) && converter) ? converter(option.value, element) : option.value);
                }));
                convertedOptionSets[getCodeNameKey ? element.codeName : element.id] = new OptionSet(convertedOptions);
            }
        });
        return (Object.keys(convertedOptionSets).length > 0 ? convertedOptionSets : null);
    }

    */
}
