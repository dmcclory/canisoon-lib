import { format } from 'date-fns';
import { writeFileSync } from  'fs';

import { fetchRepo, fetchAllHashes, getFileContents, checkoutRevision } from './src/git_loader';

import { latestHashPerWeek }  from './src/timestamp_filtering';

import { buildFromFile } from './src/builder';
import { findDatasets } from './src/loaders';

import { DATASET_PATH } from './src/constants';

const getRelevantHashes = async () => {
  await fetchRepo();
  const hashes = await fetchAllHashes()

  const splitIntoWeeks = latestHashPerWeek(hashes)

  return splitIntoWeeks
}


const createDataFiles = async () => {
  const sundayDatasets = await getRelevantHashes()

  for (const {hash, date} of sundayDatasets) {
    await checkoutRevision(hash)
    const data = await getFileContents('fulldata-json/data-2.0.json')
    writeFileSync(`data/${format(date, 'yyyy_MM_dd')}-data-2.0.json`, data)
    process.stdout.write('.')
  }
}

const rebuildDataset = async () => {
  console.log('loading the weekly datasets...')
  await createDataFiles()
  console.log('writing the ouptut...')
  const dataset = buildFromFile(findDatasets('data/'))
  writeFileSync(DATASET_PATH, JSON.stringify(dataset))
}

rebuildDataset()
