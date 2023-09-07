
import fs from 'fs';

export default async function fetchHelpPage() {
  try {

    return fs.readFileSync('public/help/page.md', 'utf8');;

  } catch (error: any) {
    throw new Error(error);
  }
}
