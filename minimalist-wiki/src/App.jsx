import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import wiki from "./data/wiki.json";
import WikiLayout from "./components/WikiLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/series/${wiki.defaultSeries}`} replace />}
        />

        <Route path="/series/:seriesId" element={<WikiLayout />}>
          <Route index element={<HomePage />} />

          <Route path="categories/:categorySlug" element={<CategoryPage />} />

          <Route path="articles/:articleId" element={<ArticlePage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={`/series/${wiki.defaultSeries}`} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
