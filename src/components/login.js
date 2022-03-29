import React, { useState, useContext } from "react";
import { Card } from "./";
import { UserContext } from "../context";
import { useHistory } from "react-router-dom";

function Login() {
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    let user = ctx.users.filter(
      (user) => user.email === email && user.password === password
    );
    if (validate(user.length, "Credentials don't match")) {
      ctx.setCurrentUser(user[0]);
      history.push("/");
    } else return;
  }

  return (
    <Card
      bgcolor='success'
      header='Login'
      status={status}
      body={
        <>
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
          <button type='submit' className='btn btn-light' onClick={handleLogin}>
            Log In
          </button>
        </>
      }
    />
  );
}

export default Login;
