// @flow
import React, { Component } from 'react';
import Section from '../Section/Section.component';
import SectionHeaderSimple from '../Section/SectionHeaderSimple.component';
import FontIcon from 'material-ui/FontIcon';

import D2SectionFields from './D2SectionFields.component';

import MetaDataSection from '../../metaData/Stage/Section';

type Props = {
    sectionMetaData: MetaDataSection,
};

class D2Section extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderSectionHeader() {
        const title = this.props.sectionMetaData.name;

        return (
            <SectionHeaderSimple
                title={title}
            />
        );
    }

    render() {
        const { sectionMetaData } = this.props;

        if (!sectionMetaData.showContainer) {
            return (
                <D2SectionFields
                    fieldsMetaData={sectionMetaData.elements}
                />
            );
        }
        return (
            <div>
                <Section
                    header={this.renderSectionHeader()}
                    elevation={2}
                >
                    <D2SectionFields
                        fieldsMetaData={sectionMetaData.elements}
                    />
                </Section>
            </div>
        );
    }
}

D2Section.propTypes = {
};

export default D2Section;
