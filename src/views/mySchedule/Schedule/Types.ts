type TItemDetail = {
    lastDateReview: string,
    nextReview: string,
    color: string,
    state: string,
}

export type TItem = {
    title: string,
    description: string,
    detail: TItemDetail,
    iconName: string,
}