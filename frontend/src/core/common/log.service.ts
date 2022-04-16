import { DateTimeService } from './date-time.service';

export class Logger {
    public static warn(printable?: any, value?: any) {
        console.warn(this.getMessage(printable, value));
    }

    public static error(printable?: any, value?: any) {
        console.error(this.getMessage(printable, value));
    }

    public static log(printable?: any, value?: any) {
        console.log(this.getMessage(printable, value));
    }

    private static getMessage(printable?: any, value?: any): string {
        const valueStr = value ? ' =>' + JSON.stringify(value, null, 2) : '';
        const now = DateTimeService.getNow().toISOString().trim();
        return '[' + now + '] ' + printable + valueStr;
    }
}
