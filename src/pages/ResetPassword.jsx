import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMsg(res.data);

      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMsg("Reset failed or token expired");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Reset Password
        </button>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;