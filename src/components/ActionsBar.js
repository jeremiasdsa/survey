import React from 'react';
import './TabBar.css';


const ActionsBar = ({ next, prev, step }) => {
    return (
        <div
            className='fixed bottom-2 pb-safe'>
            {step > 1 && step < 4 && <button
                className='dark:bg-blue-700 dark:text-white bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={prev}>Anterior</button>}
            {step <= 3 && <button className='dark:bg-blue-700 dark:text-white bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={next}>{step < 3 ? 'Próximo' : 'Revisar'}</button>}
        </div>
    );
};

export default ActionsBar;
