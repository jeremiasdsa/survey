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
                        <span className="font-light text-sm">Prefeito:</span>
                        <span className="ml-1">{toTitleCase(formData.mayorChoice)}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-light text-sm">Vereador:</span>
                        <span className="ml-1">{toTitleCase(formData.councilorChoice)}</span>
                    </p>
                </div>
            </div>

            {/*<div className="mt-8 text-center">*/}
            {/*    <button*/}
            {/*        onClick={onEdit}*/}
            {/*        className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 mr-2"*/}
            {/*    >*/}
            {/*        Editar*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        onClick={onConfirm}*/}
            {/*        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"*/}
            {/*    >*/}
            {/*        Confirmar*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
        // <div className="review space-y-4">
        //
        //     <h4 className="text-lg font-sans font-semibold text-gray-700 dark:text-gray-300 mb-0 text-justify">
        //         Revisão das Respostas</h4>
        //
        //     <div>
        //         <strong>Bairro:</strong> {formData.bairro}
        //     </div>
        //     <div>
        //         <strong>Rua:</strong> {formData.rua}
        //     </div>
        //     <div>
        //         <strong>Gênero:</strong> {toTitleCase(formData.genero)}
        //     </div>
        //     <div>
        //         <strong>Faixa Etária:</strong> {toTitleCase(formData.faixaEtaria)}
        //     </div>
        //     <div>
        //         <strong>Escolaridade:</strong> {toTitleCase(formData.escolaridade)}
        //     </div>
        //     <div>
        //         <strong>Candidato a Prefeito:</strong> {toTitleCase(formData.mayorChoice)}
        //     </div>
        //     <div>
        //         <strong>Candidato a Vereador:</strong> {toTitleCase(formData.councilorChoice)}
        //     </div>
        // </div>
    );
};

export default Review;
