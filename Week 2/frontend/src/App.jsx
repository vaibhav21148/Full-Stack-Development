import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import WatchLater from './pages/WatchLater.jsx';
import Footer from './components/Footer.jsx';
import Timer from './components/Timer.jsx';

function App() {
  const [watchLater] = useState(() => {
    const stored = sessionStorage.getItem("watchLater");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar watchLaterCount={watchLater.length}/>
      <div className="container my-4">
        <Timer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch-later" element={<WatchLater />} />
        </Routes>
      </div>
      <Footer />
    </div>

  );

}

export default App;
