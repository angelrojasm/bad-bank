import { Route, BrowserRouter, Switch } from "react-router-dom";
import {
  NavBar,
  CreateAccount,
  Home,
  Deposit,
  Withdraw,
  AllData,
  Login,
} from "./components";
import { Provider } from "./context";
function App() {
  return (
    <BrowserRouter>
      <Provider>
        <NavBar />
        <Switch>
          <div className='container' style={{ padding: "20px" }}>
            <Route path='/' exact component={Home} />
            <Route path='/CreateAccount/' component={CreateAccount} />
            <Route path='/login' component={Login} />
            <Route path='/deposit/' component={Deposit} />
            <Route path='/withdraw/' component={Withdraw} />
            <Route path='/alldata/' component={AllData} />
          </div>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
