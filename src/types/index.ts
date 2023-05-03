export type LineItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    swatchColor: string;
    swatchTitle: string;
    estimatedDeliveryDate?: string;
}

export type DeliveryDate = {
    postal: string;
    ids: number[];
    estimatedDeliveryDate: string;
}