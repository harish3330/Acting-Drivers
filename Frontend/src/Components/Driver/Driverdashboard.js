import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DriverDashboard() {
  const navigate = useNavigate();
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fare, setFare] = useState("");

  // Fetch posts from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/driver/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleUploadDocuments = (e) => {
    e.preventDefault();
    setIsDocumentUploaded(true);
    alert("Documents uploaded! Waiting for admin verification...");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = { name, location, fare };

    try {
      const res = await fetch("http://localhost:5000/api/driver/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        const savedPost = await res.json();
        setPosts((prev) => [...prev, savedPost]);
        setName("");
        setLocation("");
        setFare("");
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      {/* Top bar */}
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
        {/* Upload Docs */}
        {!isDocumentUploaded ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
              Upload Your Documents
            </h3>
            <form onSubmit={handleUploadDocuments} className="space-y-4">
              <input
                type="file"
                required
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        ) : !isVerified ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
            <p className="text-lg font-semibold text-gray-700">
              ✅ Documents uploaded! Please wait for verification.
            </p>
            <button
              onClick={() => setIsVerified(true)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              (Simulate) Verify Now
            </button>
          </div>
        ) : (
          <>
            {/* Create Post */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
                Create Your Post
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                  placeholder="Fare"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded"
                >
                  Create Post
                </button>
              </form>
            </div>

            {/* Show Posts */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
                Your Posts
              </h3>
              {posts.length === 0 ? (
                <p className="text-gray-600 text-center">No posts created</p>
              ) : (
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="border p-3 rounded shadow flex justify-between"
                    >
                      <span>
                        👤 <strong>{post.name}</strong> — 📍 {post.location}
                      </span>
                      <span>💰 {post.fare}</span>
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
