import CharacterFilterProps  from '../../interfaces/CharacterFilter'

const CharacterFilter = ({ label, options, onSelect }:CharacterFilterProps) => {
	
	const mapOptionToLabel = (label: string, option: string): string => {
		if (label === "Vida") {
			switch (option) {
				case 'true':
					return 'Vivo';
				case 'false':
					return 'Morto';
				case 'Todos':
					return 'Todos';
				default:
					return option;
			}
		}
		return option;
	};
	
  return (
    <div>
      <label htmlFor={label}>{`Filtrar por ${label}:`}</label>
      <select id={label} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {mapOptionToLabel(label, option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterFilter;
