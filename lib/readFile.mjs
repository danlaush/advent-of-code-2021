import fs from "fs"

export const readFileLines = filename =>
   fs.readFileSync(filename)
    .toString('UTF8')
    .split('\n');