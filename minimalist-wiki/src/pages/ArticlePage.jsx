import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import wikiData from "../data/wiki.json";
import { getArticle } from "../data/articles";
import { getTranslator } from "../data/translations";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getHeadingText(children) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getHeadingText).join("");
  }

  if (children?.props?.children) {
    return getHeadingText(children.props.children);
  }

  return "";
}

export default function ArticlePage() {
  const { seriesId, articleId } = useParams();

  const series = wikiData.series.find((item) => item.id === seriesId);

  const article = getArticle(seriesId, articleId);

  const { t } = getTranslator(
    series?.language ?? wikiData.generic.defaultLanguage,
  );

  if (!series || !article) {
    return (
      <main className="wiki-content">
        <h2>{t("article-not-found")}</h2>
      </main>
    );
  }

  const infobox = article.infobox ?? {};

  const infoboxEntries = Object.entries(infobox).filter(
    ([key, value]) => key !== "image" && value !== "" && value != null,
  );

  const imageFilename = infobox.image;

  const imagePath = imageFilename
    ? `/images/${seriesId}/${imageFilename}`
    : `/images/generic/${wikiData.generic.defaultPicture}`;

  const hasInfobox = Boolean(infobox.image) || infoboxEntries.length > 0;

  const firstHeadingIndex = article.content.search(/^#{2,3}\s+/m);

  const introduction =
    firstHeadingIndex === -1
      ? article.content
      : article.content.slice(0, firstHeadingIndex).trim();

  const remainingContent =
    firstHeadingIndex === -1
      ? ""
      : article.content.slice(firstHeadingIndex).trim();

  const headings = Array.from(
    remainingContent.matchAll(/^(#{2,3})\s+(.+)$/gm),
    (match) => ({
      level: match[1].length,
      title: match[2]
        .replace(/\s+#+\s*$/, "")
        .replace(/\*\*|__|[*_`~]/g, "")
        .trim(),
    }),
  ).map((heading) => ({
    ...heading,
    id: slugify(heading.title),
  }));

  return (
    <main className="wiki-content article-page">
      <div className="article-breadcrumb">
        <Link to={`/series/${series.id}`}>{series.name} Wiki</Link>
        {" › "}
        {article.title}
        <br></br>
        <br></br>
      </div>

      <h2 className="article-title">{article.title}</h2>

      {hasInfobox && (
        <aside className="article-infobox">
          <div className="infobox-title">{article.title}</div>

          <img
            className="infobox-image"
            src={imagePath}
            alt={article.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `/images/generic/${wikiData.generic.defaultPicture}`;
            }}
          />

          {infoboxEntries.length > 0 && (
            <>
              <div className="infobox-section-heading">
                {article.type === "character" ? t("bio") : t("information")}
              </div>

              {infoboxEntries.map(([label, value]) => (
                <div className="infobox-row" key={label}>
                  <strong>{label}</strong>
                  <span>{String(value)}</span>
                </div>
              ))}
            </>
          )}
        </aside>
      )}

      <div className="article-introduction">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {introduction}
        </ReactMarkdown>
      </div>

      {headings.length > 0 && (
        <nav className="article-toc" aria-label="Table of contents">
          <div className="article-toc-title">{t("contents")}</div>
          <ol>
            {headings.map((heading, index) => (
              <li
                key={`${heading.id}-${index}`}
                className={heading.level === 3 ? "toc-subheading" : ""}
              >
                <a href={`#${heading.id}`}>{heading.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="article-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children, ...props }) => {
              const id = slugify(getHeadingText(children));
              return (
                <h2 id={id} {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }) => {
              const id = slugify(getHeadingText(children));
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
          }}
        >
          {remainingContent}
        </ReactMarkdown>
      </div>
    </main>
  );
}
