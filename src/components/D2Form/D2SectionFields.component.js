// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import buildField from './field/buildField';

import MetaDataElement from '../../metaData/DataElement/DataElement';

import type { FieldConfig } from './field/buildField';

type FieldConfigWithValue = {
    name: string,
    component: ComponentType<any>,
    props: Object,
    value: any
};

type FormsValues = {
    [id: string]: any
};

type Props = {
    fieldsMetaData: Map<string, MetaDataElement>,
    values: FormsValues,
    onUpdateField: (containerId: string, elementId: string, value: any) => void,
    dataId: string,
};

class D2SectionFields extends Component<Props> {
    static defaultProps = {
        values: {},
    };

    handleUpdateField: (elementId: string, value: any) => void;
    formBuilderInstance: ?FormBuilder;
    formFields: Array<FieldConfig>;

    constructor(props: Props) {
        super(props);
        this.handleUpdateField = this.handleUpdateField.bind(this);
        this.formFields = this.buildFormFields();
    }

    buildFormFields(): Array<FieldConfig> {
        const elements = this.props.fieldsMetaData;
        const values = this.props.values;
        // $FlowSuppress
        return Array.from(elements.entries())
            .map(entry => entry[1])
            .map(metaDataElement => buildField(metaDataElement, values[metaDataElement.id]))
            .filter(field => field);
    }

    handleUpdateField(elementId: string, value: any) {
        this.props.onUpdateField(this.props.dataId, elementId, value);
    }

    handleUpdateStatus(a, b, c) {
       
    }

    getFieldConfigWithValue(): Array<FieldConfigWithValue> {
        return this.formFields.map(formField => ({ ...formField, value: this.props.values[formField.name] }));
    }

    render() {
        return (
            <div>
                <FormBuilder
                    ref={(instance) => { this.formBuilderInstance = instance; }}
                    fields={this.getFieldConfigWithValue()}
                    onUpdateField={this.handleUpdateField}
                    onUpdateFormStatus={this.handleUpdateStatus}
                />
            </div>
        );
    }
}

D2SectionFields.propTypes = {

};

export default D2SectionFields;
