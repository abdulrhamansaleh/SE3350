import logo from './logo.svg';
import './App.css';

import Home from './pages/public/home/home';


const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Employee': 'Employee'
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cheer/home"/>}></Route>
      {/* Public Routes */}
        <Route path='/cheer/home' element={<Home/>}></Route>
      {/* Protected Routes For Accounts*/}





      {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          
      </Route> */}
      {/* Protected Routes For Employees*/}

      {/* <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
          
       </Route> */}


      {/* Protected Routes For Admin*/}
      {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          
       </Route> */}

    </Routes>
  );
}

export default App;
