
import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../features/Expense/expenseSlice";

// redux store
const store = configureStore({

    // reducers
    reducer: {

        expense: expenseReducer,

    }
});


export default store