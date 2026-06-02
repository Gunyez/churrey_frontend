import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import "../styles/profile.css";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(
        `/users/${user._id}`,
        formData
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (

    <div className="profilePage">
      <div className="profileCard">

        <h2>My Profile</h2>

        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="New Password (optional)"
        />

        <button onClick={handleUpdate}>
          Update Profile
        </button>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;