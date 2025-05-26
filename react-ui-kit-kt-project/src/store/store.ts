import { configureStore } from "@reduxjs/toolkit";
import employeeListReducer from './employeeListSlice';
import employeeToEditReducer from './employeeToEditSlice';

export const store = configureStore(
    {
        reducer: {
            employeeList: employeeListReducer,
            employeeToEdit: employeeToEditReducer
        }
    }
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch