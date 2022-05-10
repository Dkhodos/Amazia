import Activities from "../../db/Activities";

function random(max:number, ignore: number[]){
    const ignored = new Set(ignore);
    let tries = 15;

    while(tries-- > 0){
        const num = Math.floor(Math.random() * max);
        if (!ignored.has(num)){
            return num;
        }
    }

    return Math.floor(Math.random() * max);
}

export async function getRandomQuestions(max: number, id: string){
    const ignore = (await (new Activities()).getUserActivities(id));

    return random(max, ignore);
}