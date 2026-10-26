import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import wiki from "../data/wiki.json";

const themeFiles = import.meta.glob("../themes/*.css");

export default function WikiLayout() {
  const location = useLocation();

  // Get the series ID from the current URL.
  const seriesId = location.pathname.match(/^\/series\/([^/]+)/)?.[1];

  // Find the matching series in wiki.json.
  const currentSeries = wiki.series.find((item) => item.id === seriesId);

  // Use the selected series theme, or the default theme.
  const theme = currentSeries?.theme ?? "pleasantville";
  const themePath = `../themes/${theme}.css`;

  // Load the selected theme stylesheet.
  useEffect(() => {
    if (themeFiles[themePath]) {
      themeFiles[themePath]();
    } else {
      console.warn(`Theme "${theme}" was not found.`);
    }
  }, [themePath]);

  // Redirect if the URL doesn't match a series.
  if (!currentSeries) {
    return <Navigate to={`/series/${wiki.defaultSeries}`} replace />;
  }

  return (
    <div className={`wiki theme-${theme}`}>
      <header className="wiki-header">
        <div className="wiki-header-inner">
          <Link className="wiki-title" to={`/series/${currentSeries.id}`}>
            {currentSeries.name} Wiki
          </Link>

          <nav className="wiki-navigation">
            {/* Series dropdown */}
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
                    aria-current={
                      item.id === currentSeries.id ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                aria-haspopup="true"
              >
                Explore <span className="dropdown-arrow" />
              </button>

              <div className="dropdown-menu">
                <Link to={`/series/${currentSeries.id}`}>Main page</Link>

                {wiki.categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/series/${currentSeries.id}/categories/${category.id}`}
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
