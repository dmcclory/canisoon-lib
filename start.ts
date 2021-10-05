import { buildFromFile } from './src/builder';
import { Feature, asLine, detailView} from './src/feature';

import { findDatasets } from './src/loaders';


// obviously I should extract the dates from the file name
// (or git, eventually)
let datasets = [
 { date: new Date(2021, 10, 5),   path: 'data/2021_09_05-data-2.0.json' },
 { date: new Date(2021, 10, 12),  path: 'data/2021_09_12-data-2.0.json' },
 { date: new Date(2021, 10, 19),  path: 'data/2021_09_19-data-2.0.json' },
 { date: new Date(2021, 10, 26),  path: 'data/2021_09_26-data-2.0.json' },
]

// findDatasets('data/')

const dataset = buildFromFile(findDatasets('data/'))

Object.values(dataset).slice(0, 10).map( f => console.log(asLine(f)) );

console.log(detailView(dataset.aac))
