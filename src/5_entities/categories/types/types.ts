import { IFilterBlock } from "5_entities/filter";

export interface ICategory {
    id: string;
    title: string;
    filters: IFilterBlock[]
}