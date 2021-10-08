import { latestHashPerWeek } from "../src/something";

test("partitition by week splits the", () => {
  const hashes = [
    { date: new Date(2021, 7, 7, 7, 0),  hash: '111'},
    { date: new Date(2021, 7, 8, 7, 0),  hash: '222'},
    { date: new Date(2021, 7, 8, 23, 0),  hash: '333'},
    { date: new Date(2021, 7, 9, 7, 0),  hash: '444'},
    { date: new Date(2021, 7, 14, 7, 0), hash: '555'},
    { date: new Date(2021, 7, 15, 7, 0), hash: '666'},
  ]
  const res = latestHashPerWeek(hashes);

  expect(res.length).toBe(2)
  expect(res.map(l => l.hash)).toStrictEqual(['222', '666'])
})


test("partitition by week splits the uses sunday 7PM est as the dividing line", () => {
  const hashes = [
    { date: new Date(2021, 7, 8, 19, 0),  hash: '222'},
    { date: new Date(2021, 7, 8, 19, 30),  hash: '333'},
  ]
  const res = latestHashPerWeek(hashes);
  expect(res.length).toBe(1)
  expect(res.map(l => l.hash)).toStrictEqual(['222'])
})

test("partitition by week fills in missing weeks with the latest available hash", () => {
  const hashes = [
    { date: new Date(2021, 7, 7, 7, 0),  hash: '111'},
    { date: new Date(2021, 7, 29, 7, 0),  hash: '444'},
  ]
  const res = latestHashPerWeek(hashes);
  expect(res.length).toBe(4)
  expect(res.map(l => l.hash)).toStrictEqual(['111', '111', '111', '444'])
})
