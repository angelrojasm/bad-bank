import React, { useContext } from "react";
import { UserContext } from "../context";
import { Redirect } from "react-router-dom";
import { Card } from "./";

function AllData() {
  const ctx = useContext(UserContext);

  if (ctx?.currentUser === null) return <Redirect to='/login' />;

  return (
    <Card
      bgcolor='info'
      header='All Data'
      body={
        <>
          <p>
            {ctx.users.length} Registered User:
            {ctx.users.length === 1 || "s"}
          </p>
          {ctx.users.map((user, index) => (
            <p key={index}>
              {user.name} - {user.email} - ${user.balance}
            </p>
          ))}
          {ctx.submissions.length > 0 && <p>Recent Submissions:</p>}
          {ctx.submissions.map((sub, index) => (
            <p key={index}>
              User: {sub.user} - Type: {sub.type} - Amount: {sub.amount}
            </p>
          ))}
        </>
      }
    />
  );
}

export default AllData;
