// @flow
import * as React from 'react';
import log from 'loglevel';
import Button from 'material-ui-next/Button';
import { connect } from 'react-redux';

import D2Form from '../D2Form/D2Form.component';
import errorCreator from '../../utils/errorCreator';
import { getTranslation } from '../../d2/d2Instance';
import { formatterOptions } from '../../utils/string/format.const';
import { startSaveEvent, saveValidationFailed } from './actions/dataEntry.actions';

type Props = {
    classes: Object,
    eventId: string,
    onSaveEvent: (eventId: string, id: string) => void,
    onSaveValidationFailed: (eventId: string, id: string) => void,
    saveAttempted?: ?boolean,
    id: string
};

type Options = {
    buttonStyle?: ?Object,
    color?: ?string,
};

type OptionFn = (props: Props) => Options;

const getSaveButton = (InnerComponent: React.ComponentType<any>, optionFn?: ?OptionFn) =>
    class SaveButtonBuilder extends React.Component<Props> {
        static errorMessages = {
            INNER_INSTANCE_NOT_FOUND: 'Inner instance not found',
            FORM_INSTANCE_NOT_FOUND: 'Form instance not found',
        };

        innerInstance: any;
        handleSaveAttempt: () => void;
        constructor(props: Props) {
            super(props);
            this.handleSaveAttempt = this.handleSaveAttempt.bind(this);
        }

        getWrappedInstance() {
            return this.innerInstance;
        }

        getFormInstance() {
            let currentInstance = this.innerInstance;
            let done;
            while (!done) {
                currentInstance = currentInstance.getWrappedInstance && currentInstance.getWrappedInstance();
                if (!currentInstance || currentInstance instanceof D2Form) {
                    done = true;
                }
            }
            return currentInstance;
        }

        handleSaveAttempt() {
            if (!this.innerInstance) {
                log.error(errorCreator(SaveButtonBuilder.errorMessages.INNER_INSTANCE_NOT_FOUND)({ SaveButtonBuilder: this }));
                return;
            }

            const formInstance = this.getFormInstance();
            if (!formInstance) {
                log.error(errorCreator(SaveButtonBuilder.errorMessages.FORM_INSTANCE_NOT_FOUND)({ SaveButtonBuilder: this }));
                return;
            }

            const valid = formInstance.validateForm();
            if (valid) {
                this.props.onSaveEvent(this.props.eventId, this.props.id);
            } else {
                this.props.onSaveValidationFailed(this.props.eventId, this.props.id);
            }
        }

        render() {
            const { eventId, onSaveEvent, onSaveValidationFailed, ...passOnProps } = this.props;
            const options = optionFn ? optionFn(this.props) : {};

            if (!eventId) {
                return null;
            }

            return (
                <InnerComponent
                    ref={(innerInstance) => { this.innerInstance = innerInstance; }}
                    saveButton={
                        <Button
                            raised
                            onClick={this.handleSaveAttempt}
                            color={options.color || 'primary'}
                        >
                            { getTranslation('save', formatterOptions.CAPITALIZE_FIRST_LETTER) }
                        </Button>
                    }
                    {...passOnProps}
                />

            );
        }
    };

const mapStateToProps = (state: ReduxState, props: { id: string }) => ({
    eventId: state.dataEntry && state.dataEntry[props.id] && state.dataEntry[props.id].eventId,
    saveAttempted: state.dataEntry && state.dataEntry[props.id] && state.dataEntry[props.id].saveAttempted,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
    onSaveEvent: (eventId: string, id: string) => {
        dispatch(startSaveEvent(eventId, id));
    },
    onSaveValidationFailed: (eventId: string, id: string) => {
        dispatch(saveValidationFailed(eventId, id));
    },
});

export default (optionFn?: ?OptionFn) =>
    (InnerComponent: React.ComponentType<any>) =>
        connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(getSaveButton(InnerComponent, optionFn));
