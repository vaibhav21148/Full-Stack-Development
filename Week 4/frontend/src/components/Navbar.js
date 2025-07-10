import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [username, setUsername] = useState(sessionStorage.getItem('username') || 'Guest');
  const [search, setSearch] = useState('');

  // Listen to storage events or custom event
  useEffect(() => {
    const syncSession = () => {
      setToken(sessionStorage.getItem('token'));
      setUsername(sessionStorage.getItem('username') || 'Guest');
    };

    window.addEventListener('storage', syncSession);
    window.addEventListener('sessionChanged', syncSession); // custom event

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('sessionChanged', syncSession);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setToken(null);
    setUsername('Guest');
    alert('Logged out');
    window.dispatchEvent(new Event('sessionChanged')); // trigger update
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg px-3" style={{ backgroundColor: '#3febc9' }}>
      <Link className="navbar-brand fw-bold text-dark" to="/">MyTube</Link>

      <form className="d-flex mx-3 w-50" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="So what is in your mind today?"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-dark mx-1" type="submit">Search</button>
      </form>

      <div className="ms-auto d-flex align-items-center">

        {!token ? (
          <>
            <Link to="/login" className="btn btn-outline-dark mx-1">Login</Link>
            <Link to="/register" className="btn btn-outline-dark mx-1">Register</Link>
          </>
        ) : (
          <>
            <Link to="/upload" className="btn btn-outline-dark mx-1">Upload</Link>
            {location.pathname === '/dashboard' ? (
              <Link to="/" className="btn btn-outline-dark mx-1">Home</Link>
            ) : (
              <Link to="/dashboard" className="btn btn-outline-dark mx-1">Dashboard</Link>
            )}
            <button className="btn btn-outline-dark mx-1" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
