// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui-next/styles';
import { FormControl } from 'material-ui-next/Form';
import { InputLabel } from 'material-ui-next/Input';

import D2Date from '../D2Date/D2Date.component';
import D2TextField from '../../Generic/D2TextField.component';

type Value = {
    date?: ?string,
    time?: ?string,
};

type Props = {
    onBlur: (value: ?Value, options: Object) => void,
    onChange: (value: ?Value) => void,
    value: Value,
    dateWidth: number,
    calendarWidth?: ?number,
    label: string,
    disabled?: ?boolean,
    required?: ?boolean,
    classes: Object,
};

type State = {
    inFocus: boolean,
};

const styles = theme => ({
    fieldsContainer: {
        display: 'flex',
        paddingTop: 12,
    },
    dateContainer: {
        paddingRight: theme.spacing.unit,
    },
    labelInFocus: {
        color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light'],
    },
    formControl: {
        width: '100%',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    root: {
        position: 'relative',
    },
});

class D2DateTime extends Component<Props, State> {
    static defaultProps = {
        value: {},
    };

    handleTimeChange: (timeValue: string) => void;
    handleDateChange: (dateValue: string) => void;
    handleTimeBlur: (timeValue: string) => void;
    handleDateBlur: (dateValue: string) => void;
    handleFocus: () => void;
    touchedFields: Set<string>;
    inFocusLabelClasses: Object;

    constructor(props: Props) {
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeBlur = this.handleTimeBlur.bind(this);
        this.handleDateBlur = this.handleDateBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this.state = { inFocus: false };
        this.touchedFields = new Set();
        this.inFocusLabelClasses = {
            root: this.props.classes.labelInFocus,
        };
    }

    handleTimeChange(timeValue: string) {
        this.props.onChange({
            time: timeValue,
            date: this.props.value.date,
        });
    }

    handleDateChange(dateValue: string) {
        this.props.onChange({
            time: this.props.value.time,
            date: dateValue,
        });
    }

    handleTimeBlur(timeValue: string) {
        this.touchedFields.add('timeTouched');
        this.handleBlur({
            time: timeValue,
            date: this.props.value.date,
        });
    }

    handleDateBlur(dateValue: string) {
        this.touchedFields.add('dateTouched');
        this.handleBlur({
            time: this.props.value.time,
            date: dateValue,
        });
    }

    handleBlur(value: Value) {
        this.setState({ inFocus: false });

        const onBlur = this.props.onBlur;
        const touched = this.touchedFields.size === 2;
        if (!value.date && !value.time) {
            onBlur(undefined, {
                touched,
            });
            return;
        }

        onBlur(value, {
            touched,
        });
    }

    handleFocus() {
        this.setState({ inFocus: true });
    }

    render() {
        const { value, dateWidth, calendarWidth, label, required, disabled, classes } = this.props;
        const { inFocus } = this.state;
        const dateValue = value.date;
        const timeValue = value.time;

        return (
            <div
                className={classes.root}
            >
                <FormControl component="fieldset" className={classes.formControl}>
                    <InputLabel
                        shrink
                        disabled={disabled}
                        required={required}
                        classes={inFocus ? this.inFocusLabelClasses : null}
                    >
                        {label}
                    </InputLabel>
                </FormControl>

                <div
                    className={classes.fieldsContainer}
                >
                    <div
                        className={classes.dateContainer}
                    >
                        <D2Date
                            value={dateValue}
                            width={dateWidth}
                            calendarWidth={calendarWidth}
                            onChange={this.handleDateChange}
                            onBlur={this.handleDateBlur}
                            onFocus={this.handleFocus}
                            placeholder="Date"
                        />
                    </div>
                    <D2TextField
                        value={timeValue}
                        onChange={this.handleTimeChange}
                        onBlur={this.handleTimeBlur}
                        onFocus={this.handleFocus}
                        placeholder="Time"
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(D2DateTime);
