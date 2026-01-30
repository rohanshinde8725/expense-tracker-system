import React from "react";

const AdminView = ({ expenses, updateStatus, hideFromAdmin }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {expenses.filter(exp => !exp.hiddenFromAdmin).length === 0 ? (
        <p className="text-gray-500">No expenses submitted.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Staff</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses
              .filter(exp => !exp.hiddenFromAdmin)
              .map((exp) => (
                <tr key={exp.id}>
                  <td className="border p-2 text-center">{exp.staffName}</td>
                  <td className="border p-2 text-center">{exp.staffEmail}</td>
                  <td className="border p-2 text-center">{exp.expenseType}</td>
                  <td className="border p-2 text-center">₹{exp.totalAmount}</td>
                  <td className="border p-2 text-center font-semibold">{exp.status}</td>

                  <td className="border p-2 text-center space-x-2">
                    {/* Approve / Reject only if Pending */}
                    {exp.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(exp.id, "Approved")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(exp.id, "Rejected")}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* Remove only after Approved / Rejected */}
                    {exp.status !== "Pending" && (
                      <button
                        onClick={() => hideFromAdmin(exp.id)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
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

export default AdminView;
