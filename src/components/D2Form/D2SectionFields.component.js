// @flow
import React, { Component } from 'react';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import buildField from './buildField';

import MetaDataElement from '../../metaData/DataElement/DataElement';

type FormsValues = {
    [id: string]: any
};

type Props = {
    fieldsMetaData: Map<string, MetaDataElement>,
    values: FormsValues,
    onUpdateField: (containerId: string, elementId: string, value: any) => void,
    getContainerId: () => string
};

class D2SectionFields extends Component<Props> {
    static defaultProps = {
        values: {},
    };

    handleUpdateField: (elementId: string, value: any) => void;
    formBuilderInstance: ?FormBuilder;

    constructor(props: Props) {
        super(props);
        this.handleUpdateField = this.handleUpdateField.bind(this);
    }

    buildFormFields() {
        const elements = this.props.fieldsMetaData;
        const values = this.props.values;
        return Array.from(elements.entries())
            .map(entry => entry[1])
            .map(metaDataElement => buildField(metaDataElement, values[metaDataElement.id]))
            .filter(field => field);
    }

    handleUpdateField(elementId: string, value: any) {
        // this.props.onUpdateField(this.props.getContainerId(), elementId, value);
    }

    handleUpdateStatus(a, b, c) {
        let g = a;
    }

    render() {
        return (
            <div>
                <FormBuilder
                    ref={(instance) => { this.formBuilderInstance = instance; }}
                    fields={this.buildFormFields()}
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
