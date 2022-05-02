const fs = require("fs/promises");
const path = require("path");


const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async() => {
    const staticDir = path.resolve(__dirname,"../../server/src/static");

    console.log(`#####  Deleting static dir from server  #####`)
    try{
        await fs.rm(staticDir, {recursive: true});
    } catch{
        console.log(staticDir + " folder doesn't exist");
    }

    console.log(`#####  Moving static dir to server  #####`);

    const command = `move ${path.resolve(__dirname, "../static")} ${path.resolve(__dirname, "../../server/src")}`

    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
})();

