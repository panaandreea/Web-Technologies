import { promises as fs } from "fs";

function rleEncode(text) {
  if (text.length === 0) return "";

  let out = "";
  let count = 1;

  const escapeChar = (ch) => (ch === "\\" || /[0-9]/.test(ch) ? "\\" + ch : ch);

  for (let i = 1; i <= text.length; i++) {
    const same = text[i] === text[i - 1];
    if (same) {
      count++;
    } else {
      out += String(count) + escapeChar(text[i - 1]);
      count = 1;
    }
  }
  return out;
}

async function main() {
  const [inp, out] = process.argv.slice(2);
  if (!inp || !out) {
    console.error("Usage: node rle_compress.js <inputPath> <outputPath>");
    process.exit(1);
  }

  const data = await fs.readFile(inp, "utf8");
  const encoded = rleEncode(data);
  await fs.writeFile(out, encoded, "utf8");
  console.log(`Compressed ${inp} -> ${out} (original: ${data.length} chars, RLE: ${encoded.length} chars)`);
}

main().catch((err) => {
  console.error("Compression failed:", err.message);
  process.exit(1);
});
