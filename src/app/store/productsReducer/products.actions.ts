import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.model';

export const SET_PRODUCTS = '[PRODUCTS] Set';
export const FILTER_PRODUCTS = '[PRODUCTS] Filter';
export const COPY_PRODUCTS = '[PRODUCTS] Copy';
export const CHOOSE_PRODUCT = '[PRODUCTS] Choose';
export const GET_PRODUCTS = '[PRODUCTS] Get';
export const GET_PRODUCTS_SUCCESS = '[PRODUCTS] Get success';
export const GET_PRODUCTS_FAILED = '[PRODUCTS] Get failed';
export const CREATE_CATEGORY_LIST = '[PRODUCTS] Create category';
export const CHOOSE_CATEGORY = '[PRODUCTS] Choose category';

export class GetProducts implements Action {
    readonly type = GET_PRODUCTS;

    constructor() {}
}
export class GetProductsSuccess implements Action {
    readonly type = GET_PRODUCTS_SUCCESS;

    constructor(public payload: IProduct[]) {}
}
export class GetProductsFailed implements Action {
    readonly type = GET_PRODUCTS_FAILED;

    constructor(public payload: IProduct[]) {}
}

export class CopyProducts implements Action {
    readonly type = COPY_PRODUCTS;
}

export class ChooseProduct implements Action {
    readonly type = CHOOSE_PRODUCT;

    constructor(public payload: IProduct) {}
}

export class FilterProducts implements Action {
    readonly type = FILTER_PRODUCTS;

    constructor(public payload: string = '') {}
}

export class CreateCategoriesList implements Action {
    readonly type = CREATE_CATEGORY_LIST;

    constructor(public payload: string[]) {}
}

export class ChooseCategory implements Action {
    readonly type = CHOOSE_CATEGORY;

    constructor(public payload: string) {}
}


export type Actions =
    FilterProducts |
    CopyProducts | ChooseProduct |
    GetProducts |
    GetProductsSuccess |
    GetProductsFailed |
    CreateCategoriesList |
    ChooseCategory;
