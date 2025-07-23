import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './css/style.css'

const App = () => {
    return (
        <div>
            <h1>MERN Stack App</h1>
            <Register />
            <Login />
        </div>
    );
};

export default App;
