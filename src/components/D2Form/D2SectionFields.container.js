// @flow
import { connect } from 'react-redux';
import D2SectionFields from './D2SectionFields.component';

const mapStateToProps = (state: Object, props: { getStateContainerId: () => void }) => ({
    values: {},
});

const mapDispatchToProps = (dispatch: disp)