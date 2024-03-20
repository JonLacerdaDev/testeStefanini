import { useState, useEffect } from 'react';
import { Character } from '../interfaces/Character';
import ImagePlaceholder from '../assets/image-placeholder.webp';

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        if (!response.ok) {
          throw new Error('Erro ao buscar personagens');
        }
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="character-container">
      {characters.map((character: Character, index: number) => (
        <div className="character" key={index}>
          <img src={character.image ? character.image : ImagePlaceholder} alt={character.name} />
          <h2>{character.name}</h2>
          <p><strong>Data de Nascimento:</strong> {character.dateOfBirth || 'Desconhecida'}</p>
          <p><strong>Casa:</strong> {character.house || 'Desconhecida'}</p>
          <p><strong>Patrono:</strong> {character.patronus || 'Desconhecido'}</p>
          <p><strong>Ator:</strong> {character.actor}</p>
          <p><strong>Vivo:</strong> {character.alive ? 'Sim' : 'Não'}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
