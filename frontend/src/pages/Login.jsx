import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", form);

    // TODO: Connect to backend API
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">

        <h2 className="auth-title">Sign in to CryptoVista</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-20">
            Sign In
          </button>

        </form>

        <div className="auth-footer">
          Don’t have an account? Register
        </div>

      </div>
    </div>
  );
}
