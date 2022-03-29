import React from "react";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/'>
          BadBank
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                exact
                className='nav-link'
                activeClassName='active'
                to='/'
                title='Go to the Homepage'
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                to='/login'
                title='Create a new account'
              >
                Log In
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                to='/CreateAccount/'
                title='Create a new account'
              >
                Create Account
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/deposit/'
                title='Deposit Money into the account'
              >
                Deposit
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/withdraw/'
                title='Withdraw Money from the account'
              >
                Withdraw
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/alldata/'
                title='View all account data'
              >
                All Data
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
