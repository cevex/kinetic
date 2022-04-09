import moment from 'moment';

export class DateTimeService {
    public static getNow(): Date {
        return moment().toDate();
        // return moment().add(2, 'day').toDate();
    }

    public static getTodayStart(): Date {
        return this.toStartOfDay(this.getNow());
    }

    // =======================================================================
    //               Control
    // =======================================================================

    public static equalsUTC(dateUtc1: string, dateUtc2: string): boolean {
        return moment(dateUtc1).isSame(moment(dateUtc2));
    }

    public static equals(date1: Date, date2: Date): boolean {
        return moment(date1.toISOString()).isSame(moment(date2.toISOString()));
    }

    public static isInPast(date1: Date): boolean {
        return this.isBefore(date1, this.getNow());
    }

    public static isInFuture(date1: Date): boolean {
        return this.isAfter(date1, this.getNow());
    }

    public static isBefore(date1: Date, date2: Date): boolean {
        return moment(date1.toISOString()).isBefore(moment(date2.toISOString()));
    }

    public static isAfter(date1: Date, date2: Date): boolean {
        return moment(date1.toISOString()).isAfter(moment(date2.toISOString()));
    }

    // =======================================================================
    //               Transform
    // =======================================================================

    public static toStartOfDay(date1: Date): Date {
        return moment(date1.toISOString()).startOf('day').toDate();
    }

    // =======================================================================
    //               Duration
    // =======================================================================

    public static durationAsDayRounded(date1: Date, date2: Date): number {
        return moment(date1.toISOString())
            .startOf('day')
            .diff(moment(date2.toISOString()).startOf('day'), 'day');
    }

    public static formatDayDuration(date1: Date, date2: Date): string {
        const duration = this.durationAsDayRounded(date1, date2);
        if (duration > 0) {
            if (duration < 1) return "aujourd'hui";
            if (duration < 2) return 'demain';
            if (duration < 3) return 'après demain';
            else return ' dans ' + Math.round(duration) + ' jours';
        } else {
            if (duration > -1) return "aujourd'hui";
            if (duration > -2) return 'hier';
            if (duration > -3) return 'avant hier';
            else return ' il y a ' + Math.round(duration) + ' jours';
        }
    }
}
