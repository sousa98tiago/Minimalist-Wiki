import { Link, useParams } from "react-router-dom";

import wiki from "../data/wiki.json";
import { getArticle } from "../data/articles";
import { getTranslator } from "../data/translations";

export default function CategoryPage() {
  const { seriesId, categorySlug } = useParams();

  const series = wiki.series.find((item) => item.id === seriesId);

  const categoryInfo = wiki.categories.find((item) => item.id === categorySlug);

  if (!series || !categoryInfo) {
    const { t } = getTranslator(wiki.generic.defaultLanguage);

    return (
      <main className="wiki-content">
        <h2>{t("page-not-found")}</h2>
      </main>
    );
  }

  const { t, category } = getTranslator(
    series.language ?? wiki.generic.defaultLanguage,
  );

  const articleIds = series.categories?.[categoryInfo.id] ?? [];

  const entries = articleIds
    .map((id) => getArticle(series.id, id))
    .filter(Boolean);

  return (
    <main className="wiki-content">
      <h2>{category(categoryInfo.id)}</h2>

      {entries.length === 0 ? (
        <p>{t("no-entries")}</p>
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
