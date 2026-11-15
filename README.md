# Minimalist-Wiki

A minimalist wiki website template built with React and Vite.

Minimalist-Wiki provides a simple way to create and maintain a wiki website without the complexity of traditional wiki platforms. Instead of managing content through an administration panel, users can create and edit articles using Markdown (`.md`) files and update a JSON configuration file to organize their wiki.

The result is a lightweight, clean, and easy-to-manage website focused on what matters most: the content.

## Features

- **Markdown-based articles** — Write and maintain articles using simple `.md` files.
- **JSON-based configuration** — Manage series, categories, languages, themes, and article organization through a JSON file.
- **Multi-series support** — Organize content into separate series, each with its own articles, categories, language, and visual theme.
- **Individual series themes** — Customize the appearance of each series using separate CSS stylesheets.
- **Multi-language interface** — Automatically display interface labels and category names according to the language assigned to each series.
- **Language flags** — Display SVG flags alongside the wiki title to indicate the active series language.
- **Automatic category filtering** — Only display categories containing at least one article in the active series, both on the homepage and in the navigation dropdown.
- **Automatic table of contents** — Generate clickable contents lists from article headings.
- **Article infoboxes** — Display structured information, such as character details, alongside article content, including optional images.
- **Internal article links** — Link between articles using a simple custom Markdown syntax based on article IDs.
- **Fallback images** — Automatically use a generic placeholder when an article does not have an associated image.
- **Minimalist design** — A clean interface with little visual clutter, keeping the focus on the content.
- **No backend required** — Content is stored locally in the project files and bundled into the website.
- **No user management** — No accounts, roles, permission levels, comments, or administrative systems to maintain.

## Philosophy

Minimalist-Wiki is designed for projects that need a wiki without needing an entire wiki platform.

There are no complicated administration panels, user roles, comment systems, or permission settings. Content is managed directly through files, making the template suitable for personal projects, fictional universes, fan wikis, reference websites, and other small content-focused websites.

If you can edit a Markdown file and update JSON, you can maintain your wiki.

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd Minimalist-Wiki
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL where you can preview your wiki.

## Managing Content

All wiki content is managed through Markdown files and a JSON configuration file. You do not need a database or a separate content management system.

### 1. Writing Articles

Create a Markdown (`.md`) file for each article in the appropriate series folder.

For example:

```text
src/
└── content/
    ├── pleasantville/
    │   └── char-giraffe.md
    └── strange-animals/
        └── sa-snake.md
```

Each article uses YAML frontmatter to define its metadata, followed by the article content in Markdown.

Example:

```markdown
---
id: char-giraffe
title: Giraffe
type: character
infobox:
  Name: Giraffe
  image: char-giraffe.jpg
  Species: Plush
  Gender: Female
  Age: 30
---

**Giraffe** is an inhabitant of Pleasantville who works as a waitress at a local pastry shop.

## Appearance

Giraffe is a plush creature covered entirely in soft fur, with an exceptionally gentle texture across her whole body, including her hooves. She occasionally wears a cozy red scarf.

## Personality

Giraffe is deeply empathetic, compassionate, and emotionally intelligent, making her an exceptional listener who easily connects with others.

## Background & Life

Working as a waitress in a pastry shop, Giraffe enjoys her day-to-day employment.

## Trivia

- **Allergies:** Giraffe is allergic to chocolate.
- **Sensory Preferences:** She dislikes loud noises and chaotic, noisy environments.
```

The metadata controls how the article is identified and displayed. The Markdown body contains the actual article text, headings, lists, and other supported Markdown content.

Article metadata supports:

- `id` — The article's unique identifier.
- `title` — The article's display title.
- `type` — The article type, such as `character`, `location`, or `event`.
- `infobox` — Optional structured information displayed alongside the article.

The `image` property belongs inside `infobox` and contains the image filename, not the full path.

### 2. Linking Between Articles

You can link directly to another article within the same series using the custom wiki-link syntax.

