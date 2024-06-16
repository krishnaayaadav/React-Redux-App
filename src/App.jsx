
import { Route, Routes } from "react-router-dom";

import AddExpense from "./features/Expense/AddExpense";
import ExpenseList from "./features/Expense/ExpenseList";
import UpdateExpense from "./features/Expense/UpdateExpense";


function App() {
  return (
      <div className="container mt-3">

        <Routes>
          <Route path="/expenses" element={<ExpenseList /> } />
          <Route path="/add/expense" element={<AddExpense />} />
          <Route path="/exepnse/update/:id" element={<UpdateExpense />} />
        </Routes>

      </div>
       
      
  );
}

export default App;
