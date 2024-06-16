
import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenseData, addNewExpense, deleteExpense, getExpenseDetails, updateExpense } from "../../services/expense";

// # initialState
const expenseInitialState = {
    expenseItems: [],
    isError: null,
    isSuccess: null,
    isLoading: null,
    status: 'idle',
    message: '',
}

// expense slice 
const expenseSlice = createSlice({

    name: 'expense',
    initialState: expenseInitialState,

    reducers: {

        updateExpenseItem: (state, action)=> {
            //  find index of updated element
            const index = state.expenseItems.findIndex(exp =>  exp.id === action.payload.id);

            // update the expense item with updated data
            state.expenseItems[index] = action.payload;
            state.message = `Expense updated successfully\n Title: ${action.payload.exp_title}`

            
        }

    },
    // Extra-Reducers here
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

        // delete expense state updation
        .addCase(deleteExpense.fulfilled, (state, action) => {
            
            const deleteExpId = action.meta.arg
            state.message     = `Congrats! Expense Deleted Successully Id: ${deleteExpId}`;
            // update expense data here
            state.expenseItems =  state.expenseItems.filter(expense => expense.id != deleteExpId)

        })

    }
})

export const  { updateExpenseItem } =  expenseSlice.actions;
export default expenseSlice.reducer;