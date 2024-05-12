import { User } from "../models/user.model";
import { addUser, updateUser, deleteUser } from "./user.actions";


export interface AppState {
  users: User[];
}

export const initialState: AppState = {
  users: []
};

export function userReducer(state = initialState, action: any): AppState {
   switch (action.type) {
     case addUser.type:
       return { ...state, users
 
 : [...state.users, action.user] };
     case updateUser.type:
       return {
         ...state,
         users: state.users.map(user => (user.id == action.user.id ? action.user : user))
       };
     case deleteUser.type:
       return { ...state, users: state.users.filter(user => user.id != action.id) };
     default:
       return state;
   }
 }