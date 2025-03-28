const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.join(__dirname, "templates");  
const destDir = path.join(__dirname, "dist/templates"); 

fs.copy(sourceDir, destDir, { filter: (src) => !src.includes("node_modules") })
  .then(() => console.log("✅ All template files copied successfully!"))
  .catch((err) => console.error("❌ Error copying files:", err));
  
  fs.copyFileSync(
    path.resolve(__dirname, '.npmrc'),
    path.resolve(__dirname, 'dist', '.npmrc')
  );

  