import fs from "fs";
import path from "path";

const dist = path.resolve("dist/assets");
const files = fs.readdirSync(dist).filter(f => f.endsWith(".js"));

let largest = { file: "", size: 0 };
for (const file of files) {
    const stats = fs.statSync(path.join(dist, file));
    if (stats.size > largest.size) largest = { file, size: stats.size };
}

const sizeKB = (largest.size / 1024).toFixed(2);
if (largest.size > 400 * 1024) { // 400 KB threshold
    console.warn(`⚠️  Warning: ${largest.file} is ${sizeKB} KB`);
} else {
    console.log(`✅ Bundle looks good: largest file ${sizeKB} KB`);
}
