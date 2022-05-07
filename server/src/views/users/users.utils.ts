const validKeysToUpdate = ["id", "name", "currentQuiz", "quizCompleted"];


export function isValidUpdateParams(params: Record<string,string>){
    return Object.keys(params).filter(key => !(validKeysToUpdate.includes(key))).length === 0
}