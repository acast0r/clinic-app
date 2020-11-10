import React, {useContext} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {AuthContext} from './Context/AuthContext';
import MedicalInformation from './components/MedicalInformation';
import HealthWellness from './components/HealthWellness';
import Nurse from './components/Nurse';
import Doctor from './components/Doctor';
import Manager from './components/Manager';

function App() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Router>
       {isAuthenticated && <Navbar/>}
      <PrivateRoute exact path="/"  roles={["admin", "patient", "manager", "doctor", "nurse"]} component={Dashboard}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
      <PrivateRoute path="/nurse" roles={["nurse"]} component={Nurse}/>
      <PrivateRoute path="/doctor" roles={["doctor"]} component={Doctor}/>
      <PrivateRoute path="/manager" roles={["manager"]} component={Manager}/>
      <PrivateRoute path="/pages/medical-information" roles={["patient"]} component={MedicalInformation}/>
      <PrivateRoute path="/pages/health-wellness-program" roles={["patient"]} component={HealthWellness}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
    </Router>
  );
}

export default App;
