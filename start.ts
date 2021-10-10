import { asLine, detailView} from './src/feature';

import { dataset } from './src';


Object.values(dataset).slice(0, 10).map( f => console.log(asLine(f)) );

console.log(detailView(dataset.aac))
