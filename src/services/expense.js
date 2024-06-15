import axios from "axios";
import {  createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'http://127.0.0.1:8000';

// Expense Api Services: add-expense, get-all-expense, update-expense, or delete-expense

// get all expense data
const getAllExpenseData = createAsyncThunk(`get/expenses`, async() => {
    const response = await axios.get(`${baseUrl}/expense/api/expense/`);
    return response.data;
});



// get all expense-users list
const getExpenseUsers = createAsyncThunk(`get/expenses/users`, async() => {
    const response = await axios.get(`${baseUrl}/expense/api/users/`);
    return response.data;
});


// add new expense service
const addNewExpense = createAsyncThunk('add/expense', async(expensePayload) => {

    const  response = await axios.post(`${baseUrl}/expense/api/expense/add/`,expensePayload, {
        headers:{
            'Content-Type': 'application/json',
        }
    } )

    return response.data;
})

//  delete expense 
const deleteExpense = createAsyncThunk('delete/expense', async(expenseId) => {

    const response = await axios.delete(`${baseUrl}/expense/api/expense/delete/${expenseId}/`,{}, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data;
})

export{
    deleteExpense,        // delete expense
    addNewExpense,       // add new expense 
    getExpenseUsers,    // get expense users
    getAllExpenseData, // get all expenses

}