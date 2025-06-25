import React, { useState, useEffect } from 'react';
import { loadFromSession, saveToSession } from '../utils/storage';
import VideoCard from '../components/VideoCard';

const WatchLater = () => {
  const [watchLater, setWatchLater] = useState(loadFromSession('watchLater'));

  const removeFromWatchLater = (id) => {
    const updated = watchLater.filter(v => v.id !== id);
    setWatchLater(updated);
    saveToSession('watchLater', updated);
  };

  return (
    <div className="d-flex flex-wrap gap-4">
      {watchLater.length === 0 ? <p>No videos in Watch Later.</p> : watchLater.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          onRemove={removeFromWatchLater}
        />
      ))}
    </div>
  );
};

export default WatchLater;
