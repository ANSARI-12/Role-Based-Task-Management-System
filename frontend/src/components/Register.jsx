import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(form);

    alert("Registered Successfully. Please Login.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />

      <input name="email" placeholder="Email" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange} value={form.role}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button>Register</button>
    </form>
  );
}
