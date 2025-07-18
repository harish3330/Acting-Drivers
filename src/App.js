import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Auth/Loginpage';
import CustomerDashboard from './Components/Customer/Customerdashboard';
import DriverDashboard from './Components/Driver/Driverdashboard';
import AdminDashboard from './Components/Admin/Admindashboard';
import SignupPage from './Components/Auth/Signuppage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
