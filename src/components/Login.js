import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { fireDb } from '../firebase';
import { allowedUsers } from "../data";

const Login = ({ onLogin, theme }) => {
    const [name, setName] = useState('root');
    const [pin, setPin] = useState('P@ssw0rd');
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

        try {
            if (allowedUsers[name] && allowedUsers[name].pass === pin) {
                setError('');
                onLogin(name, pin);
            } else {
                const user = await getDoc(doc(fireDb, "users", name));
                if (!user.exists() || user.data()?.password !== pin) {
                    setError('Usuário ou senha inválidos');
                    return;
                }
            }
        } catch (err) {
            console.error(err);
        }

        setError('');
        onLogin(name, pin);
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
        <div className="flex justify-center  items-center min-h-screen ">
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
                    className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="submit"
                    disabled={!name || !pin}
                >
                    Entrar
                </button>

                <div className="mt-3 text-center text-xs font-mono text-zinc-900 dark:text-zinc-50">
                    <h1>version 1.1</h1>
                </div>
            </form>
        </div>
    );
};

export default Login;


//
//
// import React, { useState, useEffect, useRef } from 'react';
// import { doc, getDoc } from "firebase/firestore";
// import { fireDb } from '../firebase';
// import { allowedUsers } from "../data";
// import Modal from './survey/Modal'; // Ensure this import is correct
//
// const Login = ({ onLogin }) => {
//     const [name, setName] = useState('root');
//     const [pin, setPin] = useState('P@ssw0rd');
//     const [error, setError] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const nameInputRef = useRef(null);
//     const pinInputRef = useRef(null);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!name || !pin) {
//             setError('Por favor, preencha todos os campos.');
//             return;
//         }
//         if (pin.length < 4) {
//             setError('O PIN deve ter pelo menos 4 dígitos.');
//             return;
//         }
//
//         try {
//             if (allowedUsers[name] && allowedUsers[name].pass === pin) {
//                 setError('');
//                 setIsModalOpen(true); // Open the modal after successful login
//             } else {
//                 const user = await getDoc(doc(fireDb, "users", name));
//                 if (!user.exists() || user.data()?.password !== pin) {
//                     setError('Usuário ou senha inválidos');
//                     return;
//                 }
//                 setIsModalOpen(true); // Open the modal after successful login
//             }
//         } catch (err) {
//             console.error(err);
//             setError('Ocorreu um erro ao fazer login.');
//         }
//     };
//
//     const handleStartSurvey = () => {
//         setIsModalOpen(false);
//         onLogin(name, pin); // Start the survey after closing the modal
//     };
//
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 nameInputRef.current && !nameInputRef.current.contains(event.target) &&
//                 pinInputRef.current && !pinInputRef.current.contains(event.target)
//             ) {
//                 nameInputRef.current.blur();
//                 pinInputRef.current.blur();
//             }
//         };
//
//         document.addEventListener('click', handleClickOutside);
//
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);
//
//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <form
//                 className="shadow-lg rounded-lg p-8 max-w-xs w-full"
//                 onSubmit={handleSubmit}
//             >
//                 <input
//                     ref={nameInputRef}
//                     className={`w-full p-3 mb-4 border rounded-md text-lg ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     type="text"
//                     placeholder="Pesquisador (Name)"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <input
//                     ref={pinInputRef}
//                     className={`w-full p-3 mb-4 border rounded-md text-lg ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     type="password"
//                     placeholder="PIN"
//                     value={pin}
//                     onChange={(e) => setPin(e.target.value)}
//                     required
//                 />
//                 {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
//                 <button
//                     className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                     type="submit"
//                     disabled={!name || !pin}
//                 >
//                     Entrar
//                 </button>
//                 <div className="mt-6 text-gray-500 text-center text-xs">
//                     <h1>version 1.1</h1>
//                 </div>
//             </form>
//
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onStartSurvey={handleStartSurvey}
//             />
//         </div>
//     );
// };
//
// export default Login;;