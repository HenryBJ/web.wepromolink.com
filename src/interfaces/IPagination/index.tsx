export interface IPagination {
    page: Number,
    cant: Number,
    totalPages: Number,
    first: () => void,
    last: () => void,
    prev: (page: Number) => void,
    next: (page: Number) => void
}