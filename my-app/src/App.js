import React, { useState } from 'react';
import axios from 'axios';
import './css/style.css';

// This is the new Register component.
// It accepts an `onSwitchForm` prop to switch between forms.
const Register = ({ onSwitchForm }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        // Validation logic here...
        let isValid = true;
        let newErrors = {};
        if (!formData.username.trim()) { newErrors.username = 'Username is required.'; isValid = false; }
        if (formData.password.length < 6) 
            { newErrors.password = 'Password must be at least 6 characters.'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e) => {
        // Handle form submission
        e.preventDefault();
        setMessage('');
        setErrors({});
        if (!validateForm()) return;
        setLoading(true);
        // Submit registration data
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage(response.data.message);
            setFormData({ username: '', password: '' });
            
            // Optionally switch to login form after successful registration
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label><br />
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            </form>
            {message && <p>{message}</p>}
            {/* Link to switch to Login form */}
            <p>
                Already have an account?{' '}
                <button onClick={() => onSwitchForm('login')}>Login here</button>
            </p>
        </div>
    );
};

// This is the corrected Login component.
// It also accepts an `onSwitchForm` prop.
const Login = ({ onSwitchForm }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    {/* 3. Handle input changes */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    {/* 4. Validate form inputs */}
    const validateForm = () => {
        // Validation logic here...
        let isValid = true;
        let newErrors = {};
        if (!formData.username.trim()) { newErrors.username = 'Username is required.'; isValid = false; }
        if (!formData.password.trim()) { newErrors.password = 'Password is required.'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            setMessage('✅ Login successful!');
            setFormData({ username: '', password: '' });
        } catch (error) {
            setMessage(error.response?.data?.error || '❌ Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label><br />
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Don't have an account?{' '}
                <button onClick={() => onSwitchForm('register')}>Register here</button>
            </p>
        </div>
    );
};

// This is your new, corrected App.js component.
const App = () => {
    // State to manage which component to display: 'login' or 'register'
    const [currentPage, setCurrentPage] = useState('login');

    return (
        <div className="app-container">
            <h1>MERN Stack App</h1>
            <div className="form-wrapper">
                {/* Conditionally render the Login or Register component */}
                {currentPage === 'login' ? (
                    <Login onSwitchForm={setCurrentPage} />
                ) : (
                    <Register onSwitchForm={setCurrentPage} />
                )}
            </div>
        </div>
    );
};

export default App;