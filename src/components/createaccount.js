import React, { useState, useContext } from "react";
import { UserContext } from "../context";
import Card from "./Card";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field || (label === "password" && field?.length < 8)) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const user = { name, email, password, balance: 0 };
    ctx.setUsers([...ctx.users, user]);
    ctx.setCurrentUser(user);
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor='primary'
      header='Create Account'
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type='input'
              className='form-control'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type='input'
              className='form-control'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type='submit'
              disabled={!name && !email && !password}
              className='btn btn-light'
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type='submit' className='btn btn-light' onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}

export default CreateAccount;
