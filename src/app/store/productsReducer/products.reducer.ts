import { Action, ActionReducerMap } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.model';
import * as ProductsActions from './products.actions';
import { CategoryService } from '../../shared/category.service';

const initialState = {
    isLoading: false,
    isLoadSuccess: false,
    initialProducts: [],
    filteredProducts: [],
    choosenProduct: null,
    categories: [],
    searchInputValue: ''
};

export function productsReducer(state = initialState, action: ProductsActions.Actions) {
    switch (action.type) {

        case ProductsActions.GET_PRODUCTS: {
            return {
                ...state,
                isLoading: true,
                isLoadSuccess: false,
            };
        }

        case ProductsActions.GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoadSuccess: true,
                initialProducts: action.payload,
                filteredProducts: action.payload,
            };
        }

        case ProductsActions.GET_PRODUCTS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoadSuccess: false,
            };
        }

        case ProductsActions.COPY_PRODUCTS:
            return {
                ...state,
                filteredProducts: state.initialProducts
            };

        case ProductsActions.CHOOSE_PRODUCT: {
            return {
                ...state,
                choosenProduct: action.payload
            };
        }

        case ProductsActions.FILTER_PRODUCTS: {
            const inputValue = action.payload;

            const filteredProducts = state.initialProducts.filter(item => {
                return !item.name.toLowerCase().indexOf(inputValue.toLowerCase());
            });

            return {
                ...state,
                filteredProducts,
                searchInputValue: inputValue
            };
        }

        default:
            return state;
    }
}


