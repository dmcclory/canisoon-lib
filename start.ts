

interface Feature {
  name: string;
  slug: string;
  globalPercentage: number;
  description: string;
  categories: string[];
}

const caniuseUrl = (f: Feature) => {
  return `https://caniuse.com/${f.slug}`
}

const asLine = (f: Feature) => {
  return `${f.name}: ${f.globalPercentage} (${f.categories.join(", ")}) - refer to: ${caniuseUrl(f)}`
}

let e = {
  name: "dialog",
  slug: "dialog",
  globalPercentage: 74.81,
  description: "a cool thing",
  categories: ['DOM', 'HTML5']
}

console.log(asLine(e))
