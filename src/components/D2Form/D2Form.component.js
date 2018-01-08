// @flow
import React, { Component, PropTypes } from 'react';

import D2Section from './D2Section.component';
import MetaDataStage from '../../metaData/Stage/Stage';

type Props = {
    metaDataStage: MetaDataStage
};

class D2Form extends Component<Props> {
    id: string;
    resolveStateContainerId: () => void;
    validateForm: () => void;
    sectionInstances: Map<string, D2Section>;

    constructor(props: Props) {
        super(props);

        const metaData = this.props.metaDataStage;
        this.id = metaData.id;

        this.resolveStateContainerId = this.resolveStateContainerId.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.sectionInstances = new Map();
    }

    validateForm() {
        return Array.from(this.sectionInstances.entries())
            .map(entry => entry[1])
            .every((sectionInstance: D2Section) => {
                if (sectionInstance && sectionInstance.sectionFieldsInstance && sectionInstance.sectionFieldsInstance.getWrappedInstance() && sectionInstance.sectionFieldsInstance.getWrappedInstance().formBuilderInstance) {
                    const formBuilderInstance = sectionInstance.sectionFieldsInstance.getWrappedInstance().formBuilderInstance;
                    return formBuilderInstance.state.form.valid;
                }
                return true;
            });
    }

    resolveStateContainerId() {
        return this.id;
    }

    setSectionInstance(instance: ?D2Section, id: string) {
        if (!instance) {
            if (this.sectionInstances.has(id)) {
                this.sectionInstances.delete(id);
            }
        } else {
            this.sectionInstances.set(id, instance);
        }
    }

    render() {
        const { metaDataStage } = this.props;

        const metaDataSectionsAsArray = Array.from(metaDataStage.sections.entries()).map(entry => entry[1]);

        const sections = metaDataSectionsAsArray.map(section => (
            <D2Section
                ref={sectionInstance => this.setSectionInstance(sectionInstance, section.id)}
                key={section.id}
                sectionMetaData={section}
                getContainerId={this.resolveStateContainerId}
            />
        ));

        return (
            <div>
                {sections}
            </div>
        );
    }
}

D2Form.propTypes = {

};

export default D2Form;
