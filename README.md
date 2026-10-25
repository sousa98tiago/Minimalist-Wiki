# Minimalist-Wiki

A minimalist wiki website template built with React and Vite.

Minimalist-Wiki provides a simple way to create and maintain a wiki website without the complexity of traditional wiki platforms. Instead of managing content through an administration panel, users can create and edit articles using Markdown (`.md`) files and update a JSON configuration file to organize the wiki.

The result is a lightweight, clean, and easy-to-manage website focused on what matters most: the content.

## Features

- **Markdown-based articles** — Write and maintain articles using simple `.md` files.
- **JSON-based configuration** — Manage series, categories, and article organization through a JSON file.
- **Multi-series support** — Organize content into separate series, each with its own articles and categories.
- **Automatic table of contents** — Generate clickable contents lists from article headings.
- **Article infoboxes** — Display structured information, such as character details, alongside article content.
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
    ├── series-a/
    │   └── alice.md
    └── series-b/
        └── ben.md
```

Each article uses YAML frontmatter to define its metadata, followed by the article content in Markdown.

Example:

```markdown
---
id: alice
title: Alice
type: character
image: /images/alice.jpg
infobox:
  Full Name: Alice
  Gender: ""
---

Alice is a curious adventurer who explores the world.

## Appearance

Describe the character's appearance here.

## Personality

Describe the character's personality here.

## Information

Add the character's history and role here.

## Trivia

- Add interesting facts here.
```

The metadata controls how the article is identified and displayed. The Markdown body contains the actual article text, headings, lists, and other supported Markdown content.

### 2. Organizing the Wiki

Use the JSON configuration file to define your wiki's series, categories, and article organization.

For example, the configuration can specify:

- The default series shown when visitors open the website.
- The available series and their display names.
- The categories available across the wiki.
- Which article IDs belong to each category within each series.

Articles are associated with a series, and the JSON configuration determines where they appear in the wiki's navigation.

When adding a new article, create its Markdown file and update the JSON configuration so the article appears in the appropriate category.

### 3. Adding Images

Place article images in the project's public assets directory and reference them in the Markdown frontmatter.

For example:

```yaml
image: /images/alice.jpg
```

### 4. Building for Production

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
