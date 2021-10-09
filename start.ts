import { loadDataset } from './src/loaders';
import { asLine, detailView} from './src/feature';



const dataset = loadDataset('dataset.json');

Object.values(dataset).slice(0, 10).map( f => console.log(asLine(f)) );

console.log(detailView(dataset.aac))
