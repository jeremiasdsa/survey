import React from 'react';

const ActionsBar = ({ next, prev, save, step, maxSteps }) => {
    return (
        <div
            // w-full deixa a barra ocupando toda a área
            className="fixed z-50 h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className={`grid h-full max-w-lg ${step <= 1 ? 'grid-cols-2' : 'grid-cols-3'} mx-auto`}>
                {step > 1 && (
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
                        onClick={prev}
                    >
                        <svg
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                                d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/>
                        </svg>
                        <span className="sr-only">Back</span>
                    </button>
                )}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full dark:focus:ring-blue-800"
                    >
                        <p class="text-white"> {step}/{maxSteps}</p>
                        <span className="sr-only">Current Step</span>
                    </button>
                </div>
                <button
                    type="button"
                    className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    onClick={step === maxSteps ? save : next}
                >
                    <svg
                        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                            fill-rule="nonzero"/>
                    </svg>
                    <span className="sr-only">{step === maxSteps ? 'Save' : 'Next'}</span>
                </button>
            </div>
        </div>
    );
};

export default ActionsBar;