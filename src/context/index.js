import React, { useState } from "react";
export const UserContext = React.createContext(null);

export const Provider = ({ children }) => {
  const [totalDeposited, setDeposited] = useState(0);
  const [totalWithdrawn, setWithdrawn] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const updateBalance = (newBalance) => {
    const tempUsers = users;
    const tempCurrentUser = currentUser;
    tempCurrentUser.balance = newBalance;
    tempUsers.forEach((user) => {
      if (user.email === currentUser.email) {
        user.balance = newBalance;
      }
    });
    setUsers(tempUsers);
    setCurrentUser(tempCurrentUser);
  };

  const recordSubmission = (user, type, amount) => {
    setSubmissions([
      ...submissions,
      {
        user,
        type,
        amount,
      },
    ]);
  };

  return (
    <UserContext.Provider
      value={{
        totalDeposited,
        setDeposited,
        totalWithdrawn,
        setWithdrawn,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        updateBalance,
        submissions,
        recordSubmission,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
