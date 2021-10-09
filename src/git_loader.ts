import simpleGit from 'simple-git';

import { rm } from  'fs/promises';
import { existsSync, readFileSync } from  'fs';

const REPO_URL = 'https://github.com/Fyrd/caniuse';

const git = simpleGit();

const REPO_PATH = 'repodata'

const FIRST_SHA_WITH_OUR_FORMAT = '6a2303662'

export const fetchRepo = async () => {
  if ( !existsSync(`${REPO_PATH}/.git/index`)) {
    await rm(`./${REPO_PATH}`, { recursive: true, force: true})
    await git.clone(REPO_URL, REPO_PATH)
  }
}


export const fetchAllHashes = async () => {
  await git.cwd({ path: REPO_PATH, root: true})
  const logs = await git.log({ from: FIRST_SHA_WITH_OUR_FORMAT, to: 'main'})
  return logs.all.map(l => { return { date: new Date(l.date), hash: l.hash }})
}


export const checkoutRevision = async (hash: string) => {
  await git.cwd({ path: REPO_PATH, root: true})
  await git.checkout(hash)
}


export const getFileContents = async (path: string) => {
  return readFileSync(`${REPO_PATH}/${path}`)
}
