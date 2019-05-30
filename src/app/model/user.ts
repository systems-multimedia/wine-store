import { Product } from './product';

export interface User {
    name: string,
    lname: string,
    uid: string,
    email: string,
    username: string,
    password?: string,
    order?: Array<{
        product: Product,
        quant: number
    }>,
    wishList?: Product[]
}
