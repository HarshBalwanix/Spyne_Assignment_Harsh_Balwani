import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import { useContext } from 'react';
import { UserContext } from './ContextAPI/UserContext';
import { PrivateRoute } from "./pages/PrivateRoute"
import { Dashboard } from './pages/Dashboard';
import MyProfile from './dashboard/MyProfile';
import { AddCar } from './dashboard/AddCar/AddCar';
import { YourCars } from './dashboard/Yourcars/YourCars';
import { CarDetails } from './pages/CarDetails';
import { CarsPage } from './pages/CarsPage';

function App() {

  const { user } = useContext(UserContext);

  return (
    <div className="text-center">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
            <Route path="/dashboard/add-car" element={<AddCar />}></Route>
            <Route path="/dashboard/your-cars" element={<YourCars />}></Route>
            <Route path="/dashboard/edit-car" element={<AddCar />}></Route>
          </Route>
          <Route path="/car-details/:carId" element={<CarDetails />}></Route>
          <Route path="/cars" element={<CarsPage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
