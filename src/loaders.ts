import { readFileSync, readdirSync } from 'fs';

import { Feature } from './feature';

import { CaniuseData } from './builder';

export const loadRawDataset = (path: string): CaniuseData => {
  const data = readFileSync(path)
  const res = JSON.parse(data.toString())
  return res.data;
}


export const findDatasets = (path: string): {date: Date, path: string}[] => {
  let jsonFiles: string[] = readdirSync(path).filter(f => f.match(/\.json/))

  let withRawDates = jsonFiles.map( f => {
    let d = f.match(/^(\d+)_(\d+)_(\d+)-/)!
    let date = new Date(Number(d[1]), Number(d[2])-1, Number(d[3]))
    return { date, path: path + '/' + f}
  })

  return withRawDates
}
