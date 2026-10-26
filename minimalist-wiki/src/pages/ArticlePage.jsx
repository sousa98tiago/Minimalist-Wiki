import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import wiki from "../data/wiki.json";
import { getArticle } from "../data/articles";

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

  const series = wiki.series.find((item) => item.id === seriesId);

  const article = getArticle(seriesId, articleId);

  if (!series || !article) {
    return (
      <main className="wiki-content">
        <h2>Article not found</h2>
        <p>
          Check that the Markdown file exists and its ID matches the article ID
          in the URL.
        </p>
      </main>
    );
  }

  const infobox = article.infobox ?? {};

  const infoboxEntries = Object.entries(infobox).filter(
    ([, value]) => value !== "" && value != null,
  );

  const hasInfobox = Boolean(article.image) || infoboxEntries.length > 0;

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

          {article.image && (
            <img
              className="infobox-image"
              src={article.image}
              alt={article.imageAlt ?? article.title}
            />
          )}

          {infoboxEntries.length > 0 && (
            <>
              <div className="infobox-section-heading">
                {article.type === "character" ? "Bio" : "Information"}
              </div>

              {infoboxEntries.map(([label, value]) => (
                <div className="infobox-row" key={label}>
                  <strong>{label}</strong>
                  <span>{String(value)}</span>
                </div>
              ))}
            </>
          )}

          {article.type && (
            <>
              <div className="infobox-section-heading">Classification</div>
              <div className="infobox-row">
                <strong>Type</strong>
                <span>{article.type}</span>
              </div>
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
          <div className="article-toc-title">Contents</div>
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
