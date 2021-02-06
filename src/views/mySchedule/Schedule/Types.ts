type TItemDetail = {
    lastDateReview: string,
    nextReview: string,
    color: string,
    state: string,
    nextIsToday: boolean
}

export type TItem = {
    _id: string,
    title: string,
    description: string,
    detail: TItemDetail,
    iconName: string,
    level: string,
}

export type TNext = {
    _id: string,
    title: string,
    description: string,
    detail: TItemDetail,
    item: TItem,
    revisions: string
} 