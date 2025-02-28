---
sidebar_position: 2
---

# Middleware Integration

This guide provides detailed instructions for implementing DarkForest Protocol using the middleware package with various Node.js frameworks.

## Overview

The middleware integration is the recommended approach for Node.js applications. It provides a clean, framework-specific implementation that integrates directly with your application code.

The DarkForest middleware works by:

1. Inspecting incoming requests for AI bot user agents
2. Redirecting identified bots to the DarkForest API
3. Allowing normal requests to proceed through your application

## Prerequisites

Before you begin, make sure you have:

1. An API key from DarkForest Protocol (see [Getting an API Key](../getting-started/quick-start.md#getting-an-api-key))
2. A Node.js application using one of the supported frameworks

## Installation

Install the DarkForest blocker package using npm:

```bash
npm install darkforest-blocker
```

Or using yarn:

```bash
yarn add darkforest-blocker
```

## Express.js Integration

### Basic Implementation

Add the following code to your Express application:

```javascript
const express = require('express');
const { createExpressBlocker } = require('darkforest-blocker/express');

const app = express();

// DarkForest Protocol middleware
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

// Add the middleware before your routes
app.use(darkforestMiddleware);

// Your routes and other middleware...
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Replace `'your-api-key'` with your actual DarkForest API key.

### Advanced Configuration

You can customize the middleware behavior with additional options:

```javascript
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots', 'open-data-crawlers'],
  customBlockedUserAgents: ['custom-bot-pattern', 'another-pattern'],
  statusCode: 302, // HTTP status code for the redirect
  exemptPaths: ['/api', '/public', '/allowed-bots'] // Paths to exempt from blocking
});
```

### TypeScript Support

If you're using TypeScript, you can import the types:

```typescript
import express from 'express';
import { createExpressBlocker } from 'darkforest-blocker/express';
import { BlockerConfig } from 'darkforest-blocker/core/types';

const app = express();

const config: BlockerConfig = {
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
};

const darkforestMiddleware = createExpressBlocker(config);
app.use(darkforestMiddleware);

// Rest of your application...
```

## Next.js Integration

### App Router (Next.js 13+)

Create a middleware file at `middleware.ts` in your project root:

```typescript
import { NextRequest } from 'next/server';
import { createNextMiddleware } from 'darkforest-blocker/next';

