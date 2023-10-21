import { lstat, readdir } from "fs/promises";

console.log("listDirWithSizes PROMISE ---------------------------------------------------");
            
async function listDirWithSizes(path: string): Promise<void> {
	const files = await readdir(path);

	const statsPromises = files.map(async (file) => {
		const fileStats = await lstat(`${path}/${file}`);
		return { file, size: fileStats.size / 8 };
	});
  
	const stats = await Promise.all(statsPromises);
	stats.forEach((stat) => console.log(stat.file, stat.size));
  
}
        
listDirWithSizes(".");
        
console.log("-----------------------------------------------------------------------------");