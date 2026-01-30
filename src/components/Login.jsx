import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("select");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    // role must be selected
    if (role === "select") {
      setError("Please select a role");
      return;
    }

    // Admin validation
    if (role === "admin") {
      if (name !== "ascii-admin" || email !== "admin@me.com") {
        setError("Incorrect admin username or email");
        return;
      }
    }

    // If everything is valid
    setUser({ name, email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="select">Select Role</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-600 text-white w-full py-2 rounded 
        hover:bg-blue-800 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
