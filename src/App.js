import { useEffect, useState } from "react";
import "./App.css";

const url = "https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD";
const baseUrl = "https://api.frankfurter.app/latest?";

function App() {
  const [amount, setAmount] = useState(50);

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const [result, setResult] = useState("");

  function handleAmountChange(e) {
    const value = Number(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }

  useEffect(
    function () {
      async function convert() {
        const response = await fetch(
          `${baseUrl}amount=${amount}&from=${from}&to=${to}`
        );

        const data = await response.json();

        const convertResult = data.message
          ? "Please use different currencies"
          : data.rates[to];

        setResult(convertResult);
      }

      convert();
    },
    [amount, from, to]
  );

  return (
    <div>
      <div className="container">
        <input
          type="text"
          value={amount}
          onChange={(e) => handleAmountChange(e)}
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          defaultValue="USD"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          defaultValue="EUR"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default App;
