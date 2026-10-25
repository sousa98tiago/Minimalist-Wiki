import { Link, Navigate, Outlet, useParams } from "react-router-dom";

import wiki from "../data/wiki.json";

export default function WikiLayout() {
  const { seriesId } = useParams();

  const series = wiki.series.find((item) => item.id === seriesId);

  if (!series) {
    return <Navigate to={`/series/${wiki.defaultSeries}`} replace />;
  }

  return (
    <div className="wiki">
      <header className="wiki-header">
        <div className="wiki-header-inner">
          <Link className="wiki-title" to={`/series/${series.id}`}>
            {series.name} Wiki
          </Link>

          <nav className="wiki-navigation">
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                aria-haspopup="true"
              >
                Series <span className="dropdown-arrow" />
              </button>

              <div className="dropdown-menu">
                {wiki.series.map((item) => (
                  <Link
                    key={item.id}
                    to={`/series/${item.id}`}
                    aria-current={item.id === series.id ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                aria-haspopup="true"
              >
                Explore <span className="dropdown-arrow" />
              </button>

              <div className="dropdown-menu">
                <Link to={`/series/${series.id}`}>Main page</Link>

                {wiki.categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/series/${series.id}/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
