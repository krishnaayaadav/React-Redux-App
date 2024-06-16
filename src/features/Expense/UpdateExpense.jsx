
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getExpenseDetails,updateExpense } from "../../services/expense";
import { getExpenseUsers } from "../../services/expense";

import { updateExpenseItem } from "./expenseSlice";

const UpdateExpense = ()=>{
    let params      = useParams();
    const navigate  = useNavigate();
    const dispatch  = useDispatch();

    const [title,  setTitle]            =  useState('');
    const [date,   setDate]             =  useState('');
    const [amount, setAmount]           =  useState('');
    const [description, setDescription] =  useState('');


    const [selectedValue,  setSelectedValue]  = useState('');
    const [submittedValue, setSubmittedValue] = useState('');
    const [notFound,   setNotFound]             =  useState(false);


    const { expenseUsers:expenseAllUsers } = useSelector( (state) => state.expenseUser );

    const setExpenseData = (expenseData)=>{
        
        if(expenseData){

            setTitle(expenseData.exp_title);
            setDescription(expenseData.exp_description);
            setAmount(expenseData.exp_amount);
            setDate(expenseData.exp_date);
            setSelectedValue(expenseData.exp_user)

        }
    }

    const resetExpense = ()=> {

            setTitle('');
            setDescription('');
            setAmount('');
            setDate('');
            setSelectedValue('')
    }

    useEffect( ()=> {

        // get expense details
        getExpenseDetails(params.id)
        .then( response => {
            if(response.status ==  200){

                // get all users
                if(expenseAllUsers.length == 0){
                    dispatch(getExpenseUsers())


                }

                // set expense data
                setExpenseData(response.data)

                // console.log(response.data)

            }
        } )

        .catch(errors => {
            console.log(errors.response.data)
            setNotFound(true)
        } )

    }, [params.id, dispatch])


    // update selected value
    useEffect( ()=> {
        setSubmittedValue(selectedValue)

    }, [selectedValue])
    
    // not found page
    if(notFound === true){
        return(
            <div className="not-found">
                <h5>Sooory... <br /> No expense is found with this id: {params.id} </h5>
                <Link to={'/expenses'} className="btn btn-sm btn-primary" >Back to homepage</Link>
            </div>
        )
    }

    const sumbitHandler = (e)=> {
        e.preventDefault();

        const expensePayload = {
            id: params.id,
            exp_description: description,
            exp_date: date,
            exp_amount: amount,
            exp_title: title,
            exp_user: submittedValue,
        }
        console.log('\n  Form Submitted Payload: ',expensePayload)

        updateExpense(expensePayload)
        .then(response => {
            if(response.status == 200){
                
                // update expense data in redux store
                dispatch(updateExpenseItem(response.data.data))
                navigate('/expenses')


            }
        })

        .catch(errors => {
            console.log(errors.response.data)
        })




    }


    // update expense form
    return(
        <div className="col-7-sm add-expense">

            <h3 className="text-center">Update Expense</h3>
            
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
                <button type="button" className="btn btn-danger cancel" onClick={(e)=> {resetExpense(); navigate('/expenses')}}>Cancel</button>
            </form>
        </div>
    )
};

export default UpdateExpense