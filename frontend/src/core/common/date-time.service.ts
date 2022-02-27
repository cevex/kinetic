import moment from 'moment';

export class DateTimeService {
    public static getNow(): Date {
        return moment().toDate();
    }

    public static equals(date1: Date, date2: Date): boolean {
        return moment(date1.toString()).isSame(moment(date2.toString()));
    }

    public static durationAsDayRounded(date1: Date, date2: Date): number {
        return moment(date1.toString())
            .startOf('day')
            .diff(moment(date2.toString()).startOf('day'), 'day');
    }

    public static formatDayDuration(date1: Date, date2: Date): string {
        const duration = this.durationAsDayRounded(date1, date2);
        if (duration > 0) {
            if (duration < 2) return "aujourd'hui";
            if (duration < 3) return 'demain';
            if (duration < 4) return 'après demain';
            else return ' dans ' + Math.round(duration) + ' jours';
        } else {
            if (duration > -2) return "aujourd'hui";
            if (duration > -3) return 'hier';
            if (duration > -4) return 'avant hier';
            else return ' il y a ' + Math.round(duration) + ' jours';
        }
    }
}
