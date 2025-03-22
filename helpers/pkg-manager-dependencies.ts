import { execSync } from "child_process";

export function installDependencies(packageManager: string, projectPath: string) {
  try {
    if (packageManager === "bun") {
      try {
        execSync("bun --version", { stdio: "ignore" });
      } catch (error) {
        console.log("❌ bun is not installed. Please install bun by running the following command:");
        console.log("\n   curl -fsSL https://bun.sh/install | bash\n");
        console.log("After installation, please run the command again.");
        process.exit(1);
      }
    }

    console.log(`📦 Installing dependencies using ${packageManager}...`);
    execSync(`${packageManager} install`, { stdio: "inherit", cwd: projectPath });
  } catch (error) {
    if (packageManager === "bun" && error instanceof Error && error.message.includes("command not found")) {
      console.log("❌ bun is not installed. Please install bun by running the following command:");
      console.log("\n   curl -fsSL https://bun.sh/install | bash\n");
      console.log("After installation, please run the command again.");
    } else {
      console.log("❌ Error occurred during dependency installation:", error);
    }
    process.exit(1);
  }
}
