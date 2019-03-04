import { Action } from '@ngrx/store';
import { IProduct } from '../../products/product.model';
import * as ProductsActions from './products.actions';


const initialState: IProduct = null;

export function productsReducer(state: IProduct[] = [initialState], action: ProductsActions.Actions) {
    switch (action.type) {
        case ProductsActions.SET_PERSONS:
            return action.payload;
        default:
            return state;
    }
}


