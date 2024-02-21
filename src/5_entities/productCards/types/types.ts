import { IComment } from "5_entities/comments";
import { IFilterItem } from "5_entities/filter";

export interface IGetProductsBody {
    filters: IFilter[];
    priceRange?: { from: number, to: number };
    sortBy?: 'cheap' | 'expensive' | 'rank' | 'recently-created' | 'long-created';
    isNew?: boolean;
    inStock?: boolean;
    isPromotion?: boolean;
    isBestseller?: boolean;
    isRecommended?: boolean;
    count: number;
    page: number;
    term?: string;
    categoryId?: string;
}

interface IFilter {
    id: string;
    items: string[];
}

export interface IGetProductsResponse {
    items: IProductCard[];
    count: number;
    lowestPrice: number;
    highestPrice: number;
}

export interface IProductCard {
    id: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew: boolean;
    inStock: boolean;
    isPromotion: boolean;
    isBestseller: boolean;
    isRecommended: boolean;
    shortDescription: string;
    description: string;
    createdAt: Date;
    rating: number;
    categoryId: string;
    images: IProductImage[];
    features: IProductFeature[];
    comments: IComment[];
    filterItems: IFilterItem[];
}

interface IProductImage {
    id: string;
    url: string;
    isMain: boolean;
    productCardId: string;
}

interface IProductFeature {
    id: string;
    title: string;
    value: string;
    productCardId: string;
}

export interface IUpdateProductBody {
    title?: string;
    price?: number;
    oldPrice?: number;
    isNew?: boolean;
    inStock?: boolean;
    isPromotion?: boolean;
    isBestseller?: boolean;
    isRecommended?: boolean;
    shortDescription?: string;
    description?: string;
}