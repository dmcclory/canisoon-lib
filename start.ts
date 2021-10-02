

interface FeatureProps {
  name: string;
  slug: string;
  globalPercentage: number;
  description: string;
  categories: string[];
}

class Feature {
  public name: string;
  public slug: string;
  public globalPercentage: number;
  public description: string;
  public categories: string[];

  constructor({ name, slug, globalPercentage, description, categories}: FeatureProps) {
    Object.assign(this, { name, slug, globalPercentage, description, categories});
  }
  // constructor(opts: ) {}

  // slightly
  // one thing that is a little annoying about it is that
  // you can't construct an object and pass it in
  // that may change
  // constructor(
  //   public name: string,
  //   public slug: string,
  //   public globalPercentage: number,
  //   public description: string,
  //   public categories: string[]
  // ) {}

  caniuseUrl() {
    return `https://caniuse.com/${this.slug}`
  }

  asLine() {
    return `${this.name}: ${this.globalPercentage} (${this.categories.join(", ")}) - refer to: ${this.caniuseUrl()}`
  }
}

let e = new Feature({
  name: "dialog",
  slug: "dialog",
  globalPercentage: 74.81,
  description: "a cool thing",
  categories: ['DOM', 'HTML5']
})

console.log(e.asLine())
