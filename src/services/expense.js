import axios from "axios";
import {  createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'http://127.0.0.1:8000';


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

// # api services

export{
    addNewExpense,      // add new expense 
    getExpenseUsers,    // get expense users
    getAllExpenseData, // get all expenses

}