import { Link, useParams } from "react-router-dom";
import wiki from "../data/wiki.json";

export default function HomePage() {
  const { seriesId } = useParams();

  const currentSeries = wiki.series.find((item) => item.id === seriesId);

  if (!currentSeries) {
    return (
      <main className="wiki-content">
        <h2>Series not found</h2>
      </main>
    );
  }

  return (
    <main className="wiki-content">
      <h2>Welcome to {currentSeries.name} Wiki</h2>

      {currentSeries.description && <p>{currentSeries.description}</p>}

      <h3>Explore this series</h3>

      <ul>
        {wiki.categories.map((category) => {
          const entries = currentSeries.categories?.[category.id] ?? [];

          return (
            <li key={category.id}>
              <Link
                to={`/series/${currentSeries.id}/categories/${category.id}`}
              >
                {category.name} ({entries.length})
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
