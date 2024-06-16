
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { deleteExpense } from "../../services/expense";


const ExpenseItem   = (props)=> {
    const expense   = props.expense;
    const dispatch  = useDispatch();

    const expUpdatedata = useSelector( (state) => state.expense.expenseUpdateData)




    const expenseDeleteHandler = (event,expId)=>{
        event.preventDefault();

        dispatch(deleteExpense(expId))

    }

    


    return(

        <tr  >
            <th scope="row" >{expense.id} </th>
            <td>{expense.exp_title} </td>
            <td>{expense.exp_user} </td>
            <td>{expense.exp_amount} </td>
            <td> {expense.exp_date} </td>
            <td> {expense.exp_description} </td>
            <td>
                <Link className="btn btn-sm btn-primary my-3" to={`/exepnse/update/${expense.id}`} >Update</Link>
                <button className="btn btn-sm btn-danger" onClick={(e) => {expenseDeleteHandler(e,expense.id)}}>Delete</button>

            </td>


        </tr>
    )

};

export default ExpenseItem;