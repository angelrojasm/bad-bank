import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card } from "./";
import { UserContext } from "../context";

function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const ctx = useContext(UserContext);

  function validateWithdraw() {
    const toWithdraw = Number(amount);
    if (
      isNaN(toWithdraw) ||
      toWithdraw === 0 ||
      toWithdraw < 0 ||
      toWithdraw > Number(ctx.currentUser.balance)
    ) {
      setStatus("Error: Amount");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleWithdraw() {
    if (!validateWithdraw()) return;

    await Promise.all([
      ctx.updateBalance(ctx.currentUser.balance - Number(amount)),
      ctx.recordSubmission(ctx.currentUser.name, "Withdrawal", amount),
    ]);
    setShow(false);
  }

  function clearForm() {
    setAmount("");
    setShow(true);
  }

  return (
    <Card
      bgcolor='warning'
      header='Withdraw'
      status={status}
      body={
        show ? (
          <>
            {ctx.currentUser && <p>Balance: ${ctx.currentUser.balance}</p>}
            Amount to Withdraw:
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
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            {ctx.currentUser && <p>Balance: ${ctx.currentUser.balance}</p>}
            <h5>Success!</h5>
            <button type='submit' className='btn btn-light' onClick={clearForm}>
              Withdraw Another Amount
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
