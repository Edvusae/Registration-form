import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // 1. Centralized state for form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // 2. State for errors and messages
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 3. Generic change handler for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // A function to validate the form before submission
    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required.';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 4. Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            // Optionally store token for future use
            localStorage.setItem('token', response.data.token);

            setMessage('✅ Login successful!');
            setFormData({ username: '', password: '' }); // Clear the form on success
        } catch (error) {
            setMessage(
                error.response?.data?.error || '❌ Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    // 5. Render the form
    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;