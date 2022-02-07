import { build, extractHistoricalPercentages } from "../src/builder";


const laterData = {
  wow: { title: "Wow", usage_perc_y: 65, description: "a wonderful feature", categories: ["a", "b"], links: [{"url":"https://en.wikipedia.org/wiki/Advanced_Audio_Coding","title":"Wikipedia article"}] },
  cool: { title: "Cool", usage_perc_y: 95, description: "a very cool feature", categories: ["a", "b"], links: [] },
}

const earlierData = {
  wow: {...laterData.wow, usage_perc_y: 55 },
  cool: {...laterData.cool, usage_perc_y: 85 },
}

const datasetsWithDates = [
  { date: new Date(2021, 9, 1), data: earlierData},
  { date: new Date(2021, 9, 8), data: laterData},
]


test("build returns a map of features", () => {
  const dataset = build(datasetsWithDates)

  expect(Object.keys(dataset)).toStrictEqual(["wow", "cool"])

  const res = dataset.wow
  expect(res.name).toBe("Wow")
  expect(res.slug).toBe("wow")
  expect(res.latestPercentage).toBe(65)
  expect(res.description).toBe("a wonderful feature")
  expect(res.categories).toStrictEqual(["a", "b"])
  expect(res.links.length).toStrictEqual(1)
  expect(Object.keys(res.links[0]).includes("url")).toBeTruthy()
})


test("extractHistoricalPercentages returns a list of usageSnapshots for each feature", () => {

  const res = extractHistoricalPercentages(datasetsWithDates)

  expect(res.wow.map(x => x.percentage)).toStrictEqual([55, 65])
})
