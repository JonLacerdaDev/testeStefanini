export default interface CharacterFilterProps {
	label: string;
	options: string[];
	onSelect: (value: string | boolean | null) => void;
}