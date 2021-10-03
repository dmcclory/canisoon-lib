import { buildFromFile } from './src/builder';
import { Feature, asLine} from './src/feature';

let e = {
  name: "dialog",
  slug: "dialog",
  globalPercentage: 74.81,
  description: "a cool thing",
  categories: ['DOM', 'HTML5']
}

let dataset = buildFromFile('data/data-2.0.json');

Object.values(dataset).slice(0, 10).map( f => console.log(asLine(f)) );
