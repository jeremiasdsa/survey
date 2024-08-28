import React, { useState } from 'react';
import './Login.css'; // Importa o CSS específico para o componente

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação aprimorada
        if (!name || !pin) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        if (pin.length < 2) {
            setError('O PIN deve ter pelo menos 4 dígitos.');
            return;
        }

        // Limpar erros ao submeter com sucesso
        setError('');
        onLogin(name, pin);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                className={`login-input ${error ? 'error' : ''}`}
                type="text"
                placeholder="Pesquisador (Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className={`login-input ${error ? 'error' : ''}`}
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
            />
            {error && <p className="login-error">{error}</p>}
            <button
                className="login-button"
                type="submit"
                disabled={!name || !pin}>
                Entrar
            </button>
            <div className="login-version">
                <h1>version 1.0</h1>
            </div>
        </form>
    );
};

export default Login;