const path = require("path");
const fs = require("fs/promises");

const TARGET_DIR = path.resolve(__dirname, "../../client/public/faces");
const OUTPUT_DIR = path.resolve(__dirname, "../src/views/questions");

const VARIATIONS_MAX = 40;
const MAX_QUESTIONS = 10;

async function getOptions(){
    return await fs.readdir(TARGET_DIR);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function countArray(arr, value){
    return arr.reduce((acc, current) => {
        if(current === value){
            return acc + 1;
        }
        return acc;
    }, 0)
}

function getID(ids){
    return ids.sort().join("-");
}

function getRandomItem(arr){
    const index = getRandomInt(arr.length - 1);

    return arr[index];
}

function getRandomImage(all, subject, selected){
    let image = "";

    while(true){
        image = getRandomItem(all);

        if(!(selected.has(subject + image))){
            return image;
        }
    }
}

function getRandomAnswers(options, answer){
    let actualOptions = arrayRemove(options, answer);

    let answers = [];
    while(answers.length < 3){
        const random = getRandomItem(actualOptions);
        answers.push(random);

        actualOptions = arrayRemove(actualOptions, random);
    }

    return answers;
}

function getSubjects(options){
    const chosen = [];

    while(chosen.length !== MAX_QUESTIONS){
        const random = getRandomItem(options);

        if(countArray(chosen, random) < 4){
            chosen.push(random);
        }
    }

    return chosen;
}

function getImages(subject){
    return fs.readdir(`${TARGET_DIR}/${subject}`);
}

( async () => {
    const options = await getOptions();

    const variations = [];
    const ids = new Set();

    for(let i = 0; i < VARIATIONS_MAX ; i++){
        const subjects = getSubjects(options);

        const images = new Set();
        let questions = [];
        for (const subject of subjects){
            const allImages = await getImages(subject);

            const image = getRandomImage(allImages, subject, images);

            const otherAnswers = getRandomAnswers(options, subject);

            questions.push({
                image: `faces/${subject}/${image}`,
                answer: subject,
                options: shuffleArray([...otherAnswers, subject]),
            })

            images.add(subject+image);
        }
        
        const id = getID([...images]);
        if(!(ids.has(id))){
            variations.push(questions);
            ids.add(id);
        } else {
            i--;
        }
    }


    await fs.writeFile(`${OUTPUT_DIR}/questions.json`, JSON.stringify(variations, null, 4));
})();