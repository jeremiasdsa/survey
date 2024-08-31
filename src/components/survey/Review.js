import React from 'react';
import './Review.css';

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

            <div className="review-item">
                <strong>Bairro:</strong> {formData.bairro}
            </div>
            <div className="review-item">
                <strong>Rua:</strong> {formData.rua}
            </div>
            <div className="review-item">
                <strong>Gênero:</strong> {toTitleCase(formData.genero)}
            </div>
            <div className="review-item">
                <strong>Faixa Etária:</strong> {toTitleCase(formData.faixaEtaria)}
            </div>
            <div className="review-item">
                <strong>Escolaridade:</strong> {toTitleCase(formData.escolaridade)}
            </div>
            <div className="review-item">
                <strong>Candidato a Prefeito:</strong> {toTitleCase(formData.mayorChoice)}
            </div>
            <div className="review-item">
                <strong>Candidato a Vereador:</strong> {toTitleCase(formData.councilorChoice)}
            </div>

            <div className="button-group flex justify-between">
                <button onClick={onEdit} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Editar</button>
                <button onClick={onConfirm} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Salvar</button>
            </div>
        </div>
    );
};

export default Review;
