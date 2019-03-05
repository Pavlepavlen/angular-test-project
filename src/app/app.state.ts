import { IProduct } from './interfaces/product.model';


export interface AppState {
    readonly products: IProduct[];
}
