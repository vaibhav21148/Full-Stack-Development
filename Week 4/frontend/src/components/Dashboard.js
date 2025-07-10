import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function Dashboard() {
  const [myVideos, setMyVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please login to access your dashboard.');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [myRes, watchLaterRes] = await Promise.all([
          axiosInstance.get('my-videos/', {
            headers: { Authorization: `Token ${token}` },
          }),
          axiosInstance.get('videos/', {
            headers: { Authorization: `Token ${token}` },
          })
        ]);

        setMyVideos(myRes.data);

        const watchLaterFiltered = watchLaterRes.data.filter(video => video.is_in_watch_later);
        setWatchLaterVideos(watchLaterFiltered);

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleWatchLater = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await axiosInstance.post(`videos/${id}/toggle-watch-later/`, {}, {
        headers: { Authorization: `Token ${token}` }
      });
      alert(res.data.message);
      setWatchLaterVideos(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      console.error('Failed to toggle watch later:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Uploaded Videos</h3>

      {myVideos.length === 0 ? (
        <p>You haven’t uploaded any videos yet.</p>
      ) : (
        <div className="row">
          {myVideos.map((video) => (
            <div key={video.id} className="col-md-4 mb-3">
              <div
                className="card shadow-sm h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/video/${video.id}`)}
              >
                <video
                  src={`http://127.0.0.1:8000${video.video_file}`}
                  className="card-img-top"
                  preload="metadata"
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem'
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-5" />
      <h4 className="mb-4">Videos Left to Watch</h4>
      {watchLaterVideos.length === 0 ? (
        <p>You have no videos in your Watch Later list.</p>
      ) : (
        <div className="row">
          {watchLaterVideos.map((video) => (
            <div key={video.id} className="col-md-4 mb-3">
              <div
                className="card shadow-sm h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/video/${video.id}`)}
              >
                <video
                  src={`http://127.0.0.1:8000${video.video_file}`}
                  className="card-img-top"
                  preload="metadata"
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem'
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchLater(video.id);
                    }}
                    style={{
                      backgroundColor: '#3febc9',
                      color: 'black',
                      border: '1px solid #3febc9'
                    }}
                  >
                    Completed Watching ✅
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
