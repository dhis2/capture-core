// @flow
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withStyles } from 'material-ui-next/styles';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';

import moment from '../../../../utils/moment/momentResolver';
import 'react-infinite-calendar/styles.css';
import CurrentLocaleData from '../../../../utils/localeData/CurrentLocaleData';

// import makeMaxWidthContainer from 'abaris-ui/src/HOC/makeMaxWidthContainer';

type Props = {
    onDateSelected: (value: any) => void,
    value?: ?Array<string>,
    minMoment?: ?Object,
    maxMoment?: ?Object,
    currentWidth: number
};

const styles = theme => ({
    container: '5px',

});

class D2DateCalendar extends Component<Props> {
    static displayOptions = {
        showHeader: false,
    };

    handleChange: (e: any, dates: ?Array<Date>) => void;
    calendarLocaleData: Object;

    constructor(props: propsTypes) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        const projectLocaleData = CurrentLocaleData.get();
        const currentWidth = this.props.currentWidth;

        this.calendarLocaleData = {
            locale: projectLocaleData.dateFnsLocale,
            headerFormat: currentWidth >= 400 ? projectLocaleData.calendarFormatHeaderLong : projectLocaleData.calendarFormatHeaderShort,
            weekdays: projectLocaleData.weekDays,
            blank: projectLocaleData.selectDatesText,
            todayLabel: {
                long: projectLocaleData.todayLabelLong,
                short: projectLocaleData.todayLabelShort,
            },
            weekStartsOn: projectLocaleData.weekStartsOn,
        };
    }

    shouldComponentUpdate(nextProps: propsTypes) {
        // Selecting multiple dates, then updating the props to the infiniteCalendar makes the Component "jump" back to the first selected date
        if (nextProps.currentWidth !== this.props.currentWidth) {
            const projectLocaleData = CurrentLocaleData.get();
            if (nextProps.currentWidth < 400) {
                this.calendarLocaleData.headerFormat = projectLocaleData.calendarFormatHeaderShort;
            } else {
                this.calendarLocaleData.headerFormat = projectLocaleData.calendarFormatHeaderLong;
            }
            return true;
        }
        return false;
    }

    handleChange(changeDate: Date) {
        const changeDateInLocalFormat = moment(changeDate).format('L');
        this.props.onDateSelected(changeDateInLocalFormat);
    }

    getValue(inputValue: ?string) {
        if (!inputValue) {
            return null;
        }
        const outputDate = moment(inputValue, 'L').toDate();
        return outputDate;
    }

    getMinMaxProps() {
        const minMaxProps: {min?: Date, minDate?: Date, max?: Date, maxDate?: Date} = {};

        const minMoment = this.props.minMoment;
        const maxMoment = this.props.maxMoment;

        if (minMoment) {
            const minDate = minMoment.toDate();
            minMaxProps.min = minDate;
            minMaxProps.minDate = minDate;
        }

        if (maxMoment) {
            const maxDate = maxMoment.toDate();
            minMaxProps.max = maxDate;
            minMaxProps.maxDate = maxDate;
        }
        return minMaxProps;
    }

    render() {
        const { value, classes, currentWidth } = this.props;

        return (
            <div
                className={classes.container}
            >
                <InfiniteCalendar
                    {...this.getMinMaxProps()}
                    selected={this.getValue((value))}
                    onSelect={this.handleChange}
                    locale={this.calendarLocaleData}
                    width={currentWidth}
                    displayOptions={D2DateCalendar.displayOptions}
                    height={350}
                    autoFocus={false}
                />
            </div>
        );
    }
}

export default withStyles()(D2DateCalendar);

// const DateMultiInMaxWidthContainer = makeMaxWidthContainer(400)(DateMulti);
// theme={DateMulti.calendarTheme}
// export default DateMultiInMaxWidthContainer;