The format is:

```markdown
[[article-id|displayed text]]
```

For example, if you want to link to Giraffe from another article:

```markdown
The shop is also [[char-giraffe|Giraffe's]] workplace.
```

The text after the `|` separator is what visitors see and click. The article ID before the separator determines the destination.

When clicked, the link takes visitors to the corresponding article within the current series.

**Important:**

- Use the target article's exact ID from its YAML frontmatter.
- The target article must belong to the same series as the article containing the link.
- You can use any text as the displayed link label.
- Article IDs and URLs remain unchanged when switching interface languages.
- If the target article cannot be found, the displayed text is shown without an active link.

This makes it easy to connect characters, locations, events, and other related content without manually writing URLs.

### 3. Organizing the Wiki

Use `src/data/wiki.json` to define your wiki's series, categories, and article organization.

The configuration determines:

- The default series shown when visitors open the website.
- The available series and their display names.
- The categories available across the wiki.
- Which articles belong to each category within each series.
- The language and visual theme assigned to each series.

Example:

```json
{
  "defaultSeries": "pleasantville",
  "categories": [
    {
      "id": "characters",
      "name": "Characters"
    },
    {
      "id": "locations",
      "name": "Locations"
    },
    {
      "id": "events",
      "name": "Events"
    },
    {
      "id": "stories",
      "name": "Stories"
    },
    {
      "id": "chapter-summaries",
      "name": "Chapter Summaries"
    }
  ],
  "series": [
    {
      "id": "pleasantville",
      "name": "Pleasantville",
      "theme": "pleasantville",
      "language": "pt",
      "categories": {
        "characters": ["char-giraffe"],
        "locations": [],
        "events": ["pv-event-01"],
        "stories": [],
        "chapter-summaries": []
      }
    },
    {
      "id": "strange-animals",
      "name": "Strange Animals",
      "theme": "strange-animals",
      "language": "en",
      "categories": {
        "characters": [],
        "locations": ["sa-forest"],
        "events": [],
        "stories": ["sa-story-01"],
        "chapter-summaries": []
      }
    }
  ]
}
```

Each article ID listed in a series must correspond to an existing Markdown article.

Categories can be shared across multiple series, but each series maintains its own article lists.

**Empty categories are automatically hidden.** Categories without articles will not appear on the homepage or in the Explore navigation dropdown. This allows different series to use different categories without displaying unnecessary empty links.

When adding a new article:

1. Create its Markdown file in the appropriate series folder.
2. Give it a unique article ID.
3. Add its ID to the appropriate category in `wiki.json`.

### 4. Adding Images

Place images in the project's `public/images/` directory.

Article images are organized by series, while generic images are shared across the entire wiki.

Example folder structure:

```text
public/
└── images/
    ├── pleasantville/
    │   └── char-giraffe.jpg
    ├── strange-animals/
    │   └── sa-snake.jpg
    └── generic/
        ├── picture-not-available.png
        └── flags/
            ├── united-kingdom.svg
            └── portugal.svg
```

To associate an image with an article, specify its filename inside the article's `infobox`:

```yaml
infobox:
  Name: Giraffe
  image: char-giraffe.jpg
  Species: Plush
```

Article images are loaded from the corresponding series image folder.

If an article does not specify an image, or its image cannot be loaded, the wiki uses the generic fallback picture defined in `wiki.json`.

### 5. Customizing Themes

Each series can have its own visual theme.

Themes are defined through CSS files inside:

```text
src/
└── themes/
    ├── pleasantville.css
    └── strange-animals.css
```

To assign a theme to a series, add the `theme` property to its entry in `wiki.json`:

```json
{
  "id": "pleasantville",
  "name": "Pleasantville",
  "theme": "pleasantville"
}
```

The theme name must match the corresponding CSS filename, without the `.css` extension.

For example:

- `pleasantville` loads `pleasantville.css`.
- `strange-animals` loads `strange-animals.css`.

