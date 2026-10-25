import { parse } from "yaml";
import wiki from "./wiki.json";

const markdownFiles = import.meta.glob("../content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseArticle(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);

  if (!match) {
    throw new Error("Article is missing YAML frontmatter.");
  }

  const metadata = parse(match[1]) ?? {};
  const content = raw.slice(match[0].length).trim();

  return {
    ...metadata,
    content,
  };
}

const articles = Object.entries(markdownFiles).map(([path, raw]) => {
  const article = parseArticle(raw);

  const seriesFolder = path.match(/\/content\/([^/]+)\//)?.[1];

  const series = wiki.series.find(
    (item) => item.id === seriesFolder?.replace("series-", ""),
  );

  return {
    ...article,
    seriesId: series?.id,
  };
});

export function getArticle(seriesId, articleId) {
  return articles.find(
    (article) => article.seriesId === seriesId && article.id === articleId,
  );
}

export function getArticlesForSeries(seriesId) {
  return articles.filter((article) => article.seriesId === seriesId);
}
