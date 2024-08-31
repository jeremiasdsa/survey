import React from 'react';

const Step1 = ({ formData, setFormData, isError }) => {

    const handleChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value
        });
    };

    return (
        <div className="space-y-6">
            <LocationQuestion
                formData={formData}
                handleChange={handleChange}
                isError={isError}
            />
            <GenderQuestion
                formData={formData}
                handleChange={handleChange}
                isError={isError}
            />
            <AgeQuestion
                formData={formData}
                handleChange={handleChange}
                isError={isError}
            />
            <EducationQuestion
                formData={formData}
                handleChange={handleChange}
                isError={isError}
            />
        </div>
    );
};


/******/


const LocationQuestion = ({ formData, handleChange, isError }) => (
    <div className="dark:text-zinc-400">
        <h4 className="font-medium">Localização</h4>
        <div className="mt-4 space-y-1 space-y-2 text-sm font-medium text-zinc-700">
            <input
                type="text"
                placeholder="Bairro Lagoa"
                value={formData.bairro || ''}
                onChange={(e) => handleChange('bairro', e.target.value)}
                className={`w-full p-3 border ${isError && !formData.bairro ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600`}
            />
            {isError && !formData.bairro && (
                <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>
            )}
        </div>

        <div className="mt-4 space-y-1 space-y-2 text-sm font-medium text-zinc-700">
            <input
                type="text"
                placeholder="Rua"
                value={formData.rua || ''}
                onChange={(e) => handleChange('rua', e.target.value)}
                className={`w-full p-3 border ${isError && !formData.rua ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600`}
            />
            {isError && !formData.rua && (
                <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

//****************//


const GenderQuestion = ({formData, handleChange, isError}) => (
    <div className="dark:text-zinc-400">
        <h4 className="font-medium">Gênero</h4>
        <div className="mb-4">
            <div className={`radio-group ${isError && !formData.genero ? 'border-red-500' : ''}`}>
                <label className="block">
                    <input
                        type="radio"
                        name="genero"
                        value="Masculino"
                        checked={formData.genero === 'Masculino'}
                        onChange={(e) => handleChange('genero', e.target.value)}
                        className="mr-2"
                    />
                    Masculino
                </label>
                <label className="block">
                    <input
                        type="radio"
                        name="genero"
                        value="Feminino"
                        checked={formData.genero === 'Feminino'}
                        onChange={(e) => handleChange('genero', e.target.value)}
                        className="mr-2"
                    />
                    Feminino
                </label>
            </div>
            {isError && !formData.genero && (
                <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);


//**************//


const AgeQuestion = ({ formData, handleChange, isError }) => (
    <div className="dark:text-zinc-400">
        <h4 className="font-medium">Faixa Etária</h4>
        <div className="mb-4">
            <div className={`space-y-2 ${isError && !formData.faixaEtaria ? 'border-red-500' : ''}`}>
                {['16-24 anos', '25-29 anos', '30-39 anos', '40-49 anos', '50 anos ou mais'].map(option => (
                    <label key={option} className="block">
                        <input
                            type="radio"
                            name="faixaEtaria"
                            value={option}
                            checked={formData.faixaEtaria === option}
                            onChange={(e) => handleChange('faixaEtaria', e.target.value)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ))}
            </div>
            {isError && !formData.faixaEtaria && (
                <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

//******************//


const EducationQuestion = ({ formData, handleChange, isError }) => (
    <div className="dark:text-zinc-400">
        <h4 className="font-medium">Escolaridade</h4>

        <div className="mb-4">
            <div className={`space-y-2 ${isError && !formData.escolaridade ? 'border-red-500' : ''}`}>
                {['Analfabeto',
                    'Ensino Fundamental',
                    'Ensino Médio',
                    'Ensino Superior'].map(option => (
                    <label key={option} className="block">
                        <input
                            type="radio"
                            name="escolaridade"
                            value={option}
                            checked={formData.escolaridade === option}
                            onChange={(e) => handleChange('escolaridade', e.target.value)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ))}
            </div>
            {isError && !formData.escolaridade && (
                <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

export default Step1;
