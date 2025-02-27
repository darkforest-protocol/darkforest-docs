---
sidebar_position: 1
---

# Quick Start Guide

This guide will help you get up and running with DarkForest Protocol in just a few minutes.

## Getting an API Key

Before implementing DarkForest Protocol, you'll need to register for an API key:

1. Visit [https://darkforestprotocol.com/register](https://darkforestprotocol.com/register)
2. Enter your email address and website domain
3. Click "Register" to receive your API key

Your API key will be sent to your email address immediately. This key is used to authenticate your requests to the DarkForest API and track analytics for your website.

## Choosing an Integration Method

DarkForest Protocol offers three integration methods:

### 1. Reverse Proxy Integration (Simplest)

If you're using Nginx, Apache, Cloudflare, or another proxy server, this is the easiest way to implement DarkForest Protocol. You'll add a few lines to your server configuration to detect and redirect AI bots.

[View Reverse Proxy Integration Guide](../integration-guides/reverse-proxy.md)

### 2. Middleware Integration (Recommended)

If you're using a supported web framework like Express, Next.js, or Vercel Edge, you can use our middleware package for a clean integration.

Install the DarkForest blocker package:

```bash
npm install darkforest-blocker
```

Then add the middleware to your application:

```javascript
// Express example
const { createExpressBlocker } = require('darkforest-blocker/express');

const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

app.use(darkforestMiddleware);
```

[View Middleware Integration Guide](../integration-guides/middleware.md)

### 3. Universal Integration (Advanced)

For custom implementations in any language or framework, you can use our universal integration approach.

[View Universal Integration Guide](../integration-guides/universal.md)

## Verifying Your Implementation

To verify that DarkForest Protocol is working correctly:

1. Use a tool like cURL to simulate an AI bot request:

```bash
curl -A "GPTBot" https://your-website.com
```

2. You should be redirected to the DarkForest API with a message for AI bots.

3. Check your DarkForest analytics dashboard to see the recorded visit.

## Next Steps

- Learn about [bot patterns](../reference/bot-patterns.md) to understand which AI systems are detected
- Explore [configuration options](../reference/configuration.md) to customize your implementation
- View your [analytics dashboard](https://darkforestprotocol.com/dashboard) to track AI bot visits
