import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IProduct } from '../../products/product.model';

export const SET_PERSONS = '[PERSONS] Set';

export class SetPersons implements Action {
    readonly type = SET_PERSONS;

    constructor(public payload: IProduct[]) {}
}


export type Actions = SetPersons;
