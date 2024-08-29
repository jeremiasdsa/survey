import React, { useState, useEffect, useRef } from 'react';
import './Login.css'; // Importa o CSS específico para o componente
import { doc, getDoc } from "firebase/firestore";
import { fireDb } from '../../firebase';
import { allowedUsers } from "../../data";

const Login = ({ onLogin }) => {
    const [name, setName] = useState('root');
    const [pin, setPin] = useState('P@ssw0rd');
    const [error, setError] = useState('');

    // Crie referências para os inputs
    const nameInputRef = useRef(null);
    const pinInputRef = useRef(null);

    const handleSubmit = async (e) => {
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

        try {
            if (allowedUsers[name] && allowedUsers[name].pass === pin) {
                setError('');
                onLogin(name, pin);
            } else {
                const user = await getDoc(doc(fireDb, "users", name));
                if (!user.exists() || user.data()?.password !== pin) {
                    setError('Usuario ou senha invalidos');
                    return;
                }
            }
        } catch (err) {
            console.error(err);
        }

        setError('');
        onLogin(name, pin);
    };

    // Adicione o useEffect para detectar cliques fora dos inputs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                nameInputRef.current && !nameInputRef.current.contains(event.target) &&
                pinInputRef.current && !pinInputRef.current.contains(event.target)
            ) {
                // Remove o foco dos inputs
                nameInputRef.current.blur();
                pinInputRef.current.blur();
            }
        };

        // Adiciona o evento de clique ao documento
        document.addEventListener('click', handleClickOutside);

        // Limpa o evento ao desmontar o componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
            <input
                ref={nameInputRef}  // Referência para o campo nome
                className={`login-input ${error ? 'error' : ''}`}
                type="text"
                placeholder="Pesquisador (Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                ref={pinInputRef}  // Referência para o campo PIN
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
        </div>
    );
};

export default Login;