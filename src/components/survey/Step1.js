import React, {useState} from 'react';
import Modal from "./Modal";
import InputComboBox from './InputComboBox'; // Certifique-se de que o caminho está correto

const Step1 = ({ formData, setFormData, isError }) => {

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
        <div className="mt-4">
            <InputComboBox
                value={formData.bairro || ''}
                onChange={(value) => handleChange('bairro', value)}
                placeholder="Selecione ou digite o bairro"
            />
            {isError && !formData.bairro && (
                <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>
            )}
        </div>


         {/*Input para o campo "Rua"   PARA REATIVAR A RUA, LEMBRESSE DE ATUALIZAR O ARRAY DE VALIDACAO DE STEPS NO SURVEYFORM */}
        <div className="mt-4 ">
            <input
                type="text"
                placeholder="Rua ou outra Informação"
                className="w-full p-3 text-sl border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.rua || ''}
                onChange={(e) => handleChange('rua', e.target.value)}
                // className={`w-full p-3 border ${isError && !formData.rua ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {isError && !formData.rua && (
                <p className="mt-0.5 text-green-500 text-sm">Este campo é opcional.</p>
            )}
        </div>
    </div>
);

// export default LocationQuestion;

//****************//


const GenderQuestion = ({formData, handleChange, isError}) => (
    <div className="">
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
                <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);


//**************//


const AgeQuestion = ({ formData, handleChange, isError }) => (
    <div className="">
        <h4 className="font-medium">Faixa Etária</h4>
        <div className="mb-4">
            <div className={`space-y-2 ${isError && !formData.faixaEtaria ? 'border-red-500' : ''}`}>
                {['16-24 anos',
                    '25-29 anos',
                    '30-39 anos',
                    '40-49 anos',
                    '50 anos ou mais'].map(option => (
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
                <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

//******************//


const EducationQuestion = ({ formData, handleChange, isError }) => (
    <div className="">
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
                <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

//****************** //

const IncomeQuestion = ({ formData, handleChange, isError }) => (
    <div className="dark:text-zinc-400">
        <h4 className="font-medium">Renda Familiar</h4>

        <div className="mb-4">
            <div className={`space-y-4 ${isError && !formData.rendaFamiliar ? 'border-red-500' : ''}`}>
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
                    <div key={option.id} className="flex">
                        <div className="flex items-center h-5">
                            <input
                                id={option.id}
                                aria-describedby={`${option.id}-text`}
                                type="radio"
                                name="rendaFamiliar"
                                value={option.value}
                                checked={formData.rendaFamiliar === option.value}
                                onChange={(e) => handleChange('rendaFamiliar', e.target.value)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div className="ms-2 text-sm">
                            <label htmlFor={option.id} className="font-medium text-gray-900 dark:text-gray-300">
                                {option.label}
                            </label>
                            <p id={`${option.id}-text`} className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                {option.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {isError && !formData.rendaFamiliar && (
                <p className="text-red-500 text-sm mt-0.5">Este campo é obrigatório.</p>
            )}
        </div>
    </div>
);

export default Step1;
