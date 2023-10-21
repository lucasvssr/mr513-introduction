import { lstat, readdir } from "fs";

console.log("listDirWithSizes CALLBACK ---------------------------------------------------");
        
function listDirWithSizes(path: string): void {
    readdir(path, (err, files) => {
        if (err) throw err
        files.map(file => lstat(`${file}`, (err, stats) => {
            if (err)
              console.log(err);
            else {
              console.log(file, stats.size/8);
            }}
        ))
    })
}

listDirWithSizes(".");
    
console.log("-----------------------------------------------------------------------------");