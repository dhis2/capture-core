// @flow
import React, { Component } from 'react';
import TextField from 'material-ui-next/TextField';
// import gotoFn from '../Utils/gotoMixin';

type Props = {
    label: string,
    onChange: (value: string, event: UiEventData) => void,
    onBlur: (value: string, event: UiEventData) => void,
};

class D2TextField extends Component<Props> {
    static defaultProps = {
        value: '',
    };
    // goto: () => void;
    materialUIInstance: any;
    materialUIContainerInstance: any;
    handleChange: (event: UiEventData) => void;
    handleBlur: (event: UiEventData) => void;

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        // this.goto = gotoFn;        
    }

    handleChange(event: UiEventData) {
        this.props.onChange(event.target.value, event);
    }

    handleBlur(event: UiEventData) {
        this.props.onBlur(event.target.value, event);
    }

    render() {
        const { onChange, onBlur, ...passOnProps } = this.props;

        return (
            <div ref={(containerInstance) => { this.materialUIContainerInstance = containerInstance; }}>
                <TextField
                    inputRef={(inst) => { this.materialUIInstance = inst; }}
                    {...passOnProps}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

export default D2TextField;
