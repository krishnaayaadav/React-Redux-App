

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {  getExpenseUsers, addNewExpense } from "../../services/expense";

const AddExpense = ()=> {
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const [title,  setTitle]            =  useState('');
    const [date,   setDate]             =  useState('');
    const [amount, setAmount]           =  useState('');
    const [description, setDescription] =  useState('');


    const [selectedValue,  setSelectedValue]  = useState('');
    const [submittedValue, setSubmittedValue] = useState('');
    const [message, setMessage] = useState('');


    const expenseAllUsers    = useSelector( (state) => state.expenseUser.expenseUsers )
    const { expenseUsers,isError, isSuccess, isLoading, status } = useSelector( (state) => state.expenseUser );

    // fetch expense users
    useEffect( ()=> {

        if(status === 'idle'){
            dispatch(getExpenseUsers())
        }
    }, [status, expenseUsers, dispatch] )

    
    // update selected value
    useEffect( ()=> {
        setSubmittedValue(selectedValue)

    }, [selectedValue])

    const sumbitHandler = (e)=> {
        e.preventDefault();

        const expensePayload = {
            exp_description: description,
            exp_date: date,
            exp_amount: amount,
            exp_title: title,
            exp_user: submittedValue,
        }
        console.log('\n  Form Submitted Payload: ',expensePayload)

        dispatch(addNewExpense(expensePayload))
        navigate('/expenses')


    }

    return(
        <div className="col-7-sm add-expense">

            <h3 className="text-center">Add New Expense</h3>
            
            <form>
                <div className="form-group">
                    <label >Title</label>
                    <input type="email" className="form-control"  placeholder="Enter Expense Title ..." onChange={(e)=> {setTitle(e.target.value); }} value={title}/>
                </div>

                <label>
                Choose an option:
                <select  className="form-group" value={selectedValue} onChange={ (e)=> {setSelectedValue(e.target.value);} }>
                    <option  className="form-group" value="">Select Expense User</option>
                    {
                        expenseAllUsers.map( user => (
                            <option className="form-group" key={user.id} value={user.username}>{user.username} </option>

                        ))
                    }
                </select>
                </label>
                
                

                <div className="form-group">
                    <label >Date</label>
                    <input type="date" className="form-control"   onChange={(e)=> {setDate(e.target.value)}} value={date}/>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input type="email" className="form-control"  placeholder="Enter Expense Amount ..." onChange={(e)=> {setAmount(e.target.value)}} value={amount}/>
                </div>

                

                <div className="form-group">
                    <label >Description</label>
                    <textarea type="email" className="form-control"  placeholder="Enter Expense Description ..." onChange={(e)=> {setDescription(e.target.value)}} value={description}/>
                </div>

               

                <button type="submit" className="btn btn-primary" onClick={sumbitHandler}>Submit</button>
                <button type="submit" className="btn btn-danger cancel" onClick={(e)=> {navigate('/expenses')}}>Cancel</button>
            </form>
        </div>
    )
};

export default AddExpense;