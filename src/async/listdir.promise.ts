import { lstat, readdir } from "fs/promises";

console.log("listDirWithSizes PROMISE ---------------------------------------------------");
            
function listDirWithSizes(path: string): void {
    readdir(path)
    .then(files => files.map(file => lstat(`${file}`)
    .then(stats => console.log(file, stats.size/8))))
}
        
listDirWithSizes(".");
        
console.log("-----------------------------------------------------------------------------");