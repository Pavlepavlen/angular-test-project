import { IProduct } from './product.model';

export interface IProducts {
        count_products: number;
        page_count: number;
        products: IProduct[];
        page: number;
}
