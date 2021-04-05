import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Status, StatusEnum, User } from './model';

export interface AppState {
  //  isBusy: boolean;
  //  user: User;
}

export const initialState: AppState = {
  // isBusy: false,
  // user: {
  //   firstname: 'Nadji',
  //   lastname: 'BABARI',
  //   email: 'nadji.babari@gmail.com',
  // }
};

export const appState: ActionReducerMap<AppState> = {};
