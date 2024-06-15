
import { createSlice } from "@reduxjs/toolkit";

import { getExpenseUsers } from "../../services/expense";

// initial state
const expenseUserState = {
    expenseUsers: [],
    isError: null,
    isSuccess: null,
    isLoading: null,
    status: 'idle'
}


// expense-user-slice
const expenseUserSlice = createSlice({

    name: 'expenseUsers',

    initialState: expenseUserState,

    extraReducers: (builder) => {

        builder.addCase(getExpenseUsers.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(getExpenseUsers.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.expenseUsers =  action.payload;
            state.status = 'loaded';
            state.isLoading = false;


        })

        .addCase(getExpenseUsers.rejected, (state, action) => {
            state.status = 'loaded';
            state.isLoading = false;
            state.isError = action.error.message;

        })
    }




})


export default expenseUserSlice.reducer;