// DarkForest Protocol middleware
const darkforestMiddleware = createNextMiddleware({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

export async function middleware(request: NextRequest) {
  return darkforestMiddleware(request);
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

Replace `'your-api-key'` with your actual DarkForest API key.

### Pages Router (Next.js 12 and earlier)

Create a custom server file:

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { createNextMiddleware } = require('darkforest-blocker/next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// DarkForest Protocol middleware
const darkforestMiddleware = createNextMiddleware({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    
    // Apply DarkForest middleware
    const result = await darkforestMiddleware({
      headers: new Headers(req.headers),
      nextUrl: { pathname: parsedUrl.pathname }
    });
    
    if (result) {
      // Middleware returned a response, send it
      res.writeHead(result.status, result.headers.raw());
      res.end(result.body);
      return;
    }
    
    // No redirect, continue with normal request handling
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

Replace `'your-api-key'` with your actual DarkForest API key.

### API Routes

For API routes, you can use the API handler:

```javascript
// pages/api/example.js
import { createNextApiHandler } from 'darkforest-blocker/next';

// DarkForest Protocol API handler
const darkforestHandler = createNextApiHandler({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

export default async function handler(req, res) {
  // Apply DarkForest middleware
  await darkforestHandler(req, res, () => {
    // This will only run if the request is not from an AI bot
    res.status(200).json({ message: 'Hello from API!' });
  });
}
```

## Vercel Edge Integration

Create a middleware file at `middleware.ts` in your project root:

```typescript
import { createVercelEdgeMiddleware } from 'darkforest-blocker/vercel';

// DarkForest Protocol middleware
const darkforestMiddleware = createVercelEdgeMiddleware({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

export default darkforestMiddleware;

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

Replace `'your-api-key'` with your actual DarkForest API key.

## Node.js HTTP/HTTPS Server Integration

For a basic Node.js HTTP or HTTPS server:

```javascript
const http = require('http');
const { createNodeBlocker } = require('darkforest-blocker/node');

// DarkForest Protocol middleware
const darkforestMiddleware = createNodeBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Apply DarkForest middleware
  const handled = await darkforestMiddleware(req, res);
  
  // If the middleware didn't handle the request, continue with normal handling
  if (!handled) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Replace `'your-api-key'` with your actual DarkForest API key.

## Vite Integration

For Vite-based applications, you can use the Vite plugin:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { darkforestVitePlugin } from 'darkforest-blocker/vite';

export default defineConfig({
  plugins: [
    react(),
    darkforestVitePlugin({
      apiKey: 'your-api-key',
      presetCategories: ['ai-search-bots', 'ai-crawl-bots']
    })
  ]
});
```

Replace `'your-api-key'` with your actual DarkForest API key.

## Configuration Options

The middleware accepts the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | (required) | Your DarkForest API key |
| `presetCategories` | array | (required) | Categories of bots to block: `'ai-search-bots'`, `'ai-crawl-bots'`, `'open-data-crawlers'` |
| `customBlockedUserAgents` | array | `[]` | Additional user agent patterns to block |
| `statusCode` | number | `302` | HTTP status code for the redirect |
| `exemptPaths` | array | `[]` | Paths to exempt from blocking |

### Preset Categories

The middleware includes predefined patterns for different categories of AI bots:

#### ai-search-bots

Bots used by AI search engines:

```javascript
[
  'Applebot',
  'Applebot-Extended',
  'DuckAssistBot',
  'Google-Extended',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'OAI-SearchBot',
  'PerplexityBot',
  'PetalBot',
  'YouBot',
  'ChatGPT-User',
  'cohere-ai',
  'PerplexityBot'
]
```

#### ai-crawl-bots

Bots used for AI training data collection:

```javascript
[
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Amazonbot',
  'anthropic-ai',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Crawlspace',
  'Diffbot',
  'FacebookBot',
  'FriendlyCrawler',
  'GPTBot',
  'ICCCrawler',
  'ImagesiftBot',
  'img2dataset',
  'Kangaroo Bot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'omgili',
  'omgilibot',
  'PanguBot',
  'Scrapy',
  'Sidetrade indexer bot',
  'Timpibot',
  'VelenPublicWebCrawler',
  'Webzio-Extended',
  'Bytespider',
  'iaskspider/2.0',
  'ISSCyberRiskCrawler'
]
```

#### open-data-crawlers

Bots used for open data collection:

```javascript
[
  'CCBot'
]
```

## Exempting Specific Paths

You can exempt specific paths from AI bot blocking using the `exemptPaths` option:

```javascript
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  exemptPaths: [
    '/api',           // Exact match for /api
    '^/public',       // Starts with /public
    'robots.txt$',    // Ends with robots.txt
    'sitemap.*\\.xml' // Regex pattern for sitemap files
  ]
});
```

The `exemptPaths` option accepts an array of strings that are compiled into regular expressions.

## Verifying Your Implementation

To verify that your implementation is working correctly:

1. Use cURL to simulate an AI bot request:

```bash
curl -A "GPTBot" http://localhost:3000
```

2. You should be redirected to the DarkForest API with a message for AI bots.

3. Check your DarkForest analytics dashboard to see the recorded visit.

## Troubleshooting

### Common Issues

1. **Middleware not detecting bots**: Ensure the middleware is registered before your routes and other middleware.

2. **TypeScript errors**: Make sure you're importing from the correct subpath (e.g., `darkforest-blocker/express` not just `darkforest-blocker`).

3. **API key issues**: Double-check that your API key is correct and properly configured.

### Debugging

You can enable debug mode to see more information:

```javascript
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  debug: true // Enable debug logging
});
```

With debug mode enabled, the middleware will log information about detected bots and redirects to the console.

## Next Steps

- Learn about [bot patterns](../reference/bot-patterns.md) to understand which AI systems are detected
- Explore [configuration options](../reference/configuration.md) to customize your implementation
- View your [analytics dashboard](https://darkestforest.xyz/dashboard) to track AI bot visits
