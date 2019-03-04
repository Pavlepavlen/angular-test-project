import { IProduct } from './products/product.model';


export interface AppState {
    readonly products: IProduct[];
}
