import { Link, useParams } from "react-router-dom";

import wiki from "../data/wiki.json";
import { getTranslator } from "../data/translations";

export default function HomePage() {
  const { seriesId } = useParams();

  const currentSeries = wiki.series.find((item) => item.id === seriesId);

  if (!currentSeries) {
    const { t } = getTranslator(wiki.generic.defaultLanguage);

    return (
      <main className="wiki-content">
        <h2>{t("series-not-found")}</h2>
      </main>
    );
  }

  const { t, category } = getTranslator(
    currentSeries.language ?? wiki.generic.defaultLanguage,
  );

  return (
    <main className="wiki-content">
      <h2>{t("welcome", { name: currentSeries.name })}</h2>

      {currentSeries.description && <p>{currentSeries.description}</p>}

      <h3>{t("explore")}</h3>

      <ul>
        {wiki.categories
          .filter((item) => {
            const entries = currentSeries.categories?.[item.id] ?? [];
            return entries.length > 0;
          })
          .map((item) => {
            const entries = currentSeries.categories[item.id];

            return (
              <li key={item.id}>
                <Link to={`/series/${currentSeries.id}/categories/${item.id}`}>
                  {category(item.id)} ({entries.length})
                </Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
