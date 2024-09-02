import React, { useEffect } from 'react';

const Spinner = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Carregando...
                <div className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
        </div>
    );
};

export default Spinner;
