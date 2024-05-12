import { createSelector } from '@ngrx/store';
import { AppState } from './user.reducer';

export const selectUsers = (state: AppState) => state.users;

export const selectUserById = (id: number) =>
  createSelector(selectUsers, users => users.find(user => user.id == id));