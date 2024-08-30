import React from 'react';
import './HeaderBar.css';

const links = [
    { label: 'Home', href: '/home' },
    { label: 'Recipes', href: '/recipes' },
]

const HeaderBar = () => {
    return (

        <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
            <header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
                <div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
                    <a href='/'>
                        <h1 className='font-medium text-zinc-600'>Pesquisa</h1>
                    </a>

                    <nav className='flex items-center space-x-6'>
                        <div className='hidden sm:block'>
                            <div className='flex items-center space-x-6'>
                                {links.map(({label, href}) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className={`text-sm ${
                                            window.location.pathname === href
                                                ? 'text-indigo-500 dark:text-indigo-400'
                                                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                                        }`}
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div
                            title='Gluten Free'
                            className='h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800'
                            style={{backgroundImage: 'url(/logo.svg)',}}
                        />
                    </nav>
                </div>
            </header>
        </div>
        // <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
        //     <header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
        //         {/*h14 define altura da header*/}
        //         <div className='mx-auto flex h-14 max-w-screen-md items-center justify-between px-6'>
        //             <h1 className='font-medium'>Pesquisa Opnião</h1>
        //
        //             <nav className='flex items-center space-x-6'>
        //                 {/*Eu acho que isso esconde os itens para o mobile*/}
        //                 <div className='hidden sm:block'>
        //                     <div className='flex items-center space-x-6'>
        //                         {/*Eu que aqui ficam links*/}
        //                         <li><a href="/">Home</a></li>
        //                     </div>
        //                 </div>
        //                 <div
        //                     title='Gluten Free'
        //                     className='h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800'
        //                     style={{backgroundImage: 'url(/logo.svg)',}}
        //                 />
        //             </nav>
        //         </div>
        //     </header>
        // </div>

        // <header className="bg-blue-500 text-white p-4 fixed top-0 w-full">
        //     <h1 className="text-lg">My App</h1>
        //     <nav>
        //         <ul>
        //             <li><a href="/">Home</a></li>
        //                 {/*<li><a href="/about">About</a></li>*/}
        //                 {/*<li><a href="/contact">Contact</a></li>*/}
        //             </ul>
        //         </nav>
        //     </header>
    );
};

export default HeaderBar;