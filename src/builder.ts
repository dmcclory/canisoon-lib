import { Feature } from './feature';
import { loadRawDataset } from './loaders';

export interface CaniuseFeatureData {
  title: string;
  usage_perc_y: number;
  description: string;
  categories: string[];
}


export interface CaniuseData { 
  [index: string]: CaniuseFeatureData
}


export const build = (reports: CaniuseData): { [index: string]:  Feature } => {
  return (
    Object.fromEntries(
    Object.entries(reports).map( ([k, v]) => {
      return [k, { 
        slug: k,
        name: v.title,
        latestPercentage: v.usage_perc_y,
        description: v.description,
        categories: v.categories,
      }]
    })
  ))
}


export const buildFromFile = (path: string):  { [index: string]:  Feature } => {
  const { data } = loadRawDataset(path);
  return build(data);
}
