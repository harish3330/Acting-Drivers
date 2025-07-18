import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyDrivers = [
  { id: 1, name: 'Harish 1 ', location: 'Chennai', rate: '₹500/day' },
  { id: 2, name: 'Harish 2', location: 'Coimbatore', rate: '₹450/day' },
  { id: 3, name: 'Harish 3', location: 'Madurai', rate: '₹550/day' },
];

function CustomerDashboard() {
  const navigate = useNavigate();
  const [drivers] = useState(dummyDrivers);

  const handleBook = (driver) => {
    alert(`You have selected ${driver.name} (${driver.location})`);
    // navigate('/customer/payment', { state: { driver } });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-purple-600 tracking-wide animate-pulse">
          Acting Drivers
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:shadow-lg hover:scale-105 transform transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{driver.name}</h3>
            <p className="text-gray-700 mb-1">📍 Location: <span className="font-semibold">{driver.location}</span></p>
            <p className="text-gray-700 mb-4">💰 Rate: <span className="font-semibold">{driver.rate}</span></p>

            <button
              onClick={() => handleBook(driver)}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded shadow hover:shadow-lg hover:scale-105 transform transition duration-300"
            >
              Book Driver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;

