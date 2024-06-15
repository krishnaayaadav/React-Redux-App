import axios from "axios";
import {  createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'http://127.0.0.1:8000';


// get all expense data
const getAllExpenseData = createAsyncThunk(`get/expenses`, async() => {
    const response = await axios.get(`${baseUrl}/expense/api/expense/`);
    return response.data;
});


export{
    getAllExpenseData,
}