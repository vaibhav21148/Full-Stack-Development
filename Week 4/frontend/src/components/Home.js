import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
    const user = sessionStorage.getItem('username');
    if (user) setUsername(user);
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`videos/?search=${search}`);
      setVideos(response.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [search]);

  return (
    <div className="container py-4" style={{ minHeight: '80vh' }}>
      <h3 className="mb-3">Hii {username || 'Guest'} 😇</h3>


      <div className="row">
        {videos.map((video) => (
                    <div
              key={video.id}
              className="col-md-4 mb-3"
            >
              <div
                className="card shadow-sm h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/video/${video.id}`)}
              >
                <video
                  src={`http://127.0.0.1:8000${video.video_file}`}
                  className="card-img-top"
                  controls={false}
                  muted
                  preload="metadata"
                  onClick={() => navigate(`/video/${video.id}`)}
                  poster={`http://127.0.0.1:8000${video.video_file}#t=0.5`}
                  playsInline
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                </div>
              </div>
            </div>
        ))}
        {videos.length === 0 && <p>No videos found.</p>}
      </div>
    </div>
  );
}

export default Home;
