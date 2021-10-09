import {
  isBefore,
  nextSunday,
  isSunday,
  eachDayOfInterval,
  addHours,
} from 'date-fns';


import { TimestampedHash } from './types';


const latestBefore = (sortedHashes: TimestampedHash[], date: Date) => {
  let current = sortedHashes[0];

  let dateAt7PM = addHours(date, 19)

  sortedHashes.slice(1).forEach((sh,i) => {
    if (!isBefore(sh.date, dateAt7PM)) {
      return current
    }
    else {
      current = sh;
    }
  })

  return current;
}


export const latestHashPerWeek = (hashes: TimestampedHash[]): TimestampedHash[] => {
  const sortedHashes = [...hashes].sort((a, b) => a.date > b.date ? 1 : -1 )
  const firstDate = sortedHashes[0].date
  const lastDate = sortedHashes[sortedHashes.length - 1].date
  const startsOnSunday = isSunday(firstDate)
  const endsOnSunday = isSunday(lastDate)

  let sundays = eachDayOfInterval({
    start: startsOnSunday ? firstDate : nextSunday(firstDate),
    end: endsOnSunday ? lastDate : nextSunday(lastDate)
  }).filter(s => isSunday(s))

  let res = sundays.map(s => {
    let h = latestBefore(sortedHashes, s)
    return { hash: h.hash, date: s }
  })
  return res;
}
