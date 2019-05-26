export interface Comment {
    username: string,
    email: string,
    rating: number,
    comment: string
}

export interface Product {
    name: string,
    type: string,
    price: number,
    deliver: number,
    available: number,
    offer: number,
    id: string | number,
    image: string,
    tags: string[],
    origin?: string,
    quant?: number,
    unit?: string,
    comments?: Comment[]
}
