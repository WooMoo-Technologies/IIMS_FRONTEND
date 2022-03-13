const TABLE_PAGE_SIZES = [ 10, 25, 50];
const DEBOUNCE_TIME = 1000;

export class SystemConfig {
  static getPageSizes(): number[] {
    return TABLE_PAGE_SIZES;
  }
  static  getDebounceTime(): number {
    return DEBOUNCE_TIME;
  }
}


