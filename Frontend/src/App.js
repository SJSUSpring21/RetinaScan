
import './App.css';
import SideNavbar from './Components/SideNavbar';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import  Home from './Pages/Home';
import  Dashboard  from './Pages/Dashboard';
import  PatientAtRisk from './Pages/PatientAtRisk';
import  ViewAndPredict  from './Pages/ViewAndPredict';
import  Add from './Pages/Add';
import RegPatients from './Pages/RegPatients'


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <div className="sideswitch">
      <SideNavbar />
      <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/home' component={Home} />
      <Route path='/patientAtRisk' component={PatientAtRisk} />
      <Route path='/add' component={Add} />
      <Route path='/viewAndPredict' component={ViewAndPredict} />
      <Route path='/regpatients' component={RegPatients}  />
      </Switch>
      </div>
      </BrowserRouter>
    </div>
  );

}
 export default App;