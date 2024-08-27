import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(name, pin);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Pesquisador (Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
            />
            <button type="submit">Entrar</button>
        </form>
    );
};

export default Login;