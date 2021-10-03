import { readFileSync } from 'fs';

import { Feature } from './feature'
import { CaniuseData  } from './builder'

export const loadDataset = (path: string): Feature[] => {

  const data = readFileSync(path)
  const res = JSON.parse(data.toString())

  return Object.entries(res.data).map(data => {
    const [k, d]: [string, any] = data;
    return {
      slug: k,
      name: d.title,
      latestPercentage: d.usage_perc_y,
      description: d.description,
      categories: d.categories,
    }
  })
}

export const loadRawDataset = (path: string): CaniuseData => {
  const data = readFileSync(path)
  const res = JSON.parse(data.toString())
  return res;
}