Theme styles should be scoped to their respective series using the theme class.

For example, in `pleasantville.css`:

```css
.theme-pleasantville {
  /* Pleasantville-specific styles */
}
```

And in `strange-animals.css`:

```css
.theme-strange-animals {
  /* Strange Animals-specific styles */
}
```

Shared layout styles should remain in the main stylesheet, while series-specific colors, backgrounds, typography, and other visual customizations belong in their respective theme files.

### 6. Configuring Languages and Translations

Each series can have its own interface language.

The language is assigned through the `language` property in `wiki.json`:

```json
{
  "id": "pleasantville",
  "name": "Pleasantville",
  "language": "pt"
}
```

The available languages and their translations are defined in `translations.json`.

Each language entry contains:

- `languageId` — The language identifier used by series.
- `languageName` — The language's display name.
- `flag` — The path to its SVG flag image.
- `categories` — Translations for category names.
- `staticText` — Translations for interface labels and messages.

Example:

```json
[
  {
    "languageId": "en",
    "languageName": "English",
    "flag": "/images/generic/flags/united-kingdom.svg",
    "categories": [
      {
        "id": "characters",
        "text": "Characters"
      },
      {
        "id": "locations",
        "text": "Locations"
      }
    ],
    "staticText": [
      {
        "id": "welcome",
        "text": "Welcome to {name} Wiki"
      },
      {
        "id": "explore",
        "text": "Explore this series"
      },
      {
        "id": "main-page",
        "text": "Main page"
      },
      {
        "id": "contents",
        "text": "Contents"
      }
    ]
  },
  {
    "languageId": "pt",
    "languageName": "Português",
    "flag": "/images/generic/flags/portugal.svg",
    "categories": [
      {
        "id": "characters",
        "text": "Personagens"
      },
      {
        "id": "locations",
        "text": "Lugares"
      }
    ],
    "staticText": [
      {
        "id": "welcome",
        "text": "Bem-vindo à Wiki de {name}!"
      },
      {
        "id": "explore",
        "text": "Explora esta série"
      },
      {
        "id": "main-page",
        "text": "Página principal"
      },
      {
        "id": "contents",
        "text": "Índice"
      }
    ]
  }
]
```

This is a shortened example. Each language should contain translations for all the interface labels and categories used by the wiki.

The `defaultLanguage` property determines which language is used when a series does not specify a language or when a translation is unavailable.

**Translations apply to the wiki interface**, including navigation, category names, headings, and system messages. Article titles, descriptions, and Markdown content remain as originally written.

Article IDs and URL paths also remain unchanged when switching languages. This keeps links consistent regardless of the selected interface language.

#### Adding Another Language

To add a language:

1. Add its SVG flag to `public/images/generic/flags/`.
2. Add a new language entry to `translations.json`.
3. Provide its category and interface translations.
4. Assign its `languageId` to the appropriate series using the `language` property.

No changes to the React components are necessary when adding additional languages.

### 7. Building for Production

When you're ready to build the website for deployment, run:

```bash
npm run build
```

Vite generates the production-ready website in the `dist/` directory.

You can preview the production build locally with:

```bash
npm run preview
```

The generated static site can be deployed to a static hosting provider that supports client-side routing, with the appropriate fallback configuration for direct article URLs.

## Technology Stack

- [React](https://react.dev/) — User interface
- [Vite](https://vite.dev/) — Development server and build tooling
- [React Router](https://reactrouter.com/) — Client-side navigation
- [React Markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support
- Custom remark plugin — Converts internal wiki-link syntax into navigable article links
- [YAML](https://eemeli.org/yaml/) — Parsing article metadata

## What This Template Doesn't Include

Minimalist-Wiki intentionally avoids features that add complexity to content management:

- User accounts and authentication
- Administrative dashboards
- User roles and permission levels
- Comments and discussion systems
- Database or backend services
- Online article editing

This keeps the project straightforward to understand, customize, and maintain.

## License

See the repository's license file for details.
