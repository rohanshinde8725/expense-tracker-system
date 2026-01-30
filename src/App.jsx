import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ExpenseForm from "./components/ExpenseForm";
import AdminView from "./components/AdminView";
import StaffView from "./components/StaffView";

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem("expenses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const updateStatus = (id, status) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, status } : exp)),
    );
  };

  // Staff remove (hard delete)
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // ✅ Admin remove (hide only from admin)
  const hideFromAdmin = (id) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, hiddenFromAdmin: true } : exp,
      ),
    );
  };

  const logout = () => setUser(null);

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1.5 rounded"
        >
          Logout
        </button>
      </div>

      {user.role === "staff" && (
        <>
          <ExpenseForm user={user} addExpense={addExpense} />
          <StaffView user={user} expenses={expenses} deleteExpense={deleteExpense} />
        </>
      )}

      {user.role === "admin" && (
        <AdminView
          expenses={expenses}
          updateStatus={updateStatus}
          hideFromAdmin={hideFromAdmin}
        />
      )}
    </div>
  );
};

export default App;
