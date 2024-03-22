import { useState, useEffect } from 'react';
import { Character } from '../../interfaces/Character';
import CharacterFilter  from '../CharacterFilters/CharacterFilters'
import CharacterCard from '../CharacterCard/CharacterCard';

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [houseFilter, setHouseFilter] = useState<string | null | boolean>(null);
  const [aliveFilter, setAliveFilter] = useState<boolean | null | boolean>(null);
  const [patronusFilter, setPatronusFilter] = useState<string | null | boolean>(null);
  const [allPatronuses, setAllPatronuses] = useState<string[]>([]);
	const [applyAnimation, setApplyAnimation] = useState<boolean>(false);

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

	const handleFilterChange = (filterType: string, value: string | boolean | null) => {
		switch (filterType) {
			case 'house':
				setHouseFilter(value === 'Todas' ? null : value);
				break;
			case 'alive':
				setAliveFilter(value === 'Todos' ? null : value === 'true');
				break;
			case 'patronus':
				setPatronusFilter(value === 'Todos' ? null : value);
				break;
			default:
				break;
		}
		setApplyAnimation(true);
    setTimeout(() => {
      setApplyAnimation(false);
    }, 500);
	};

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

  if (loading) return <div className='loading'><p>Carregando</p></div>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='fade-in'>
      <div className='filters'>
        <CharacterFilter
          label="Casa"
          options={["Todas", "Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]}
          onSelect={(value) => handleFilterChange('house', value)}
        />
        <CharacterFilter
          label="Vida"
          options={["Todos", "true", "false"]}
          onSelect={(value) => handleFilterChange('alive', value)}
        />
        <CharacterFilter
          label="Patrono"
          options={["Todos", ...allPatronuses]}
          onSelect={(value) => handleFilterChange('patronus', value)}
        />
      </div>
      <div className="character__container">
      {filteredCharacters.map((character: Character, index: number) => (
        <CharacterCard 
          character={character} 
          className={`character__card ${applyAnimation ? 'filter-animation' : ''}`} 
          key={index}
        />
      ))}
      </div>
    </div>
  );
}

export default CharacterList;
