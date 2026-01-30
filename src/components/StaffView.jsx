import React from "react";

const StaffView = ({ user, expenses, deleteExpense }) => {
  const myExpenses = expenses.filter(
    (exp) => exp.staffEmail === user.email
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Expenses</h2>

      {myExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses submitted.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {myExpenses.map((exp) => (
              <tr key={exp.id}>
                <td className="border p-2 text-center">
                  {exp.expenseType}
                </td>

                <td className="border p-2 text-center">
                  ₹{exp.totalAmount}
                </td>

                <td className="border p-2 text-center font-semibold">
                  {exp.status}
                </td>

                <td className="border p-2 text-center">
                  {exp.status === "Pending" && (
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffView;
