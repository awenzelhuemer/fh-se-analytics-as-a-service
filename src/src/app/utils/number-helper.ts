import { Interval } from "../models/interval";

export class NumberHelper {

    static getIntervalString(value: Interval) {
        return `${NumberHelper.format(value.hours)}:${NumberHelper.format(value.minutes)}:${NumberHelper.format(value.seconds)}`;
    }

    static getIntervalData(value: string) {

        if (!value) {
            return <Interval>{ hours: 0, minutes: 0, seconds: 0 };
        }

        const tokens = value.split(':');
        return <Interval>{ hours: +tokens[0], minutes: +tokens[1], seconds: +tokens[2] };
    }

    static format(value: number) {
        return value.toLocaleString('de-AT', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    }
}