import { buildFromFile } from './src/builder';
import { findDatasets } from './src/loaders';
import { asLine, detailView} from './src/feature';



const dataset = buildFromFile(findDatasets('data/'))

Object.values(dataset).slice(0, 10).map( f => console.log(asLine(f)) );

console.log(detailView(dataset.aac))
