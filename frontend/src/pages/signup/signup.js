import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [csrftoken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/csrf/');
        const token = response.data.csrftoken;
        console.log('CSRF token:', token);
        setCsrfToken(token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register/', formData, {
        headers: {
          'X-CSRFToken': csrftoken, // Include the CSRF token in the request headers
        },
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
