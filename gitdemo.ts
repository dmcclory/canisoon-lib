import simpleGit from 'simple-git';

import { rm } from  'fs/promises';
import { existsSync } from  'fs';

const git = simpleGit();

const url = 'https://github.com/Fyrd/caniuse';

if ( !existsSync('repodata/.git/index')) {
  await rm('./repodata', { recursive: true, force: true})
  await git.clone(url, 'repodata')
}


// set the current working directory
await git.cwd({ path: 'repodata', root: true})

const neat = await git.log({maxCount: 300})

console.log("loggs! ", Object.keys(neat.all))
