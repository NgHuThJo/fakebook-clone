import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function getImmediateSubdirectories(dir) {
  const subdirs = [];

  try {
    const files = await fs.readdir(dir);

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          subdirs.push(file);
        }
      })
    );

    return subdirs;
  } catch (error) {
    console.error(`Error reading subdirectories in ${dir}: ${error.message}`);
    throw error;
  }
}

async function generateExports(dir, relativeDir = ".") {
  let exports = "";

  try {
    const files = await fs.readdir(dir);

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(relativeDir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          exports += await generateExports(filePath, relativePath);
        } else {
          const exportName = path.basename(file, path.extname(file));
          exports += `export { default as ${exportName.replace(
            /-/g,
            "_"
          )} } from "./${relativePath.replace(/\\/g, "/")}";\n`;
        }
      })
    );
  } catch (error) {
    console.error(`Error generating exports for ${dir}: ${error.message}`);
    throw error;
  }

  return exports;
}

export async function generateAssetIndexes() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const assetsDir = path.join(__dirname, "src/assets/images");
    const subdirs = await getImmediateSubdirectories(assetsDir);

    await Promise.all(
      subdirs.map(async (dir) => {
        const dirPath = path.join(assetsDir, dir);
        const outputFilePath = path.join(dirPath, "index.ts");
        const exports = await generateExports(dirPath);
        await fs.writeFile(outputFilePath, exports);
        console.log(`Index for ${dir} generated successfully.`);
      })
    );
  } catch (error) {
    console.error(`Error generating asset indexes: ${error.message}`);
  }
}

generateAssetIndexes();
