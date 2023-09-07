
import fs from 'fs';
import path from 'path';

export default async function fetchHelpPage() {
  try {

    const publicPath = path.join(process.cwd(), 'public')

    return fs.readFileSync(`${publicPath}/help/page.md`, 'utf8');;

  } catch (error: any) {
    throw new Error(error);
  }
}
