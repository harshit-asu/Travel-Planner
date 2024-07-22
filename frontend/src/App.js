import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/login/ForgotPassword';
import VerifyCode from './components/login/VerifyCode';
import ResetPassword from './components/login/ResetPassword';
import MyTrips from './components/Trip/MyTrips';
import Trip from './components/Trip/Trip';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/Home/About';
import Dashboard from './components/Dashboard';
import { useCallback, useEffect, useState } from 'react';
import Contact from './components/Home/Contact';
import { isLoggedIn } from './services/api';
import { MDBSpinner } from 'mdb-react-ui-kit';
import ViewProfile from './components/Profile/ViewProfile';
import Loading from './components/Misc/Loading';

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchCurrentUserId = useCallback(async () => {
    const response = await isLoggedIn();
    // await sleep(5000);
    if(response){
      setCurrentUserId(response.data.user_id);
    }
    setIsDataLoading(false);
  }, []);

  useEffect(() => {
    fetchCurrentUserId();
  }, [fetchCurrentUserId]);

  if(isDataLoading){
    return (
      <Loading />
    );
  }
  else{
    return (
      <div className="App">
        <Router>
          <Navbar currentUserId={currentUserId} />
          <Routes>
            <Route path="/" element={(currentUserId) ? <Dashboard currentUserId={currentUserId} /> : <Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path="/login" element={(currentUserId) ? <Navigate to='/' replace/> : <Login/>} />
            <Route path="/signup" element={(currentUserId) ? <Navigate to='/' replace/> : <Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/verify-code" element={<VerifyCode/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/trips" element={(currentUserId) ? <MyTrips /> : <Navigate to='/login' replace/>} />
            <Route path='/trips/:trip_id' element={(currentUserId) ? <Trip /> : <Navigate to='/login' replace/> } />
            <Route path='/profile' element={(currentUserId) ? <ViewProfile /> : <Navigate to='/login' replace/> } />
          </Routes>
        </Router>
      </div>
    );
  }

}

export default App;
