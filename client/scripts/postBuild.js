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
    await fs.mkdir(DEST);

    const subjects = await fs.readdir(SRC);
    for (const subject of subjects){
        await fs.mkdir(path.join(DEST, subject));

        const srcImageDir = path.join(SRC, subject);
        const destImageDir = path.join(DEST, subject);

        const images = await fs.readdir(path.join(srcImageDir));
        for (const image of images){
            await fs.copyFile(path.join(srcImageDir, image), path.join(destImageDir, image));
        }
    }
})();

