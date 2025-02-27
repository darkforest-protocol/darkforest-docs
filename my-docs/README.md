# DarkForest Protocol Documentation

This repository contains the documentation for the DarkForest Protocol, built with [Docusaurus](https://docusaurus.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or above)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
cd darkforest-docs
npm install
# or
yarn install
```

### Local Development

To start the development server:

```bash
npm start
# or
yarn start
```

This will start a local development server at http://localhost:3000/ and open a browser window. Most changes are reflected live without having to restart the server.

### Build

To build the static site:

```bash
npm run build
# or
yarn build
```

This will generate the static content in the `build` directory that can be served using any static hosting service.

### Deployment

The static site can be deployed to any static hosting service like Vercel, Netlify, GitHub Pages, etc.

## Documentation Structure

The documentation is organized into the following sections:

- **Getting Started**: Quick installation and setup guides
- **Core Concepts**: Understanding how DarkForest works
- **API Reference**: Detailed information about configuration options
- **Guides**: Step-by-step instructions for common tasks
- **Examples**: Real-world implementation examples

## Writing Documentation

### Adding New Pages

1. Create a new Markdown file in the appropriate directory under `docs/`
2. Add front matter at the top of the file:

```md
---
sidebar_position: 1
---

# Your Page Title

Content goes here...
```

### Adding Images

Place images in the `static/img/` directory and reference them in your Markdown:

```md
![Alt Text](/img/your-image.png)
```

### Code Blocks

Use triple backticks with a language identifier for syntax highlighting:

````md
```javascript
// Your code here
const example = "This is a code block";
```
````

### Admonitions

Use the following syntax for admonitions (note, tip, warning, etc.):

```md
:::note
This is a note
:::

:::tip
This is a tip
:::

:::warning
This is a warning
:::
```

## Customization

### Theme

The theme is customized in `src/css/custom.css` and follows the DarkForest Protocol branding.

### Components

Custom React components are located in `src/components/`.

## License

This documentation is licensed under [LICENSE NAME]. See the LICENSE file for details.
