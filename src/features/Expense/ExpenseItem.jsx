
const ExpenseItem = (props)=> {
    const key = props.expense.id;
    const expense = props.expense;

    return(

        <tr >
            <th scope="row" key={key}>{expense.id} </th>
            <td>{expense.exp_title} </td>
            <td>{expense.exp_user} </td>
            <td>{expense.exp_amount} </td>
            <td> {expense.exp_date} </td>
            <td> {expense.exp_description} </td>
            <td>
                <button className="btn btn-sm btn-primary my-3">Update</button>
                <button className="btn btn-sm btn-danger">Delete</button>

            </td>


        </tr>
    )

};

export default ExpenseItem;