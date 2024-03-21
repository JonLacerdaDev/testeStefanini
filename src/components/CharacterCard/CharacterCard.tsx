import React from 'react';
import { CharacterCardProps } from '../../interfaces/CharacterCard'
import ImagePlaceholder from '../../assets/image-placeholder.webp';

const CharacterCard: React.FC<CharacterCardProps> = ({ character , className}) => {
  return (
    <div className={`character__card ${className}`}>
      <div className="character__details">
        <div className="character__front">
          <h2 className='character__name'>{character.name}</h2>
          <img className="character__image" src={character.image ? character.image : ImagePlaceholder} alt={character.name} />
        </div>
        <div className="character__back">
          <div className="character__info">
            <h2 className='character__title'>Informações</h2>
            <p><strong>Data de Nascimento:</strong> {character.dateOfBirth || 'Desconhecida'}</p>
            <p><strong>Casa:</strong> {character.house || 'Desconhecida'}</p>
            <p><strong>Patrono:</strong> {character.patronus || 'Desconhecido'}</p>
            <p><strong>Ator:</strong> {character.actor}</p>
            <p><strong>Vivo:</strong> {character.alive ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
