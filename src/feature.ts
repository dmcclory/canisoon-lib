
export interface Feature {
  name: string;
  slug: string;
  globalPercentage: number;
  description: string;
  categories: string[];
}

const caniuseUrl = (f: Feature) => {
  return `https://caniuse.com/${f.slug}`
}

export const asLine = (f: Feature) => {
  return `${f.name}: ${f.globalPercentage} (${f.categories.join(", ")}) - refer to: ${caniuseUrl(f)}`
}
