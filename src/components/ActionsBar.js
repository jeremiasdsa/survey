import React from 'react';
import './TabBar.css';


const ActionsBar = ({ next, prev, step }) => {
    return (
        <div>
            <div className='fixed bottom-2 pb-safe'>
                {step > 1 && step < 4 && <button onClick={prev}>Anterior</button>}
                {step <= 3 && <button onClick={next}>{step < 3 ? 'Próximo' : 'Revisar'}</button>}
            </div>
        </div>
    );
};

export default ActionsBar;
