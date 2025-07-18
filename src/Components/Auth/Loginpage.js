import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'customer') {
      navigate('/customer/dashboard');
    } else if (role === 'driver') {
      navigate('/driver/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-600 tracking-wide animate-pulse">
          Welcome Back Dude!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-blue-500 hover:text-blue-700 hover:underline transition duration-300"
        >
          New User? Signup
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
