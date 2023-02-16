export interface IPagination {
    page: Number,
    cant: Number,
    totalPages: Number,
    lastPage: Number    
}

export interface IPaginationExtended extends IPagination {
    first: () => void,
    last: () => void,
    prev: (page: Number) => void,
    next: (page: Number) => void
}