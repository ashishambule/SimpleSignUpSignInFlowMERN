// import logo from './logo.svg';
import './App.css';
import Login from './screens/Login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup/signup';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/home';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path={['/', '/register']} component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
