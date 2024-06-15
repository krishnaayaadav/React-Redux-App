
import { Route, Routes } from "react-router-dom";

import AddExpense from "./features/Expense/AddExpense";
import ExpenseList from "./features/Expense/ExpenseList";

function App() {
  return (
      <div className="container mt-3">

        <Routes>
          <Route path="/expenses" element={<ExpenseList /> } />
          <Route path="/add/expense" element={<AddExpense />} />
        </Routes>

      </div>
       
      
  );
}

export default App;
