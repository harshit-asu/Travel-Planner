import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import VerifyCode from './components/login/VerifyCode';
import ResetPassword from './components/Auth/ResetPassword';
import MyTrips from './components/Trip/MyTrips';
import Trip from './components/Trip/Trip';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/Home/About';
import Dashboard from './components/Dashboard';
import Contact from './components/Home/Contact';
import ViewProfile from './components/Profile/ViewProfile';
import { useAuth } from './AuthProvider';
import { useCallback, useEffect, useState } from 'react';
import Loading from './components/Misc/Loading';
import InvitationsList from './components/Invitation/InvitationsList';

function App() {
  const { auth } = useAuth();

  const [isDataLoading, setIsDataLoading] = useState(true);

  const authenticate = useCallback(async () => {
    if(auth !== null){
      setIsDataLoading(false);
    }
  });

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  if(isDataLoading){
    return <Loading />
  }

  return (
    <div className="App">
      <Router>
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={(auth) ? <Navigate to='/dashboard' replace/> : <Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path="/login" element={(auth) ? <Navigate to='/dashboard' replace/> : <Login auth={auth}/>} />
          <Route path="/signup" element={(auth) ? <Navigate to='/dashboard' replace/> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/verify-code" element={<VerifyCode/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/trips" element={<MyTrips auth={auth} />} />
          <Route path='/trips/:trip_id' element={<Trip auth={auth} />} />
          <Route path='/profile' element={ <ViewProfile auth={auth} /> } />
          <Route path='/invitations' element={ <InvitationsList auth={auth} /> } />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
