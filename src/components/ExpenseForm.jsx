import React, { useState } from "react";

const ExpenseForm = ({ user, addExpense }) => {
  const [expenseType, setExpenseType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");

  const totalAmount = unitPrice * quantity;

  const submit = (e) => {
    e.preventDefault();

    if (!expenseType || !unitPrice || !quantity || !remarks) {
      alert("All fields are required");
      return;
    }

    addExpense({
      id: Date.now(),
      staffName: user.name,
      staffEmail: user.email,
      expenseType,
      totalAmount,
      remarks,
      status: "Pending",
      hiddenFromAdmin: false, // ✅ IMPORTANT
    });

    setExpenseType("");
    setUnitPrice("");
    setQuantity("");
    setRemarks("");
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-4">Submit Expense</h2>

      <input value={user.name} disabled className="border p-2 w-full mb-3 bg-gray-100" />
      <input value={user.email} disabled className="border p-2 w-full mb-3 bg-gray-100" />

      <select
        value={expenseType}
        onChange={(e) => setExpenseType(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option value="">Select Category</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Unit Price"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        value={`Total Amount: ₹${totalAmount || 0}`}
        disabled
        className="border p-2 w-full mb-3 bg-gray-100"
      />

      <textarea
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button className="bg-teal-600 text-white px-3 py-1.5 rounded">
        Submit Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
