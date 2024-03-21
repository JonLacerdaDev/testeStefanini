import { useState, useEffect } from 'react';
import { Character } from '../interfaces/Character';
import ImagePlaceholder from '../assets/image-placeholder.webp';

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [houseFilter, setHouseFilter] = useState<string | null>(null);
  const [aliveFilter, setAliveFilter] = useState<boolean | null>(null);
  const [patronusFilter, setPatronusFilter] = useState<string | null>(null);
  const [allPatronuses, setAllPatronuses] = useState<string[]>([]);

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

        const patronuses: string[] = [];
        data.forEach((character:Character) => {
          if (character.patronus && !patronuses.includes(character.patronus)) {
            patronuses.push(character.patronus);
          }
        });
        setAllPatronuses(patronuses);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter(character => {
    if (houseFilter && character.house !== houseFilter) {
      return false;
    }
    if (aliveFilter !== null && character.alive !== aliveFilter) {
      return false;
    }
    if (patronusFilter && character.patronus !== patronusFilter) {
      return false;
    }
    return true;
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="character__container">
      <div>
        <label htmlFor="houseFilter">Filtrar por Casa:</label>
        <select id="houseFilter" onChange={(e) => setHouseFilter(e.target.value)}>
          <option value="">Todas</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
        </select>
      </div>
      <div>
        <label htmlFor="aliveFilter">Filtrar por Vida:</label>
        <select id="aliveFilter" onChange={(e) => setAliveFilter(e.target.value === 'true')}>
          <option value="">Todos</option>
          <option value="true">Vivo</option>
          <option value="false">Morto</option>
        </select>
      </div>
      <div>
        <label htmlFor="patronusFilter">Filtrar por Patrono:</label>
        <select id="patronusFilter" onChange={(e) => setPatronusFilter(e.target.value)}>
          <option value="">Todos</option>
          {allPatronuses.map((patronus, index) => (
            <option key={index} value={patronus}>{patronus}</option>
          ))}
        </select>
      </div>
      {filteredCharacters.map((character: Character, index: number) => (
        <div className="character__card" key={index}>
          <div className="character__details">
            <div className="character__front">
              <h2>{character.name}</h2>
              <img className="character__image" src={character.image ? character.image : ImagePlaceholder} alt={character.name} />
            </div>
            <div className="character__back">
              <div className="character__info">
                <p><strong>Data de Nascimento:</strong> {character.dateOfBirth || 'Desconhecida'}</p>
                <p><strong>Casa:</strong> {character.house || 'Desconhecida'}</p>
                <p><strong>Patrono:</strong> {character.patronus || 'Desconhecido'}</p>
                <p><strong>Ator:</strong> {character.actor}</p>
                <p><strong>Vivo:</strong> {character.alive ? 'Sim' : 'Não'}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
