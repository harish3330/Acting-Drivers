import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DriverDashboard() {
  const navigate = useNavigate();

  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [fare, setFare] = useState('');

  const handleUploadDocuments = (e) => {
    e.preventDefault();
    setIsDocumentUploaded(true);
    alert('Documents uploaded! Waiting for admin verification...');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = { name, location, fare };
    setPosts([...posts, newPost]);
    setName('');
    setLocation('');
    setFare('');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-purple-600 animate-pulse">
          Acting Driver
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:scale-105 transform transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {!isDocumentUploaded ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
              Upload Your Documents
            </h3>
            <form onSubmit={handleUploadDocuments} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Upload License:</label>
                <input type="file" required className="w-full border rounded px-3 py-2" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded shadow hover:scale-105 transform transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        ) : !isVerified ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <p className="text-lg font-semibold text-gray-700">
              ✅ Documents uploaded successfully! <br /> Please wait for verification.
            </p>

            <button
              onClick={() => setIsVerified(true)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:scale-105 transform transition duration-300"
            >
              (Simulate) Verify Now
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">Create Your Post</h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Fare Details:</label>
                  <input
                    type="text"
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded shadow hover:scale-105 transform transition duration-300"
                >
                  Create Post
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">Your Posts</h3>
              {posts.length === 0 ? (
                <p className="text-gray-600 text-center">No posts created </p>
              ) : (
                <ul className="space-y-2">
                  {posts.map((post, index) => (
                    <li
                      key={index}
                      className="border p-3 rounded shadow hover:scale-105 transform transition duration-300"
                    >
                      👤 <strong>{post.name}</strong> — 📍 {post.location} — 💰 {post.fare}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;


