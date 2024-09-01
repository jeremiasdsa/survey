import React, {useState, useEffect} from 'react';
import Modal from "./Modal";
import InputComboBox from './InputComboBox'; // Certifique-se de que o caminho está correto

const Step1 = ({ formData, setFormData, isError }) => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleStartSurvey = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="space-y-2">
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
                <IncomeQuestion
                    formData={formData}
                    handleChange={handleChange}
                    isError={isError}
                />
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onStartSurvey={handleStartSurvey}
                />
            </div>
        </div>
    );
};


/******/

const LocationQuestion = ({ formData, handleChange, isError }) => (
    <div className="">
        {/* Input para o campo "Bairro" */}
        <div className="flex items-end">
            <h4 className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify ">Bairro</h4>
            {isError && !formData.bairro && (
                <h className="text-lg text-red-500 font-bold">*</h>
            )}
        </div>

        <div className="">
            <InputComboBox
                value={formData.bairro || ''}
                onChange={(value) => handleChange('bairro', value)}
                placeholder="Selecione ou digite o bairro"
            />
            {isError && !formData.bairro && (
                <p className="mt-0.5 text-sm font-medium text-red-600 ">Este campo é obrigatório.</p>
            )}
        </div>


        {/*Input para o campo "Rua"   PARA REATIVAR A RUA, LEMBRESSE DE ATUALIZAR O ARRAY DE VALIDACAO DE STEPS NO SURVEYFORM */}
        <div className="mt-2">
            <input
                type="text"
                placeholder="Rua ou outra Informação"
                className="w-full p-3 text-sl border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.rua || ''}
                onChange={(e) => handleChange('rua', e.target.value)}
                // className={`w-full p-3 border ${isError && !formData.rua ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {isError && !formData.rua && (
                <p className="mt-0.5 text-sm font-medium text-green-600 ">Este campo é opcional.</p>
            )}
        </div>
    </div>
);

// export default LocationQuestion;

//****************//


