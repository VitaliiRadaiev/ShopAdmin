export interface IFilterBlock {
    id: string;
    categoryId: string;
    title: string;
    items: IFilterItem[];
}

export interface IFilterItem {
    id: string;
    filterBlockId: string;
    title: string
}