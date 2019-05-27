import { Product } from './product';

export interface User {
    name: string,
    lname: string,
    uid: string,
    email: string,
    username: string,
    password?: string,
    products?: Product[],
    wishList?: Product[]
}
