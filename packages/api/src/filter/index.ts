import { filter, filterFunc } from "./types"

export class Filter {
    filter: filter
    filterFunc: filterFunc
    constructor(filter: filter, filterFunc: filterFunc) {
        this.filter = filter
        this.filterFunc = filterFunc
    }
}
