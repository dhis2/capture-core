// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import gotoFn from '../Utils/gotoMixin';

type UiEvent = {
    target: {
        value: string
    }
};

type Props = {
    label: string,
    labelIsFloating: boolean,
    onChange: (value: string) => void,
    onBlur: (value: string) => void,
};

class D2TextField extends Component<Props> {
    static defaultProps = {
        value: '',
    };
    // goto: () => void;
    materialUIInstance: any;
    materialUIContainerInstance: any;

    constructor(props: propsTypes) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        // this.goto = gotoFn;        
    }

    buildLabelProps() {
        const { label, labelIsFloating } = this.props;

        if (!label) {
            return null;
        }

        return (labelIsFloating ?
            {
                floatingLabelText: label,
            } :
            {
                hintText: label,
            }
        );
    }

    handleChange(event: UiEvent) {
        this.props.onChange(event.target.value);
    }

    handleBlur(event: UiEvent) {
        this.props.onBlur(event.target.value, event);
    }

    render() {
        const { label, labelIsFloating, ...passOnProps } = this.props;

        const builtProps = Object.assign({}, this.buildLabelProps());
        const accProps = { ...passOnProps, ...builtProps };
        return (
            <div ref={(containerInstance) => { this.materialUIContainerInstance = containerInstance; }}>
                <TextField
                    ref={(inst) => { this.materialUIInstance = inst; }}
                    {...accProps}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

export default D2TextField;
