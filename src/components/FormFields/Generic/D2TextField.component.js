// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import gotoFn from '../Utils/gotoMixin';

type Props = {
    label: string,
    labelIsFloating: boolean
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

    render() {
        const { label, labelIsFloating, ...passOnProps } = this.props;

        const builtProps = Object.assign({}, this.buildLabelProps());
        const accProps = { ...passOnProps, ...builtProps };
        return (
            <div ref={(containerInstance) => { this.materialUIContainerInstance = containerInstance; }}>
                <TextField
                    ref={(inst) => { this.materialUIInstance = inst; }}
                    {...accProps}
                />
            </div>
        );
    }
}

export default D2TextField;
