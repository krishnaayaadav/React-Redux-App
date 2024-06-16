
import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../features/Expense/expenseSlice";
import expenseUserReducer from "../features/Expense/expenseUserSlice";

// redux store
const store = configureStore({

    // reducers
    reducer: {

        expense:     expenseReducer,
        expenseUser: expenseUserReducer,

    }
});


export default store