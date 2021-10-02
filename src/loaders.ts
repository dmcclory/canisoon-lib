import { readFileSync } from 'fs';

import { Feature } from './feature'

export const loadDataset = (path: string): Feature[] => {

  const data = readFileSync(path)
  const res = JSON.parse(data.toString())

  return Object.entries(res.data).map(data => {
    const [k, d]: [string, any] = data;
    return {
      slug: k,
      name: d.title,
      globalPercentage: d.usage_perc_y,
      description: d.description,
      categories: d.categories,
    }
  })
}
