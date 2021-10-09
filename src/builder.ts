import { loadRawDataset } from './loaders';

import {
  CaniuseFeatureData,
  CaniuseSnapshot,
  CaniuseData,
  FeatureSummary,
  Feature,
  UsageSnapshot
} from './types';

export const extractHistoricalPercentages = (reports: CaniuseSnapshot[]): {[index: string]: UsageSnapshot[]} => {
  const cool = {} as { [index: string]: UsageSnapshot[] };

  reports.forEach(cs => {
    const date = cs.date
    Object.entries(cs.data).forEach( ([k, v]) => {
      if (cool[k] === undefined) {
        cool[k] = []
      }
      cool[k].push({ date, percentage: v.usage_perc_y })
    })
  })

  return cool;
}

export const build = (reports: CaniuseSnapshot[]): FeatureSummary => {
  const lastSnapshot = reports[reports.length -1];
  const historicalPercentages = extractHistoricalPercentages(reports);
  return (
    Object.fromEntries(
    Object.entries(lastSnapshot.data).map( ([k, v]) => {
      return [k, { 
        slug: k,
        name: v.title,
        latestPercentage: v.usage_perc_y,
        description: v.description,
        categories: v.categories,
        usageSnapshots: historicalPercentages[k],
      }]
    })
  ))
}


export const buildFromFile = (datasets: {date: Date, path: string}[]): FeatureSummary => {
  return build(datasets.map((d: {date: Date, path: string}) => {
    return(
      { date: d.date, data: loadRawDataset(d.path) }
    )
  }))
}
