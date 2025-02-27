---
sidebar_position: 3
---

# Configuration Options

This page provides a comprehensive reference for all configuration options available in DarkForest Protocol.

## Overview

DarkForest Protocol offers various configuration options to customize its behavior. The available options depend on the integration method you're using, but the core options are consistent across all methods.

## Core Configuration Options

These options are available in all integration methods.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | (required) | Your DarkForest API key |
| `presetCategories` | array | (required) | Categories of bots to block: `'ai-search-bots'`, `'ai-crawl-bots'`, `'open-data-crawlers'` |
| `customBlockedUserAgents` | array | `[]` | Additional user agent patterns to block |
| `statusCode` | number | `302` | HTTP status code for the redirect |
| `exemptPaths` | array | `[]` | Paths to exempt from blocking |

### Example Configuration

```javascript
{
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  customBlockedUserAgents: ['custom-bot-pattern', 'another-pattern'],
  statusCode: 302,
  exemptPaths: ['/robots.txt', '/sitemap.xml', '/api/public']
}
```

## Preset Categories

The `presetCategories` option allows you to specify which categories of AI bots to block. You can include one or more of the following categories:

### ai-search-bots

Bots used by AI-powered search engines:

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

### ai-crawl-bots

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

### open-data-crawlers

Bots used for open data collection:

```javascript
[
  'CCBot'
]
```

## Custom Blocked User Agents

The `customBlockedUserAgents` option allows you to specify additional user agent patterns to block. These patterns are matched as substrings against the user agent string.

```javascript
{
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  customBlockedUserAgents: [
    'custom-bot',
    'another-bot',
    'third-bot'
  ]
}
```

## Status Code

The `statusCode` option allows you to specify the HTTP status code to use for the redirect. The default is `302` (Found), but you can use other redirect status codes like `301` (Moved Permanently) or `307` (Temporary Redirect).

```javascript
{
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  statusCode: 307
}
```

## Exempt Paths

The `exemptPaths` option allows you to specify paths that should be exempt from AI bot blocking. These paths are matched as regular expressions against the request path.

```javascript
{
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  exemptPaths: [
    '/robots.txt',           // Exact match for /robots.txt
    '^/public',              // Starts with /public
    'sitemap.*\\.xml$',      // Matches sitemap.xml, sitemap-0.xml, etc.
    '^/api/(v1|v2)/public'   // Matches /api/v1/public or /api/v2/public
  ]
}
```

## Integration-Specific Options

### Middleware Integration

When using the middleware integration, you can use the following additional options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `debug` | boolean | `false` | Enable debug logging |

```javascript
// Express example
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  debug: true
});
```

### Next.js Integration

When using the Next.js integration, you can configure which paths the middleware runs on using the `matcher` option in your `middleware.ts` file:

```typescript
// middleware.ts
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

### Cloudflare Workers Integration

When using the Cloudflare Workers integration, you can add additional logic to handle specific cases:

```javascript
// Exempt specific paths
const exemptPaths = ['/api', '/public', '/allowed-bots'];
const url = new URL(request.url);
const isExemptPath = exemptPaths.some(path => url.pathname.startsWith(path));

if (isAiBot && !isExemptPath) {
    // Redirect to DarkForest API
    // ...
}
```

## Environment Variables

You can also configure DarkForest Protocol using environment variables. This is useful for keeping sensitive information like API keys out of your code.

```javascript
// Load API key from environment variable
const darkforestMiddleware = createExpressBlocker({
  apiKey: process.env.DARKFOREST_API_KEY,
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});
```

Make sure to set the environment variable in your deployment environment:

```bash
# .env file
DARKFOREST_API_KEY=your-api-key
```

## Configuration Best Practices

### Security

- Store your API key in environment variables, not in your code
- Use HTTPS for all redirects to ensure secure communication
- Regularly update your DarkForest Protocol package to get the latest security updates

### Performance

- Keep the `exemptPaths` list as small as possible to minimize regex matching
- Use simple patterns in `customBlockedUserAgents` to minimize string matching
- Place the DarkForest middleware early in your middleware chain to avoid unnecessary processing

### Compatibility

- Use the default status code (`302`) unless you have a specific reason to change it
- Test your configuration with different user agents to ensure it works as expected
- Consider exempting paths for public APIs or resources that should be accessible to AI systems

## Configuration Examples

### Basic Configuration

```javascript
// Express example
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});
```

### Advanced Configuration

```javascript
// Express example
const darkforestMiddleware = createExpressBlocker({
  apiKey: process.env.DARKFOREST_API_KEY,
  presetCategories: ['ai-search-bots', 'ai-crawl-bots', 'open-data-crawlers'],
  customBlockedUserAgents: ['custom-bot-pattern', 'another-pattern'],
  statusCode: 307,
  exemptPaths: [
    '/robots.txt',
    '/sitemap.xml',
    '^/api/public',
    '^/static',
    'favicon\\.ico$'
  ],
  debug: process.env.NODE_ENV !== 'production'
});
```

### Selective Blocking

```javascript
// Block only AI search bots
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots']
});
```

### Custom User Agents

```javascript
// Block custom user agents
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: [],
  customBlockedUserAgents: ['custom-bot-pattern', 'another-pattern']
});
```

## Next Steps

- Choose an [integration method](../getting-started/integration-options.md) for your website
- Learn about [bot patterns](bot-patterns.md) to understand which AI systems are detected
- Explore the [API reference](api-reference.md) to understand how the DarkForest API works
