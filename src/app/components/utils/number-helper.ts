export class NumberHelper{
    static format(value: number) {
        return value.toLocaleString('de-AT', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
    }
}