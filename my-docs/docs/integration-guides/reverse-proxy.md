---
sidebar_position: 1
---

# Reverse Proxy Integration

This guide provides detailed instructions for implementing DarkForest Protocol using reverse proxies like Nginx, Apache, Cloudflare Workers, and HAProxy.

## Overview

The reverse proxy integration is the simplest way to implement DarkForest Protocol. It works by:

1. Inspecting the `User-Agent` header of incoming requests
2. Matching it against known AI bot patterns
3. Redirecting matched requests to the DarkForest API

This method requires no changes to your application code and works with any backend technology.

## Prerequisites

Before you begin, make sure you have:

1. An API key from DarkForest Protocol (see [Getting an API Key](../getting-started/quick-start.md#getting-an-api-key))
2. Administrative access to your web server or proxy configuration

## Nginx Configuration

### Step 1: Create a map for AI bot detection

Add the following to your Nginx configuration, typically in the `http` block of your `nginx.conf` file or in a separate include file:

```nginx
# DarkForest Protocol - AI Bot Detection
map $http_user_agent $is_ai_bot {
    default 0;
    
    # AI Search Bots
    ~*Applebot 1;
    ~*"Applebot-Extended" 1;
    ~*DuckAssistBot 1;
    ~*"Google-Extended" 1;
    ~*GoogleOther 1;
    ~*"GoogleOther-Image" 1;
    ~*"GoogleOther-Video" 1;
    ~*"OAI-SearchBot" 1;
    ~*PerplexityBot 1;
    ~*PetalBot 1;
    ~*YouBot 1;
    ~*"ChatGPT-User" 1;
    ~*"cohere-ai" 1;
    
    # AI Crawl Bots
    ~*AI2Bot 1;
    ~*"Ai2Bot-Dolma" 1;
    ~*Amazonbot 1;
    ~*"anthropic-ai" 1;
    ~*"Claude-Web" 1;
    ~*ClaudeBot 1;
    ~*"cohere-ai" 1;
    ~*"cohere-training-data-crawler" 1;
    ~*Crawlspace 1;
    ~*Diffbot 1;
    ~*FacebookBot 1;
    ~*FriendlyCrawler 1;
    ~*GPTBot 1;
    ~*ICCCrawler 1;
    ~*ImagesiftBot 1;
    ~*img2dataset 1;
    ~*"Kangaroo Bot" 1;
    ~*"Meta-ExternalAgent" 1;
    ~*"Meta-ExternalFetcher" 1;
    ~*omgili 1;
    ~*omgilibot 1;
    ~*PanguBot 1;
    ~*Scrapy 1;
    ~*"Sidetrade indexer bot" 1;
    ~*Timpibot 1;
    ~*VelenPublicWebCrawler 1;
    ~*"Webzio-Extended" 1;
    ~*Bytespider 1;
    ~*"iaskspider/2.0" 1;
    ~*ISSCyberRiskCrawler 1;
    
    # Open Data Crawlers
    ~*CCBot 1;
}
```

### Step 2: Add the redirect rule to your server block

Add the following inside your `server` block:

```nginx
server {
    # Your existing server configuration...
    
    # DarkForest Protocol redirect
    if ($is_ai_bot) {
        return 302 https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=$http_user_agent;
    }
    
    # Rest of your server configuration...
}
```

Replace `YOUR_API_KEY` with your actual DarkForest API key.

### Step 3: Test and reload Nginx

Test your configuration:

```bash
nginx -t
```

If the test is successful, reload Nginx:

```bash
nginx -s reload
```

## Apache Configuration

### Step 1: Enable the required modules

Ensure that the `mod_rewrite` module is enabled:

```bash
a2enmod rewrite
```

### Step 2: Add the rewrite rules

Add the following to your Apache configuration file (either in your virtual host configuration or in an `.htaccess` file):

```apache
# DarkForest Protocol - AI Bot Detection
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # AI Search Bots
    RewriteCond %{HTTP_USER_AGENT} Applebot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Applebot-Extended" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} DuckAssistBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Google-Extended" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} GoogleOther [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "GoogleOther-Image" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "GoogleOther-Video" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "OAI-SearchBot" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} PerplexityBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} PetalBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} YouBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "ChatGPT-User" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "cohere-ai" [NC,OR]
    
    # AI Crawl Bots
    RewriteCond %{HTTP_USER_AGENT} AI2Bot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Ai2Bot-Dolma" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Amazonbot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "anthropic-ai" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Claude-Web" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ClaudeBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "cohere-ai" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "cohere-training-data-crawler" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Crawlspace [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Diffbot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} FacebookBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} FriendlyCrawler [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} GPTBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ICCCrawler [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ImagesiftBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} img2dataset [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Kangaroo Bot" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Meta-ExternalAgent" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Meta-ExternalFetcher" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} omgili [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} omgilibot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} PanguBot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Scrapy [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Sidetrade indexer bot" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Timpibot [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} VelenPublicWebCrawler [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "Webzio-Extended" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} Bytespider [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} "iaskspider/2.0" [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ISSCyberRiskCrawler [NC,OR]
    
    # Open Data Crawlers
    RewriteCond %{HTTP_USER_AGENT} CCBot [NC]
    
    # Redirect to DarkForest API
    RewriteRule .* https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=%{HTTP_USER_AGENT} [R=302,L]
</IfModule>
```

Replace `YOUR_API_KEY` with your actual DarkForest API key.

### Step 3: Test and restart Apache

Test your configuration:

```bash
apachectl configtest
```

If the test is successful, restart Apache:

```bash
systemctl restart apache2
```

## Cloudflare Workers Integration

### Step 1: Create a new Cloudflare Worker

1. Log in to your Cloudflare dashboard
2. Navigate to Workers & Pages
3. Click "Create a Worker"
4. Replace the default code with the following:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get the user agent
  const userAgent = request.headers.get('User-Agent') || '';
  
  // AI bot patterns
  const aiSearchBots = [
    'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Google-Extended',
    'GoogleOther', 'GoogleOther-Image', 'GoogleOther-Video', 'OAI-SearchBot',
    'PerplexityBot', 'PetalBot', 'YouBot', 'ChatGPT-User', 'cohere-ai'
  ];
  
  const aiCrawlBots = [
    'AI2Bot', 'Ai2Bot-Dolma', 'Amazonbot', 'anthropic-ai', 'Claude-Web',
    'ClaudeBot', 'cohere-ai', 'cohere-training-data-crawler', 'Crawlspace',
    'Diffbot', 'FacebookBot', 'FriendlyCrawler', 'GPTBot', 'ICCCrawler',
    'ImagesiftBot', 'img2dataset', 'Kangaroo Bot', 'Meta-ExternalAgent',
    'Meta-ExternalFetcher', 'omgili', 'omgilibot', 'PanguBot', 'Scrapy',
    'Sidetrade indexer bot', 'Timpibot', 'VelenPublicWebCrawler',
    'Webzio-Extended', 'Bytespider', 'iaskspider/2.0', 'ISSCyberRiskCrawler'
  ];
  
  const openDataCrawlers = ['CCBot'];
  
  // Combine all patterns
  const allBots = [...aiSearchBots, ...aiCrawlBots, ...openDataCrawlers];
  
  // Check if the user agent matches any bot pattern
  const isAiBot = allBots.some(bot => userAgent.includes(bot));
  
  if (isAiBot) {
    // Redirect to DarkForest API
    return Response.redirect(
      `https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=${encodeURIComponent(userAgent)}`,
      302
    );
  }
  
  // Not a bot, continue with the request
  return fetch(request);
}
```

Replace `YOUR_API_KEY` with your actual DarkForest API key.

### Step 2: Deploy the Worker

1. Click "Save and Deploy"
2. Set up a route for the worker in your Cloudflare dashboard:
   - Go to your domain's dashboard
   - Navigate to Workers Routes
   - Add a route (e.g., `example.com/*`) and select your worker

## HAProxy Configuration

### Step 1: Add the ACL for AI bot detection

Add the following to your HAProxy configuration file:

```
# DarkForest Protocol - AI Bot Detection
frontend http_front
    # Your existing frontend configuration...
    
    # AI bot detection ACLs
    acl is_ai_bot hdr_sub(User-Agent) -i Applebot
    acl is_ai_bot hdr_sub(User-Agent) -i Applebot-Extended
    acl is_ai_bot hdr_sub(User-Agent) -i DuckAssistBot
    acl is_ai_bot hdr_sub(User-Agent) -i Google-Extended
    acl is_ai_bot hdr_sub(User-Agent) -i GoogleOther
    acl is_ai_bot hdr_sub(User-Agent) -i GoogleOther-Image
    acl is_ai_bot hdr_sub(User-Agent) -i GoogleOther-Video
    acl is_ai_bot hdr_sub(User-Agent) -i OAI-SearchBot
    acl is_ai_bot hdr_sub(User-Agent) -i PerplexityBot
    acl is_ai_bot hdr_sub(User-Agent) -i PetalBot
    acl is_ai_bot hdr_sub(User-Agent) -i YouBot
    acl is_ai_bot hdr_sub(User-Agent) -i ChatGPT-User
    acl is_ai_bot hdr_sub(User-Agent) -i cohere-ai
    acl is_ai_bot hdr_sub(User-Agent) -i AI2Bot
    acl is_ai_bot hdr_sub(User-Agent) -i Ai2Bot-Dolma
    acl is_ai_bot hdr_sub(User-Agent) -i Amazonbot
    acl is_ai_bot hdr_sub(User-Agent) -i anthropic-ai
    acl is_ai_bot hdr_sub(User-Agent) -i Claude-Web
    acl is_ai_bot hdr_sub(User-Agent) -i ClaudeBot
    acl is_ai_bot hdr_sub(User-Agent) -i cohere-training-data-crawler
    acl is_ai_bot hdr_sub(User-Agent) -i Crawlspace
    acl is_ai_bot hdr_sub(User-Agent) -i Diffbot
    acl is_ai_bot hdr_sub(User-Agent) -i FacebookBot
    acl is_ai_bot hdr_sub(User-Agent) -i FriendlyCrawler
    acl is_ai_bot hdr_sub(User-Agent) -i GPTBot
    acl is_ai_bot hdr_sub(User-Agent) -i ICCCrawler
    acl is_ai_bot hdr_sub(User-Agent) -i ImagesiftBot
    acl is_ai_bot hdr_sub(User-Agent) -i img2dataset
    acl is_ai_bot hdr_sub(User-Agent) -i "Kangaroo Bot"
    acl is_ai_bot hdr_sub(User-Agent) -i Meta-ExternalAgent
    acl is_ai_bot hdr_sub(User-Agent) -i Meta-ExternalFetcher
    acl is_ai_bot hdr_sub(User-Agent) -i omgili
    acl is_ai_bot hdr_sub(User-Agent) -i omgilibot
    acl is_ai_bot hdr_sub(User-Agent) -i PanguBot
    acl is_ai_bot hdr_sub(User-Agent) -i Scrapy
    acl is_ai_bot hdr_sub(User-Agent) -i "Sidetrade indexer bot"
    acl is_ai_bot hdr_sub(User-Agent) -i Timpibot
    acl is_ai_bot hdr_sub(User-Agent) -i VelenPublicWebCrawler
    acl is_ai_bot hdr_sub(User-Agent) -i Webzio-Extended
    acl is_ai_bot hdr_sub(User-Agent) -i Bytespider
    acl is_ai_bot hdr_sub(User-Agent) -i iaskspider/2.0
    acl is_ai_bot hdr_sub(User-Agent) -i ISSCyberRiskCrawler
    acl is_ai_bot hdr_sub(User-Agent) -i CCBot
    
    # Redirect AI bots to DarkForest API
    http-request redirect location https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=%[hdr(User-Agent)] if is_ai_bot
    
    # Your existing frontend configuration...
```

Replace `YOUR_API_KEY` with your actual DarkForest API key.

### Step 2: Test and reload HAProxy

Test your configuration:

```bash
haproxy -c -f /path/to/haproxy.cfg
```

If the test is successful, reload HAProxy:

```bash
systemctl reload haproxy
```

## Verifying Your Implementation

To verify that your implementation is working correctly:

1. Use cURL to simulate an AI bot request:

```bash
curl -A "GPTBot" https://your-website.com
```

2. You should be redirected to the DarkForest API with a message for AI bots.

3. Check your DarkForest analytics dashboard to see the recorded visit.

## Exempting Specific Paths

You may want to exempt certain paths from AI bot blocking. Here's how to do it for each proxy:

### Nginx

```nginx
# Exempt specific paths
location ~ ^/(api|public|allowed-bots) {
    # Skip the AI bot check for these paths
    # Your normal location configuration...
}

# For all other paths, apply the AI bot check
location / {
    if ($is_ai_bot) {
        return 302 https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=$http_user_agent;
    }
    # Your normal location configuration...
}
```

### Apache

```apache
# Exempt specific paths
RewriteCond %{REQUEST_URI} !^/(api|public|allowed-bots) [NC]
# Then add your AI bot detection conditions...
```

### Cloudflare Workers

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

### HAProxy

```
# Exempt specific paths
acl exempt_path path_beg -i /api /public /allowed-bots

# Redirect AI bots to DarkForest API (except for exempt paths)
http-request redirect location https://api.darkestforest.xyz/ai-bot-message?apiKey=YOUR_API_KEY&ua=%[hdr(User-Agent)] if is_ai_bot !exempt_path
```

## Troubleshooting

### Common Issues

1. **Redirect not working**: Ensure your proxy configuration is correctly loaded and that the redirect rule is being applied.

2. **Bot not detected**: Verify that the user agent pattern matching is working correctly. Try adding logging to see what user agents are being processed.

3. **API key issues**: Double-check that your API key is correct and properly URL-encoded in the redirect URL.

### Logging

To help with troubleshooting, you can add logging to your proxy configuration:

#### Nginx

```nginx
# Log AI bot detections
if ($is_ai_bot) {
    access_log /var/log/nginx/ai-bots.log;
}
```

#### Apache

```apache
# Log AI bot detections
RewriteRule .* - [E=AI_BOT:1]
CustomLog ${APACHE_LOG_DIR}/ai-bots.log combined env=AI_BOT
```

## Next Steps

- Learn about [bot patterns](../reference/bot-patterns.md) to understand which AI systems are detected
- Explore [configuration options](../reference/configuration.md) to customize your implementation
- View your [analytics dashboard](https://darkestforest.xyz/dashboard) to track AI bot visits
