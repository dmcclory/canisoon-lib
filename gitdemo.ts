import { format } from 'date-fns';
import { writeFileSync } from  'fs';

import { fetchRepo, fetchAllHashes, getFileContents, checkoutRevision } from './src/git_loader';

import { latestHashPerWeek }  from './src/something';


const getRelevantHashes = async () => {
  await fetchRepo();
  const hashes = await fetchAllHashes()

  const splitIntoWeeks = latestHashPerWeek(hashes)

  console.log(splitIntoWeeks.slice(0, 10))
  return splitIntoWeeks
}


const createDataFiles = async() => {
  const sundayDatasets = await getRelevantHashes()

  for (const {hash, date} of sundayDatasets) {
    await checkoutRevision(hash)
    const data = await getFileContents('fulldata-json/data-2.0.json')
    writeFileSync(`data/${format(date, 'yyyy_MM_dd')}-data-2.0.json`, data)
  }
}

// getRelevantHashes()
createDataFiles()
