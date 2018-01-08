// @flow
import { connect } from 'react-redux';
import D2SectionFields from './D2SectionFields.component';
import { updateField } from './D2SectionFields.actions';

const mapStateToProps = (state: Object, props: { getContainerId: () => string }) => ({
    values: state.formsValues[props.getContainerId()],
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
    onUpdateField: (containerId: string, elementId: string, value: any) => {
        dispatch(updateField(containerId, elementId, value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(D2SectionFields);
