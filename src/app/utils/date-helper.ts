export class DateHelper {
    static toIsoString(value?: Date): string {
        return value?.toISOString() ?? "";
    }
}