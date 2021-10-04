import { readFileSync } from 'fs';

import { Feature } from './feature'

export const loadRawDataset = (path: string) => {
  const data = readFileSync(path)
  const res = JSON.parse(data.toString())
  return res;
}
