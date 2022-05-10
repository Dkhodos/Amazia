import fs from "fs/promises"
import path from "path";

/* #### DEFAULTS START #### */
const TARGET_DIR = path.resolve(__dirname, "../../client/public/faces");
const OUTPUT_DIR = path.resolve(__dirname, "../assets");

const VARIATIONS_MAX = 40;
const MAX_QUESTIONS = 10;
const MAX_POSSIBLE_ANSWERS = 4;
/* #### DEFAULTS END #### */

/* #### MAIN START #### */
( async () => {
    const variations:Question[][] = [];
    const ids = new Set<string>();

    /* 1. get all the available  answer variations*/
    const allPossibleAnswers = await getAllPossibleAnswers();

    /* 2. get all  possible images */
    const allPossibleImages = await getAllPossibleImages(allPossibleAnswers);

    /* 3. Loop over until you have  VARIATIONS_MAX questions*/
    while(variations.length !== VARIATIONS_MAX){
        const questions:Question[] = [];

        /* 4. pick N images (aka questions)*/
        const images = getRandomImages(allPossibleImages);

        /* 5. for every image select possible answers + add to questions*/
        for (const image of images){
            const answers = getRandomAnswers(allPossibleAnswers, image.src);

            questions.push({
                answer: image.src,
                image: `faces/${image.src}/${image.name}`,
                options: getShuffledArray<string>([image.src, ...answers]),
            })
        }

        /* 6. generate an id and check if it's a uniq quiz, true:add, false: skip */
        const id = getQuizID(questions);
        if(!ids.has(id)){
            ids.add(id);
            variations[variations.length] = questions;
        }
    }

    /* generate a new question.json */
    await fs.writeFile(`${OUTPUT_DIR}/questions.json`, JSON.stringify(variations, null, 4));
})();
/* #### MAIN END #### */


/* #### MODELS START #### */
interface Question{
    image: string,
    answer: string,
    options: string[],
}

interface PossibleImage{
    name: string
    src: string /* sub src folder, example fear/image2.png src = fear */
}
/* #### MODELS END #### */


/* #### HELPERS START #### */
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function arrayRemove<T>(arr: T[], value: T): T[] { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function getShuffledArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    let currentIndex = shuffledArray.length;
    let randomIndex: number = -1;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = getRandomInt(currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }
  
    return shuffledArray;
}

async function getAllPossibleAnswers(){
    return await fs.readdir(TARGET_DIR);
}

async function getAllPossibleImages(allPossibleAnswers: string[]): Promise<PossibleImage[]>{
    const allPossibleImages: PossibleImage[] = [];

    for(const answer of allPossibleAnswers){
        const images = await fs.readdir(`${TARGET_DIR}/${answer}`);

        for (const image of images){
            allPossibleImages.push({
                name: image,
                src: answer,
            })
        }
    }

    return allPossibleImages;
}

function getRandomImages(allPossibleImages: PossibleImage[]){
    return getShuffledArray<PossibleImage>(allPossibleImages).slice(0, MAX_QUESTIONS);
}

function getRandomAnswers(allPossibleAnswers: string[], answer: string){
    const possibleAnswers =  arrayRemove<string>(allPossibleAnswers, answer);

    /* need {MAX_POSSIBLE_ANSWERS - 1} wrong answers */
    return getShuffledArray<string>(possibleAnswers).slice(0, MAX_POSSIBLE_ANSWERS - 1);
}

/* generate and id from all the images name in the quiz */
function getQuizID(questions: Question[]): string{
    return questions.map(q => q.image).sort().reduce((id, current) => id + current, "");
}

/* #### HELPERS END #### */
