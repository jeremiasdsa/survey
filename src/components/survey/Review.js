import React from 'react';

// Função para converter o texto para Title Case
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Review = ({ formData, onConfirm, onEdit }) => {
    return (
        <div className="review space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Revisão das Respostas</h4>

            <div>
                <strong>Bairro:</strong> {formData.bairro}
            </div>
            <div>
                <strong>Rua:</strong> {formData.rua}
            </div>
            <div>
                <strong>Gênero:</strong> {toTitleCase(formData.genero)}
            </div>
            <div>
                <strong>Faixa Etária:</strong> {toTitleCase(formData.faixaEtaria)}
            </div>
            <div>
                <strong>Escolaridade:</strong> {toTitleCase(formData.escolaridade)}
            </div>
            <div>
                <strong>Candidato a Prefeito:</strong> {toTitleCase(formData.mayorChoice)}
            </div>
            <div>
                <strong>Candidato a Vereador:</strong> {toTitleCase(formData.councilorChoice)}
            </div>
        </div>
    );
};

export default Review;