const GenderQuestion = ({formData, handleChange, isError}) => (
    <div className="">
        <div className="flex items-end">
            <h4 className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify ">Gênero</h4>
            {isError && !formData.genero && (
                <h className="text-lg text-red-500 font-bold">*</h>
            )}
        </div>

        <div className="mb-4">
            <div className={`radio-group ${isError && !formData.genero ? 'border-red-500' : ''} flex space-x-4`}>
                <div className="flex items-center">
                    <input
                        id="radio-masculino"
                        type="radio"
                        name="genero"
                        value="Masculino"
                        checked={formData.genero === 'Masculino'}
                        onChange={(e) => handleChange('genero', e.target.value)}
                        className="hidden"
                    />
                    <label htmlFor="radio-masculino"
                           className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="border border-gray-500 rounded-full mr-2 w-5 h-5 flex items-center justify-center">
                    {formData.genero === 'Masculino' && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                </span>
                        <span>Masculino</span>
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="radio-feminino"
                        type="radio"
                        name="genero"
                        value="Feminino"
                        checked={formData.genero === 'Feminino'}
                        onChange={(e) => handleChange('genero', e.target.value)}
                        className="hidden"
                    />
                    <label htmlFor="radio-feminino"
                           className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="border border-gray-500 rounded-full mr-2 w-5 h-5 flex items-center justify-center">
                    {formData.genero === 'Feminino' && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                </span>
                        <span>Feminino</span>
                    </label>
                </div>
            </div>
            {/*{isError && !formData.genero && (*/}
            {/*    <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>*/}
            {/*)}*/}
        {/*</div>*/}

        {/*<div className="mb-4">*/}
        {/*    <div className={`radio-group ${isError && !formData.genero ? 'border-red-500' : ''}`}>*/}
        {/*        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">*/}
        {/*            <input*/}
        {/*                type="radio"*/}
        {/*                name="genero"*/}
        {/*                value="Masculino"*/}
        {/*                checked={formData.genero === 'Masculino'}*/}
        {/*                onChange={(e) => handleChange('genero', e.target.value)}*/}
        {/*                className="mr-2"*/}
        {/*                // className=" mr-2 text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify "*/}
        {/*            />*/}
        {/*            Masculino*/}
        {/*        </label>*/}
        {/*        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">*/}
        {/*            <input*/}
        {/*                type="radio"*/}
        {/*                name="genero"*/}
        {/*                value="Feminino"*/}
        {/*                checked={formData.genero === 'Feminino'}*/}
        {/*                onChange={(e) => handleChange('genero', e.target.value)}*/}
        {/*                className="mr-2"*/}
        {/*            />*/}
        {/*            Feminino*/}
        {/*        </label>*/}
        {/*    </div>*/}
            {/*{isError && !formData.genero && (*/}
            {/*    <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>*/}
            {/*)}*/}
        </div>
    </div>
);


//**************//


const AgeQuestion = ({formData, handleChange, isError}) => (
        <div className="">
            <div className="flex items-end">
                <h4 className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify ">Faixa
                    Etária</h4>
                {isError && !formData.faixaEtaria && (
                    <h className="text-lg text-red-500 font-bold">*</h>
                )}
            </div>

            <div className={`space-y-0 ${isError && !formData.faixaEtaria ? 'border-red-500' : ''}`}>
                {['16-24 anos',
                    '25-29 anos',
                    '30-39 anos',
                    '40-49 anos',
                    '50 anos ou mais'].map(option => (
                    <div key={option} className="flex items-center w-full">
                        <input
                            id={`radio-${option}`}
                            type="radio"
                            name="faixaEtaria"
                            value={option}
                            checked={formData.faixaEtaria === option}
                            onChange={(e) => handleChange('faixaEtaria', e.target.value)}
                            className="hidden"
                        />
                        <label htmlFor={`radio-${option}`}
                               className="flex items-center w-full text-sm font-semibold text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="border border-gray-500 rounded-full mr-2 w-5 h-5 flex items-center justify-center">
                    {formData.faixaEtaria === option && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                </span>
                            <div className="w-full">
                                <span>{option}</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
;

//******************//


const EducationQuestion = ({formData, handleChange, isError}) => (
    <div className="">
        <div className="flex items-end">
            <h4 className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify ">Escolaridade</h4>
            {isError && !formData.escolaridade && (
                <h className="text-lg text-red-500 font-bold">*</h>
            )}
        </div>

        <div className={`space-y-0 ${isError && !formData.escolaridade ? 'border-red-500' : ''}`}>
            {['Analfabeto',
                'Ensino Fundamental',
                'Ensino Médio',
                'Ensino Superior'].map(option => (
                <div key={option} className="flex items-center w-full">
                    <input
                        id={`radio-${option}`}
                        type="radio"
                        name="escolaridade"
                        value={option}
                        checked={formData.escolaridade === option}
                        onChange={(e) => handleChange('escolaridade', e.target.value)}
                        className="hidden"
                    />
                    <label htmlFor={`radio-${option}`}
                           className="flex items-center w-full text-sm font-semibold text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="border border-gray-500 rounded-full mr-2 w-5 h-5 flex items-center justify-center">
                    {formData.escolaridade === option && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                </span>
                        <div className="w-full">
                            <span>{option}</span>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    </div>
);

//****************** //

const IncomeQuestion = ({formData, handleChange, isError}) => (
    <div className="pb-20 dark:text-zinc-400">
        <div className="flex items-end">
            <h4 className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-0 text-justify ">Renda
                Familiar</h4>
            {isError && !formData.rendaFamiliar && (
                <h className="text-lg text-red-500 font-bold">*</h>
            )}
        </div>

        <div className="">
            <div className={`space-y-0.5 ${isError && !formData.rendaFamiliar ? 'border-red-500' : ''}`}>
                {[
                    {
                        id: 'renda1',
                        value: 'Até 2 salários mínimos (até R$2.824,00)',
                        label: 'Até 2 salários mínimos',
                        description: 'Até R$2.824,00',
                    },
                    {
                        id: 'renda2',
                        value: 'De 2 a 5 salários mínimos (de R$2.824,00 a R$7.060,00)',
                        label: 'De 2 a 5 salários mínimos',
                        description: 'De R$2.824,00 a R$7.060,00',
                    },
                    {
                        id: 'renda3',
                        value: 'Acima de 5 salários mínimos (acima de R$7.060,00)',
                        label: 'Acima de 5 salários mínimos',
                        description: 'Acima de R$7.060,00',
                    }
                ].map(option => (
                    <div key={option.id} className="flex items-center">
                        <input
                            id={option.id}
                            aria-describedby={`${option.id}-text`}
                            type="radio"
                            name="rendaFamiliar"
                            value={option.value}
                            checked={formData.rendaFamiliar === option.value}
                            onChange={(e) => handleChange('rendaFamiliar', e.target.value)}
                            className="hidden"
                        />
                        <label
                            htmlFor={option.id}
                            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full cursor-pointer"
                        >
                <span className="border border-gray-500 rounded-full mr-2 w-5 h-5 flex items-center justify-center">
                    {formData.rendaFamiliar === option.value && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                </span>
                            <div>
                                <span className="font-medium">{option.label}</span>
                                <p id={`${option.id}-text`}
                                   className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                    {option.description}
                                </p>
                            </div>
                        </label>
                    </div>
                ))}
                {/*{isError && !formData.rendaFamiliar && (*/}
                {/*    <p className="text-red-500 text-sm mt-2">Este campo é obrigatório.</p>*/}
                {/*)}*/}
            </div>
        </div>
    </div>
);

export default Step1;
