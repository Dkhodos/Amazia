export default function isIsraeliIDNumber(id: string){
	return String(id).trim().length === 9;
}