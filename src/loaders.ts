import { readFileSync } from 'fs';

import { Feature } from './feature';

import { CaniuseData } from './builder';

export const loadRawDataset = (path: string): CaniuseData => {
  const data = readFileSync(path)
  const res = JSON.parse(data.toString())
  return res.data;
}
