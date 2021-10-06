import simpleGit from 'simple-git';

import { rm } from  'fs/promises';
import { existsSync } from  'fs';

const REPO_URL = 'https://github.com/Fyrd/caniuse';

const git = simpleGit();

export const fetchRepo = async () => {
  if ( !existsSync('repodata/.git/index')) {
    await rm('./repodata', { recursive: true, force: true})
    await git.clone(REPO_URL, 'repodata')
  }
}


export const fetchAllHashes = async () => {
  await git.cwd({ path: 'repodata', root: true})
  const logs = await git.log()
  return logs.all.map(l => { return { date: l.date, hash: l.hash }})
}



const awesome = async () => {
  await fetchRepo();

  const hashes = await fetchAllHashes()

  console.log(hashes.slice(0, 6))
}

awesome()
