import { useState } from "react";
import axios from "axios";

function Payment() {
  const [amount, setAmount] = useState(0);

  const handlePayment = () => {
    axios
      .post("http://127.0.0.1:9999/create_payment", { amount })
      .then((response) => {
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        console.error("There was an error creating the payment!", error);
      });
  };

  return (
    <div>
      <h1>VNPay Payment</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with VNPay</button>
    </div>
  );
}

export default Payment;
