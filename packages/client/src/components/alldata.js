import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";

import { Card } from "./";

function AllData() {
  const ctx = useContext(UserContext);

  useEffect(() => {
    if (ctx.currentUser) {
      ctx.getSubmissions();
    }
  }, [ctx.currentUser]);

  return (
    <Card
      bgcolor='info'
      header='All Data'
      body={
        <>
          <p style={{ fontWeight: "bold" }}>Current User</p>
          <p>Name: {ctx.currentUser.name}</p>
          <p>Email: {ctx.currentUser.email}</p>
          <p>Balance: {ctx.currentUser.balance}</p>
          {ctx.submissions.length && (
            <p style={{ fontWeight: "bold" }}>Recent Submissions:</p>
          )}
          {ctx.submissions.length &&
            ctx.submissions.map((sub, index) => (
              <p key={index}>
                Type: {sub.type} - Amount: ${sub.amount}
              </p>
            ))}
        </>
      }
    />
  );
}

export default AllData;
