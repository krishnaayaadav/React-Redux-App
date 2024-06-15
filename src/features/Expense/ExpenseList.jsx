
import { useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllExpenseData } from "../../services/expense";


const ExpenseList = ()=> {

    const { expenseItems,isError, isSuccess, isLoading, status } = useSelector( (state) => state.expense );
    console.log(expenseItems)

    const dispatch  = useDispatch();

    useEffect( ()=> {

        if(status === 'idle'){
            dispatch(getAllExpenseData());

        }


    },[status, dispatch])



    return(
        <>
         <div className="expense-list ">
            <h2 >Expense App</h2>
            <Link className="btn btn-sm btn-primary" to={'/add/expense'}>Add Expense</Link>
            <div className="col-sm-10 table-responsive-lg">


                <table className="table table-hover  mt-3">
                <caption>List of expenses</caption>
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">User</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenseItems.map( expense => (
                            <ExpenseItem  expense={expense} />
                        ) )
                    }
                    
                </tbody>
                </table>
            </div>

         </div>
        </>
    )
};


export default ExpenseList;