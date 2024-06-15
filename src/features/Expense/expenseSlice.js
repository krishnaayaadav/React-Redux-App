
import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenseData, addNewExpense } from "../../services/expense";


const expenseInitialState = {
    expenseItems: [],
    isError: null,
    isSuccess: null,
    isLoading: null,
    status: 'idle',
    message: ''
}

const expenseSlice = createSlice({

    name: 'expense',
    initialState: expenseInitialState,

    extraReducers: (builder) => {

        // get all expenses
        builder.addCase(getAllExpenseData.pending, (state) => {
            state.isLoading = true;
        } )

        .addCase(getAllExpenseData.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.expenseItems = action.payload;
            state.status = 'loaded';

        })

        .addCase( getAllExpenseData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = action.error.message;

            
        } )

        // add new expense
        .addCase(addNewExpense.fulfilled, (state, action) => {
            // update expense data once data inserted successfully
            state.expenseItems.unshift(action.payload.data);
            state.message = action.payload.message;

        })

        .addCase(addNewExpense.rejected, (state, action) => {

            // set errors 
            state.isError= action.error.message;

        })
    }
})

export default expenseSlice.reducer;