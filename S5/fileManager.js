import fs from "fs";
import { rimraf } from "rimraf"; 

const folderPath = "./testFolder";
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log("✅ Director creat:", folderPath);
}

const filePath = `${folderPath}/hello.txt`;
fs.writeFileSync(filePath, "Salut din Node.js 👋", "utf-8");
console.log("✅ Fișier creat:", filePath);

const content = fs.readFileSync(filePath, "utf-8");
console.log("📄 Conținut fișier:", content);

await rimraf(folderPath);
console.log("🗑️ Director șters:", folderPath);
