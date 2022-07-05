import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card } from "./";
import { UserContext } from "../context";

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const ctx = useContext(UserContext);

  function validateDeposit() {
    const toDeposit = Number(amount);
    if (isNaN(toDeposit) || toDeposit === 0 || toDeposit < 0) {
      setStatus("Error: Amount");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleDeposit() {
    if (!validateDeposit()) return;

    await Promise.all([
      ctx.updateBalance(ctx.currentUser.balance + Number(amount)),
      ctx.recordSubmission(ctx.currentUser.name, "Deposit", amount),
    ]);

    setShow(false);
  }

  function clearForm() {
    setAmount("");
    setShow(true);
  }

  return (
    <Card
      bgcolor='secondary'
      header='Deposit'
      status={status}
      body={
        show ? (
          <>
            {ctx.currentUser && <p>Balance: ${ctx.currentUser.balance}</p>}
            Amount to Deposit:
            <br />
            <input
              type='input'
              className='form-control'
              id='name'
              placeholder='Enter amount'
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type='submit'
              disabled={!amount}
              className='btn btn-light'
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            {ctx.currentUser && <p>Balance: ${ctx.currentUser.balance}</p>}
            <h5>Success!</h5>
            <button type='submit' className='btn btn-light' onClick={clearForm}>
              Deposit Another Amount
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
