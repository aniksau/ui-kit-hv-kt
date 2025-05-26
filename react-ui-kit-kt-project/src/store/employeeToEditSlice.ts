import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types/employees";

interface TargetEmployee {
    targetEmployee: Employee;
}

const initialState: TargetEmployee = {
    targetEmployee: {} as Employee
};

export const employeeToEditSlice = createSlice({
    name: 'employeeToEdit',
    initialState,
    reducers: {
        setEmployeeToEdit: (state, action: PayloadAction<Employee>) => {
            state.targetEmployee = action.payload;
        },
        resetEmployeeToEdit: (state) => {
            state = initialState;
        }
    }
});

export const { setEmployeeToEdit, resetEmployeeToEdit } = employeeToEditSlice.actions;
export default employeeToEditSlice.reducer;