import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('login/', {
        username: formData.username,
        password: formData.password
      });

      const token = response.data.token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', response.data.user.username);

      // 🔄 Trigger event for Navbar to update without reload
      window.dispatchEvent(new Event('sessionChanged'));

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="card p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="form-control mb-2"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: '#3febc9', color: 'black' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
