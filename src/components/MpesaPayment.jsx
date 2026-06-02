import { useState } from "react";
import api from "../api/api";

const MpesaPayment = ({ amount }) => {
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    try {
      const res = await api.post("/mpesa/stk", {
        phone,
        amount,
      });

      alert("STK Push sent to your phone");

      console.log(res.data);

    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="2547XXXXXXXX"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handlePayment}>
        Pay KES {amount}
      </button>
    </div>
  );
};

export default MpesaPayment;