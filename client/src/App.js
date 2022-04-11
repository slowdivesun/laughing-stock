import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home /> : <Login />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/messenger'>
          {!user ? <Redirect to='/' /> : <Messenger />}
        </Route>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
