import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { dispatch, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await api.post("/auth/login", credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data,
      });
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleClick} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="error">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </p>
        )}

        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;