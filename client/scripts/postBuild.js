const fs = require("fs/promises");
const path = require("path");


const SRC = path.resolve(__dirname,"../public/faces");
const DEST = path.resolve(__dirname,"../static/assets/faces");

async function safeDeleteDir(route){
    try{
        await fs.rm(route, {recursive: true});
    } catch {}
}

(async() => {
    await safeDeleteDir()
})();

