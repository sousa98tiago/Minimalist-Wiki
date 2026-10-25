import { Link, useParams } from "react-router-dom";

import wiki from "../data/wiki.json";
import { getArticle } from "../data/articles";

export default function CategoryPage() {
  const { seriesId, categorySlug } = useParams();

  const series = wiki.series.find((item) => item.id === seriesId);

  const category = wiki.categories.find((item) => item.id === categorySlug);

  if (!series || !category) {
    return (
      <main className="wiki-content">
        <h2>Page not found</h2>
      </main>
    );
  }

  const articleIds = series.categories?.[category.id] ?? [];

  const entries = articleIds
    .map((id) => getArticle(series.id, id))
    .filter(Boolean);

  return (
    <main className="wiki-content">
      <h2>{category.name}</h2>

      {entries.length === 0 ? (
        <p>No entries in this category yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <Link to={`/series/${series.id}/articles/${entry.id}`}>
                {entry.title}
              </Link>

              {entry.description && <p>{entry.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
