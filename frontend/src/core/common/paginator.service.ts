export class PaginatorService {
    public static incrementIndex(list: any[], index: number): number {
        if (this.isLastIndex(list, index)) return 0;
        return index + 1;
    }

    public static decrementIndex(index: number): number {
        if (this.isFirstItem(index)) return index;
        return index - 1;
    }

    public static isFirstItem(index: number) {
        return !index || index === 0;
    }

    public static isLastIndex(list: any[], index: number) {
        return index === list.length - 1;
    }
}
