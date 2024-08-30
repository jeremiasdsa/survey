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

const Review = ({ neighborhood, street, mayorChoice, councilorChoice, onConfirm, onEdit }) => {
    return (
        <div className="review">
            <h4>Revisão das Respostas</h4>
            <div className="review-item">
                <strong>Bairro:</strong> {neighborhood}
            </div>
            <div className="review-item">
                <strong>Rua:</strong> {street}
            </div>
            <div className="review-item">
                <strong>Candidato a Prefeito:</strong> {toTitleCase(mayorChoice)}
            </div>
            <div className="review-item">
                <strong>Candidato a Vereador:</strong> {toTitleCase(councilorChoice)}
            </div>
            <div className="button-group">
                <button onClick={onEdit}>Editar</button>
                <button onClick={onConfirm}>Salvar</button>
            </div>
        </div>
    );
};

export default Review;