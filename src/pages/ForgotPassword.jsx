import { useState } from "react";
import api from "../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data);
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Send Reset Link
        </button>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;