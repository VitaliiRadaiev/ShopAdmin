export interface IOrder {
    id: number;
    createdAt: Date;
    status: OrderStatuses;
    delivery: string;
    deliveryFullAddress: string;
    paymentMethod: string;
    totalPrice: number;
    user: {
        id: string;
        isIdentified: boolean;
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
    },
    recipient: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    },
    products: IOrderProduct[]
}

interface IOrderProduct {
    id: string;
    count: number;
    product: IProductCard
}


interface IProductCard {
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
}

interface IProductImage {
    id: string;
    url: string;
    isMain: boolean;
    productCardId: string;
}

export type OrderStatuses = 'processed' | 'delivering' | 'canceled' | 'done';

export interface IGetOrdersBody {
    status?: OrderStatuses;
    count: number;
    page: number;
}

export interface IGetOrdersResponse {
    items: IOrder[];
    count: number;
}