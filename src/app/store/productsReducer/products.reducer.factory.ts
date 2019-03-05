import { Action, ActionReducerMap } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.model';
import * as ProductsActions from './products.actions';
import * as productsReducer from './products.reducer';

export interface ProductsState {
    isLoading: boolean;
    isLoadSuccess: boolean;
    initialProducts: IProduct[];
    filteredProducts: IProduct[];
    choosenProduct: IProduct;
    categories: string[];
    searchInputValue: string;
}

export interface AppStates {
    productsState: ProductsState;
}

export const productsReducers: ActionReducerMap<AppStates> = {
    productsState: productsReducer.productsReducer
};
