
export interface UsageSnapshot {
  percentage: number;
  date: Date;
};

export interface Feature {
  name: string;
  slug: string;
  latestPercentage: number;
  description: string;
  categories: string[];
  usageSnapshots: UsageSnapshot[];
}

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
