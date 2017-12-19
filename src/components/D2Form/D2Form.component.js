// @flow
import React, { Component, PropTypes } from 'react';

import D2Section from './D2Section.component';

import MetaDataStage from '../../metaData/Stage/Stage';

type Props = {
    metaDataStage: MetaDataStage,
};

class D2Form extends Component<Props> {
    id: string;
    resolveStateContainerId: () => void;

    constructor(props: Props) {
        super(props);

        const metaData = this.props.metaDataStage;
        this.id = metaData.id;

        this.resolveStateContainerId = this.resolveStateContainerId.bind(this);
    }

    resolveStateContainerId() {
        return this.id;
    }

    render() {
        const { metaDataStage } = this.props;

        const metaDataSectionsAsArray = Array.from(metaDataStage.sections.entries()).map(entry => entry[1]);

        const sections = metaDataSectionsAsArray.map(section => (
            <D2Section
                key={section.id}
                sectionMetaData={section}
                getStateContainerId={this.resolveStateContainerId}
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
