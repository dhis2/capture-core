// @flow
import moment from '../moment/momentResolver';

export default function isValidDate(value: string) {
    const dateString = value;
    const momentDate = moment(dateString, 'L');
    return momentDate.isValid();
}
