import React, { useState, useEffect } from 'react';
import videosData from '../data/videos';
import VideoCard from '../components/VideoCard.jsx';
import { loadFromSession, saveToSession } from '../utils/storage';

const Home = () => {
  const [likedVideos, setLikedVideos] = useState(loadFromSession('likes'));
  const [watchLater, setWatchLater] = useState(loadFromSession('watchLater'));

  useEffect(() => {
    saveToSession('likes', likedVideos);
    saveToSession('watchLater', watchLater);
  }, [likedVideos, watchLater]);

  const toggleLike = (id) => {
    setLikedVideos((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleWatchLater = (video) => {
    const exists = watchLater.find(v => v.id === video.id);
    setWatchLater((prev) => exists ? prev.filter(v => v.id !== video.id) : [...prev, video]);
  };

  return (
    <div className="d-flex flex-wrap gap-4">
      {videosData.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          liked={likedVideos.includes(video.id)}
          inWatchLater={watchLater.some(v => v.id === video.id)}
          onLike={toggleLike}
          onWatchLater={toggleWatchLater}
        />
      ))}
    </div>
  );
};

export default Home;
