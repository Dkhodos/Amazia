export const validKeysToUpdate = ["id", "name"];


export function isValidUpdateParams(params: Record<string,string>){
    return Object.keys(params).filter(key => !(validKeysToUpdate.includes(key))).length === 0
}