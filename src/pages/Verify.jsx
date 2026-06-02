import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);
        setMessage(res.data);
      } catch (err) {
        setMessage("Verification failed");
      }
    };

    verify();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default Verify;