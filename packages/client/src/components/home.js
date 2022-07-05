import React from "react";

import { Card } from "./";
import bank from "../images/bank.png";
function Home() {
  return (
    <>
      <Card
        txtcolor='black'
        header='BadBank Site'
        title='Welcome to the bank'
        text='You can move around using the navigation bar.'
        body={<img src={bank} className='img-fluid' alt='Bank logo' />}
      />
    </>
  );
}

export default Home;
