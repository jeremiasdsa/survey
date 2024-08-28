import React from 'react';
import './Review.css';

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
                <strong>Candidato a Prefeito:</strong> {mayorChoice}
            </div>
            <div className="review-item">
                <strong>Candidato a Vereador:</strong> {councilorChoice}
            </div>
            <div className="button-group">
                <button onClick={onEdit}>Editar Respostas</button>
                <button onClick={onConfirm}>Confirmar e Enviar</button>
            </div>
        </div>
    );
};

export default Review;