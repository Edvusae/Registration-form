import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // 1. Centralized state for form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // 2. Separate state for errors and general messages
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // A generic function to handle changes in any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Improved validation logic
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(response.data.message);
      setFormData({ username: '', password: '' }); // Clear the form on success
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label><br />
          <input
            type="text"
            name="username" // Add the 'name' attribute
            value={formData.username}
            onChange={handleChange} // Use the generic handler
            required
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password" // Add the 'name' attribute
            value={formData.password}
            onChange={handleChange} // Use the generic handler
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default Register;