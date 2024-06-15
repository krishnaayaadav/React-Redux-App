
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { deleteExpense } from "../../services/expense";

const ExpenseItem   = (props)=> {
    const expense   = props.expense;
    const dispatch  = useDispatch();




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
                <button className="btn btn-sm btn-primary my-3">Update</button>
                <button className="btn btn-sm btn-danger" onClick={(e) => {expenseDeleteHandler(e,expense.id)}}>Delete</button>

            </td>


        </tr>
    )

};

export default ExpenseItem;