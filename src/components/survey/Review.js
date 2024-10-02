import React, {useEffect} from 'react';

// Função para converter o texto para Title Case
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Review = ({ formData, onConfirm, onEdit }) => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
                Revisão das Respostas
            </h2>

            <div className="space-y-2">
                {/* Localização Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Localização</h3>
                    <p className="text-gray-700 dark:text-gray-300"><span
                        className="font-light text-sm">Bairro:</span> {formData.bairro}</p>
                    {formData.rua && (
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-light text-sm">Rua:</span> {formData.rua}
                        </p>
                    )}
                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-700"/>

                {/* Informações Pessoais Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Informações Pessoais</h3>
                    <p className="text-gray-700 dark:text-gray-300"><span
                        className="font-light text-sm">Gênero:</span> {toTitleCase(formData.genero)}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span
                        className="font-light text-sm">Faixa Etária:</span> {toTitleCase(formData.faixaEtaria)}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span
                        className="font-light text-sm">Escolaridade:</span> {toTitleCase(formData.escolaridade)}</p>
                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-700"/>

                {/* Escolha de Candidatos Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Escolha de Candidatos</h3>
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-light text-sm">1. Prefeito:</span>
                        <span className="ml-1">{toTitleCase(formData.mayorChoice)}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-light text-sm">2. Rejeição:</span>
                        <span className="ml-1">{toTitleCase(formData.aVoidMayorChoice)}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-light text-sm">3. Vereador:</span>
                        <span className="ml-1">{toTitleCase(formData.councilorChoice)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Review;
