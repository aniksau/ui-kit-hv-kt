import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types/employees";

interface EmployeeList {
    employeeList: Employee[];
}

const initialState: EmployeeList = { employeeList: [] };

export const employeeListSlice = createSlice({
    name: 'employeeList',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employeeList = action?.payload;
        },
        setNewEmployee: (state, action: PayloadAction<Employee>) => {
            state?.employeeList?.push(action?.payload);
        },
        setEditedEmployee: (state, action: PayloadAction<Employee>) => {
            const indexToEdit = state
                ?.employeeList
                ?.findIndex(employee => employee?.id === action?.payload?.id);
            state.employeeList[indexToEdit] = action?.payload;
        }
    }
});

export const {
    setEmployees,
    setEditedEmployee,
    setNewEmployee
} = employeeListSlice.actions;
export default employeeListSlice.reducer;