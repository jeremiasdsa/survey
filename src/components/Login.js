import React, { useEffect, useRef, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { fireDb } from '../firebase';
import { allowedUsers } from "../data";
import {openDatabase} from "../storage";

// const hash = async (str) => {
//     const utf8 = new TextEncoder().encode(str);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     return hashArray
//         .map((bytes) => bytes.toString(16).padStart(2, '0'))
//         .join('');
// }

const handleLogin = (userData, onLogin) => {
    openDatabase()
        .then(db => {
            let tx = db.transaction('storage', 'readwrite');
            let store = tx.objectStore('storage');

            store.put({id: 'user', ...userData});
        }).catch(err => {
        console.error('[handleLogin]', err);
    });
    //TODO spinner?
    onLogin(userData.username);
}

const Login = ({ onLogin, theme }) => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const nameInputRef = useRef(null);
    const pinInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !pin) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        if (pin.length < 4) {
            setError('O PIN deve ter pelo menos 4 dígitos.');
            return;
        }

        let user;
        try {
            if (allowedUsers[name] && allowedUsers[name].pass === pin) {
                user = allowedUsers[name]
            } else {
                const response = await getDoc(doc(fireDb, "users", name));
                if (!response.exists() || response.data()?.password !== pin) {
                    setError('Usuário ou senha inválidos');
                    return;
                }
                user = response.data();
            }

            setError('');
            handleLogin(user, onLogin);
        } catch (err) {
            setError('Usuário ou senha inválidos');
            console.error(err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                nameInputRef.current && !nameInputRef.current.contains(event.target) &&
                pinInputRef.current && !pinInputRef.current.contains(event.target)
            ) {
                nameInputRef.current.blur();
                pinInputRef.current.blur();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                className="shadow-lg rounded-lg p-8 max-w-xs w-full bg-white dark:bg-gray-800"
                onSubmit={handleSubmit}
            >
                <input
                    ref={nameInputRef}
                    className={`w-full p-3 mb-4 border rounded-md text-lg ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    type="text"
                    placeholder="Pesquisador (Name)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    ref={pinInputRef}
                    className={`w-full p-3 mb-4 border rounded-md text-lg ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    type="password"
                    placeholder="PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <button
                    className={`w-full py-3 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        name && pin
                            ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                    type="submit"
                    disabled={!name || !pin}
                >
                    Entrar
                </button>

                <div className="mt-3 text-center text-xs font-mono text-zinc-900 dark:text-zinc-50">
                    <h1>version 2.2</h1>
                </div>
            </form>
        </div>
    );
};

export default Login;
