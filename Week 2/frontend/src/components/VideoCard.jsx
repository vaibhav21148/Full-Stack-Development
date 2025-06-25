import React from 'react';

const VideoCard = ({ video, onLike, onWatchLater, liked, inWatchLater, onRemove }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={video.thumbnail} className="card-img-top" alt={video.title} />
      <div className="card-body">
        <h5 className="card-title">{video.title}</h5>
        <p className="card-text">
          {video.channel}<br />
          {video.views} • {video.time}
        </p>
        {onLike && (
          <button className="btn btn-outline-danger me-2" onClick={() => onLike(video.id)}>
            {liked ? '❤️ Liked' : '🤍 Like'}
          </button>
        )}
        {onWatchLater && (
          <button className="btn btn-outline-secondary" onClick={() => onWatchLater(video)}>
            {inWatchLater ? '✔ Added' : '➕ Watch Later'}
          </button>
        )}
        {onRemove && (
          <button className="btn btn-danger mt-2" onClick={() => onRemove(video.id)}>
            ❌ Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCard;