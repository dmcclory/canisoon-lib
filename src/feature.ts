import { UsageSnapshot, Feature } from './types'

const caniuseUrl = (f: Feature) => {
  return `https://caniuse.com/${f.slug}`
}

export const asLine = (f: Feature) => {
  return `${f.name}: ${f.latestPercentage} (${f.categories.join(", ")}) - refer to: ${caniuseUrl(f)}`
}

export const detailView = (f: Feature) => {
  return `
  ${f.name}\n
  ----
  ${f.categories.join(", ")}\n
  ${f.usageSnapshots.map( us => `${us.percentage}`).join(", ")}\n
  `
}
