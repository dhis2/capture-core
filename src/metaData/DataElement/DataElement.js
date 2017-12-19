// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import log from 'loglevel';
import isDefined from 'd2-utilizr/src/isDefined';
import isFunction from 'd2-utilizr/src/isFunction';

import OptionSet from '../OptionSet/OptionSet';
import errorCreator from '../../utils/errorCreator';
import elementTypes from './elementTypes';

export default class DataElement {
    static errorMessages = {
        TYPE_NOT_FOUND: 'type not supported',
    };

    _id: string;
    _name: string;
    _shortName: string;
    _formName: string;
    _visible: boolean;
    _disabled: boolean;
    _compulsory: boolean;
    _description: string;
    _type: $Values<typeof elementTypes>;
    _optionSet: ?OptionSet;

    constructor(initFn: ?(_this: DataElement) => void) {
        this.visible = true;
        this.disabled = false;
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

    set shortName(shortName: string) {
        this._shortName = shortName;
    }
    get shortName(): string {
        return this._shortName;
    }

    set formName(formName: string) {
        this._formName = formName;
    }
    get formName(): string {
        return this._formName;
    }

    set visible(visible: boolean) {
        this._visible = isDefined(visible) ? visible : true;
    }
    get visible(): boolean {
        return this._visible;
    }

    set disabled(disabled: boolean) {
        this._disabled = !!disabled;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    set compulsory(compulsory: boolean) {
        this._compulsory = !!compulsory;
    }
    get compulsory(): boolean {
        return this._compulsory;
    }

    set description(description: string) {
        this._description = description;
    }
    get description(): string {
        return this._description;
    }

    set type(type: string) {
        if (!elementTypes[type]) {
            log.warn(errorCreator(DataElement.errorMessages.TYPE_NOT_FOUND)({ dataElement: this, type }));
            this._type = elementTypes.UNKNOWN;
        } else {
            this._type = type;
        }
    }
    get type(): $Values<typeof elementTypes> {
        return this._type;
    }

    set optionSet(optionSet: ?OptionSet) {
        this._optionSet = optionSet;
    }
    get optionSet(): ?OptionSet {
        return this._optionSet;
    }

    * getPropertyNames(): Generator<string, void, void> {
        const excluded = ['getPropertyNames', 'constructor', 'copyPropertiesTo'];
        // $FlowSuppress        
        for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (!excluded.includes(name)) {
                yield name;
            }
        }
    }

    copyPropertiesTo(object: {}) {
        for (const propName of this.getPropertyNames()) {
            // $FlowSuppress
            object[propName] = this[propName];
        }
        return object;
    }
}
