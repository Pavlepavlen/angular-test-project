import { Action, ActionReducerMap } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.model';
import * as ProductsActions from './products.actions';
import { CategoryService } from '../../shared/category.service';
import { store } from '@angular/core/src/render3';

const initialState = {
    isLoading: false,
    isLoadSuccess: false,
    initialProducts: [],
    filteredProducts: [],
    choosenProduct: null,
    categories: [],
    searchInputValue: '',
    selectedCategory: null
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
            let categories;
            const tempList = [];

            action.payload.forEach((element, index) => {
                tempList[index] = element.bsr_category;
            });

            categories = tempList.filter((cat, index, arr) => index === arr.indexOf(cat));
            categories.unshift('Show All');

            return {
                ...state,
                isLoading: false,
                isLoadSuccess: true,
                initialProducts: action.payload,
                filteredProducts: action.payload,
                categories
            };
        }

        case ProductsActions.GET_PRODUCTS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoadSuccess: false,
            };
        }

        case ProductsActions.CREATE_CATEGORY_LIST: {
            return {
                ...state,
                categories: action.payload
            };
        }

        case ProductsActions.CHOOSE_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.payload
            };
        }

        case ProductsActions.COPY_PRODUCTS:
            const products = state.initialProducts.filter(item => {
                if (state.selectedCategory === 'Show All') {
                    return item;
                }
                return item.bsr_category === state.selectedCategory;
            });
            return {
                ...state,
                filteredProducts: products
            };

        case ProductsActions.CHOOSE_PRODUCT: {
            return {
                ...state,
                choosenProduct: action.payload
            };
        }

        case ProductsActions.FILTER_PRODUCTS: {
            const inputValue = action.payload;

            let filteredProducts = state.initialProducts.filter(item => {
                if (state.selectedCategory === 'Show All') {
                    return item;
                }
                return item.bsr_category === state.selectedCategory;
            });

            filteredProducts = filteredProducts.filter(item => {
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


