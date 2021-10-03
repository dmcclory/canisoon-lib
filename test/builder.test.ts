import { build } from "../src/builder";

test("build returns a map of features", () => {

  const input = {
    wow: { title: "Wow", usage_perc_y: 65, description: "a wonderful feature", categories: ["a", "b"] },
    cool: { title: "Cool", usage_perc_y: 95, description: "a very cool feature", categories: ["a", "b"] },
  }

  const dataset = build(input)

  expect(Object.keys(dataset)).toStrictEqual(["wow", "cool"])

  const res = dataset.wow
  expect(res.name).toBe("Wow")
  expect(res.slug).toBe("wow")
  expect(res.latestPercentage).toBe(65)
  expect(res.description).toBe("a wonderful feature")
  expect(res.categories).toStrictEqual(["a", "b"])
})
