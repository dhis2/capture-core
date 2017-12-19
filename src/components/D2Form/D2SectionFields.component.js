// @flow
import React, { Component } from 'react';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import buildField from './buildField';

import MetaDataElement from '../../metaData/DataElement/DataElement';

type Props = {
    fieldsMetaData: Map<string, MetaDataElement>
};

class D2SectionFields extends Component<Props> {
    static buildField(metaData: MetaDataElement, value: any) {
        return buildField(metaData, value);
    }

    buildFormFields() {
        const elements = this.props.fieldsMetaData;
        return Array.from(elements.entries()).map(metaDataElement => D2SectionFields.buildField(metaDataElement[1]));
    }

    handleFieldUpdate(elementId: string, value: any){
        
    }

    handleUpdateStatus() {

    }

    render() {
        return (
            <div>
                <FormBuilder fields={this.buildFormFields()} onUpdateField={this.handleFieldUpdate} onUpdateFormStatus={this.handleUpdateStatus} />
            </div>
        );
    }
}

D2SectionFields.propTypes = {

};

export default D2SectionFields;
