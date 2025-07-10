import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [inWatchLater, setInWatchLater] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axiosInstance.get(`videos/${id}/`, {
        headers: token ? { Authorization: `Token ${token}` } : {}
      });
      setVideo(response.data);
      setInWatchLater(response.data.is_in_watch_later);
      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.like_count);
      console.log("Loaded video:", response.data);
    } catch (err) {
      console.error('Error fetching video:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`videos/${id}/comments/`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const postComment = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return alert('Login to comment.');
    if (!commentText.trim()) return alert('Write something!');

    try {
      await axiosInstance.post(
        `videos/${id}/comments/`,
        { text: commentText },
        { headers: { Authorization: `Token ${token}` } }
      );
      setCommentText('');
      fetchComments(); // refresh comments
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const toggleWatchLater = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return alert('Please login to use Watch Later.');

    try {
      const res = await axiosInstance.post(`videos/${id}/toggle-watch-later/`, {}, {
        headers: { Authorization: `Token ${token}` }
      });
      alert(res.data.message);
      setInWatchLater(prev => !prev);
    } catch (err) {
      console.error('Watch Later toggle failed:', err);
    }
  };

  const toggleLike = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return alert('Please login to like videos.');

    try {
      const res = await axiosInstance.post(`videos/${id}/toggle-like/`, {}, {
        headers: { Authorization: `Token ${token}` }
      });
      alert(res.data.message);
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error('Like toggle failed:', err);
    }
  };

  if (!video) return <p>Loading video...</p>;

  const videoUrl = video.video_file?.startsWith('/')
    ? `http://127.0.0.1:8000${video.video_file}`
    : video.video_file;

  return (
    <div className="container mt-4 pb-5">
      <div className="card shadow-sm p-4">
        <h3>{video.title}</h3>

        {/* Video Player */}
        {videoUrl ? (
          <video
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="alert alert-danger">Video not available</div>
        )}

        <div className="d-flex mt-3 align-items-center gap-2">
          <button
            className="btn"
            onClick={toggleWatchLater}
            style={{
              backgroundColor: inWatchLater ? '#3febc9' : 'transparent',
              color: 'black',
              // border: `1px solid ${inWatchLater ? '#3febc9' : 'black'}`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!inWatchLater) {
                e.target.style.backgroundColor = '#3febc9';
              }
            }}
            onMouseLeave={(e) => {
              if (!inWatchLater) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {inWatchLater ? '✓ In Watch Later' : '+ Watch Later'}
          </button>

          <button className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`} onClick={toggleLike}>
            ❤️ {likeCount}
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              const link = `${window.location.origin}/video/${id}`;
              navigator.clipboard.writeText(link);
              alert('Link copied to clipboard!');
            }}
          >
            🔗 Share
          </button>

        </div>

        <p className="mt-3 text-muted">{video.description}</p>

        <hr />

        {/* Comments */}
        <div className="mt-4">
          <h5>Comments ({comments.length})</h5>

          <div className="mb-3 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              className="btn"
              onClick={postComment}
              style={{
                backgroundColor: '#3febc9',
                color: 'black',
                border: '1px solid #3febc9'
              }}
            >
              Post
            </button>
          </div>

          {comments.length === 0 && <p>No comments yet.</p>}

          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment.id} className="list-group-item">
                <strong>{comment.user.username}:</strong> {comment.text}
                <br />
                <small className="text-muted">
                  {new Date(comment.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
