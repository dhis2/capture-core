// @flow
import * as React from 'react';

type Event = {
    target: {
        value: any,
    }
};
type Props = {
    onBlur: (event: Event) => void,
    onChange: (event: Event) => void,
    changeEvent: string,
    errorStyle: ?string,
    errorText: ?string
};

export default () =>
    (InnerComponent: React.ComponentType<any>) =>
        class FormBuilderInterfaceBuilder extends React.Component<Props> {
            handleBlur: (value: any) => void;
            handleChange: (value: any) => void;

            static getEvent(value: any) {
                return {
                    target: {
                        value,
                    },
                };
            }

            constructor(props: Props) {
                super(props);
                this.handleBlur = this.handleBlur.bind(this);
                this.handleChange = this.handleChange.bind(this);
            }

            handleChange(value: any) {
                const onChange = this.props.onChange;
                onChange(FormBuilderInterfaceBuilder.getEvent(value));
            }

            handleBlur(value: any) {
                const onBlur = this.props.onBlur;
                onBlur(FormBuilderInterfaceBuilder.getEvent(value));
            }
            
            render() {
                const { onBlur, onChange, changeEvent, errorStyle, errorText, ...passOnProps } = this.props;

                return (
                    <InnerComponent
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        {...passOnProps}
                    />
                );
            }
        };
