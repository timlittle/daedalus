import fs from "fs";
import path from "path";

export default async function fetchHelpPage() {
  // Function to pull the help page from disk
  // Help page is written in Markdown and rendered with the same engine as the editor
  try {
    const publicPath = path.join(process.cwd(), "public");

    return fs.readFileSync(`${publicPath}/help/page.md`, "utf8");
  } catch (error: any) {
    throw new Error(error);
  }
}
