import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    video_file: null,
  });
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video_file') {
      setVideoData({ ...videoData, video_file: files[0] });
    } else {
      setVideoData({ ...videoData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) return alert("You're not logged in!");

    console.log("Using token:", token); // ✅ Debug

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('video_file', videoData.video_file);

    try {
      const response = await axios.post('http://localhost:8000/api/videos/upload/', formData, {
        headers: {
          'Authorization': `Token ${token}`,   // ✅ Ensure token is attached
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
      alert('Video uploaded successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.video_file?.[0] ||
        'Video upload failed. Please try again.'
      );
    }
  };

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">Upload Video</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Video Title"
          value={videoData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description (optional)"
          value={videoData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="video_file"
          className="form-control mb-3"
          accept="video/*"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: '#3febc9', color: 'black' }}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
