import React from 'react';
import { Link } from 'react-router-dom';
import { loadFromSession } from '../utils/storage';

const Navbar = () => {
  const watchLaterList = loadFromSession('watchLater');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyTube</Link>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '300px' }} />
        <Link to="/watch-later" className="btn btn-outline-primary">
          Watch Later ({watchLaterList.length})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;