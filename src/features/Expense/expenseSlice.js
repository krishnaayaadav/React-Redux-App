
import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenseData } from "../../services/expense";


const expenseInitialState = {
    expenseItems: [],
    isError: null,
    isSuccess: null,
    isLoading: null,
    status: 'idle'
}

const expenseSlice = createSlice({

    name: 'expense',
    initialState: expenseInitialState,

    extraReducers: (builder) => {
        
        builder.addCase(getAllExpenseData.pending, (state) => {
            state.isLoading = true;
        } )

        .addCase(getAllExpenseData.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.expenseItems = action.payload;

        })

        .addCase( getAllExpenseData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = action.error.message;

            
        } )
    }
})

export default expenseSlice.reducer;