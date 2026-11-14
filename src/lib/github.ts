import { TECH_MAPPING } from "@/data/tech_mapping";

export const FEATURED_TOPIC = "include";

export function getStackTags(topics: string[] = [], limit = 5): string[] {
  const labels = topics.filter((topic) => Object.hasOwn(TECH_MAPPING, topic)).map((topic) => TECH_MAPPING[topic]);

  return [...new Set(labels)].slice(0, limit);
}
