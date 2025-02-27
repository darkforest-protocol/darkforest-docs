---
sidebar_position: 2
---

# Integration Options

DarkForest Protocol offers three different integration methods to accommodate various technical environments and requirements. This page provides an overview of each method to help you choose the best approach for your website.

## 1. Reverse Proxy Integration (Simplest)

**Best for:** Websites using Nginx, Apache, Cloudflare, or other proxy servers.

The reverse proxy integration is the simplest method, requiring only a few configuration lines in your existing server setup. This approach works by:

1. Inspecting incoming requests at the server level
2. Identifying AI bot user agents using pattern matching
3. Redirecting identified bots to the DarkForest API

**Advantages:**
- No code changes required to your application
- Works with any backend technology
- Minimal performance impact
- Easy to implement and maintain

**Example:** Nginx configuration snippet

```nginx
# DarkForest Protocol - AI Bot Detection
map $http_user_agent $is_ai_bot {
    default 0;
    ~*GPTBot 1;
    ~*Anthropic 1;
    # Additional patterns...
}

server {
    # Your existing server configuration...
    
    # DarkForest Protocol redirect
    if ($is_ai_bot) {
        return 302 https://api.darkforestprotocol.com/ai-bot-message?key=YOUR_API_KEY&ua=$http_user_agent;
    }
}
```

[View Full Reverse Proxy Guide](../integration-guides/reverse-proxy.md)

## 2. Middleware Integration (Recommended)

**Best for:** Websites using Node.js frameworks like Express, Next.js, or Vercel Edge.

The middleware integration uses our npm package to add a middleware layer to your application. This approach:

1. Integrates directly with your application framework
2. Provides more configuration options
3. Offers better integration with your application's logging and error handling

**Advantages:**
- Clean integration with your application code
- More configuration options
- Framework-specific optimizations
- Easier to update and maintain

**Example:** Express.js integration

```javascript
const express = require('express');
const { createExpressBlocker } = require('darkforest-blocker/express');

const app = express();

// DarkForest Protocol middleware
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  exemptPaths: ['/public', '/api']
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

[View Full Middleware Guide](../integration-guides/middleware.md)

## 3. Universal Integration (Advanced)

**Best for:** Websites using other languages or frameworks, or requiring custom implementation.

The universal integration provides a conceptual approach that can be implemented in any language or framework. This approach:

1. Outlines the core logic for detecting AI bots
2. Provides pseudocode that can be adapted to any environment
3. Offers flexibility for custom requirements

**Advantages:**
- Works with any programming language
- Can be customized for specific requirements
- Integrates with any web framework or server
- Full control over implementation details

**Example:** Pseudocode for universal implementation

```
function handleRequest(request, response):
  // Get the user agent from the request
  userAgent = request.headers["user-agent"]
  
  // Check if it matches any AI bot patterns
  if matchesAnyPattern(userAgent, AI_BOT_PATTERNS):
    // Redirect to DarkForest API
    response.redirect("https://api.darkforestprotocol.com/ai-bot-message?key=YOUR_API_KEY&ua=" + encodeURIComponent(userAgent))
    return
  
  // Continue with normal request handling
  processRequest(request, response)
```

[View Full Universal Guide](../integration-guides/universal.md)

## Comparison Table

| Feature | Reverse Proxy | Middleware | Universal |
|---------|---------------|------------|-----------|
| Implementation Difficulty | Easy | Medium | Advanced |
| Code Changes Required | Minimal | Moderate | Extensive |
| Configuration Options | Limited | Extensive | Unlimited |
| Performance Impact | Minimal | Low | Varies |
| Framework Support | Any | Node.js based | Any |
| Maintenance Effort | Low | Medium | High |

## Which Method Should You Choose?

- **Choose Reverse Proxy** if you want the simplest implementation and already use a supported proxy server.
- **Choose Middleware** if you use a supported framework and want more configuration options.
- **Choose Universal** if you need a custom implementation or use an unsupported language/framework.

Still not sure? Start with the simplest method that works for your environment. You can always switch to a different method later if needed.

## Next Steps

- [Get an API key](quick-start.md#getting-an-api-key) if you haven't already
- View the detailed guide for your chosen integration method
- Learn about [bot patterns](../reference/bot-patterns.md) to understand which AI systems are detected
