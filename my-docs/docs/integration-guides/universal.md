---
sidebar_position: 3
---

# Universal Integration

This guide provides conceptual guidelines and pseudocode for implementing DarkForest Protocol in any programming language or web framework.

## Overview

The universal integration approach allows you to implement DarkForest Protocol in any environment. While we provide specific implementations for Node.js frameworks, this guide will help you implement the protocol in any language or framework.

The core logic remains the same across all implementations:

1. Inspect the `User-Agent` header of incoming requests
2. Match it against known AI bot patterns
3. Redirect matched requests to the DarkForest API

## Prerequisites

Before you begin, make sure you have:

1. An API key from DarkForest Protocol (see [Getting an API Key](../getting-started/quick-start.md#getting-an-api-key))
2. The ability to modify your web server or application code

## Core Implementation Logic

Here's the pseudocode for the core implementation:

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

Replace `YOUR_API_KEY` with your actual DarkForest API key.

## AI Bot Patterns

You'll need to maintain a list of AI bot user agent patterns to match against. Here are the patterns we use in our official implementations:

### AI Search Bots

```
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

### AI Crawl Bots

```
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

### Open Data Crawlers

```
[
  'CCBot'
]
```

## Implementation Examples

Below are examples of how to implement DarkForest Protocol in various languages and frameworks.

### Python (Flask)

```python
from flask import Flask, request, redirect
import re
import urllib.parse

app = Flask(__name__)

# AI bot patterns
AI_BOT_PATTERNS = [
    'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Google-Extended',
    'GoogleOther', 'GoogleOther-Image', 'GoogleOther-Video', 'OAI-SearchBot',
    'PerplexityBot', 'PetalBot', 'YouBot', 'ChatGPT-User', 'cohere-ai',
    'AI2Bot', 'Ai2Bot-Dolma', 'Amazonbot', 'anthropic-ai', 'Claude-Web',
    'ClaudeBot', 'cohere-training-data-crawler', 'Crawlspace', 'Diffbot',
    'FacebookBot', 'FriendlyCrawler', 'GPTBot', 'ICCCrawler', 'ImagesiftBot',
    'img2dataset', 'Kangaroo Bot', 'Meta-ExternalAgent', 'Meta-ExternalFetcher',
    'omgili', 'omgilibot', 'PanguBot', 'Scrapy', 'Sidetrade indexer bot',
    'Timpibot', 'VelenPublicWebCrawler', 'Webzio-Extended', 'Bytespider',
    'iaskspider/2.0', 'ISSCyberRiskCrawler', 'CCBot'
]

# Compile patterns into regex for efficient matching
COMPILED_PATTERNS = [re.compile(pattern, re.IGNORECASE) for pattern in AI_BOT_PATTERNS]

# Your DarkForest API key
API_KEY = 'your-api-key'

@app.before_request
def check_ai_bot():
    # Get user agent
    user_agent = request.headers.get('User-Agent', '')
    
    # Check if it matches any AI bot pattern
    is_ai_bot = any(pattern.search(user_agent) for pattern in COMPILED_PATTERNS)
    
    if is_ai_bot:
        # Redirect to DarkForest API
        encoded_ua = urllib.parse.quote(user_agent)
        return redirect(f'https://api.darkforestprotocol.com/ai-bot-message?key={API_KEY}&ua={encoded_ua}')

@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

### PHP

```php
<?php
// DarkForest Protocol implementation

// Your DarkForest API key
$apiKey = 'your-api-key';

// AI bot patterns
$aiBotPatterns = [
    'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Google-Extended',
    'GoogleOther', 'GoogleOther-Image', 'GoogleOther-Video', 'OAI-SearchBot',
    'PerplexityBot', 'PetalBot', 'YouBot', 'ChatGPT-User', 'cohere-ai',
    'AI2Bot', 'Ai2Bot-Dolma', 'Amazonbot', 'anthropic-ai', 'Claude-Web',
    'ClaudeBot', 'cohere-training-data-crawler', 'Crawlspace', 'Diffbot',
    'FacebookBot', 'FriendlyCrawler', 'GPTBot', 'ICCCrawler', 'ImagesiftBot',
    'img2dataset', 'Kangaroo Bot', 'Meta-ExternalAgent', 'Meta-ExternalFetcher',
    'omgili', 'omgilibot', 'PanguBot', 'Scrapy', 'Sidetrade indexer bot',
    'Timpibot', 'VelenPublicWebCrawler', 'Webzio-Extended', 'Bytespider',
    'iaskspider/2.0', 'ISSCyberRiskCrawler', 'CCBot'
];

// Get user agent
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Check if it matches any AI bot pattern
$isAiBot = false;
foreach ($aiBotPatterns as $pattern) {
    if (stripos($userAgent, $pattern) !== false) {
        $isAiBot = true;
        break;
    }
}

// Redirect if it's an AI bot
if ($isAiBot) {
    $encodedUa = urlencode($userAgent);
    header("Location: https://api.darkforestprotocol.com/ai-bot-message?key={$apiKey}&ua={$encodedUa}");
    exit;
}

// Continue with normal request handling
// ...
?>
```

### Ruby (Rails)

```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  before_action :check_ai_bot
  
  private
  
  def check_ai_bot
    # Your DarkForest API key
    api_key = 'your-api-key'
    
    # AI bot patterns
    ai_bot_patterns = [
      'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Google-Extended',
      'GoogleOther', 'GoogleOther-Image', 'GoogleOther-Video', 'OAI-SearchBot',
      'PerplexityBot', 'PetalBot', 'YouBot', 'ChatGPT-User', 'cohere-ai',
      'AI2Bot', 'Ai2Bot-Dolma', 'Amazonbot', 'anthropic-ai', 'Claude-Web',
      'ClaudeBot', 'cohere-training-data-crawler', 'Crawlspace', 'Diffbot',
      'FacebookBot', 'FriendlyCrawler', 'GPTBot', 'ICCCrawler', 'ImagesiftBot',
      'img2dataset', 'Kangaroo Bot', 'Meta-ExternalAgent', 'Meta-ExternalFetcher',
      'omgili', 'omgilibot', 'PanguBot', 'Scrapy', 'Sidetrade indexer bot',
      'Timpibot', 'VelenPublicWebCrawler', 'Webzio-Extended', 'Bytespider',
      'iaskspider/2.0', 'ISSCyberRiskCrawler', 'CCBot'
    ]
    
    # Get user agent
    user_agent = request.user_agent || ''
    
    # Check if it matches any AI bot pattern
    is_ai_bot = ai_bot_patterns.any? { |pattern| user_agent.include?(pattern) }
    
    if is_ai_bot
      # Redirect to DarkForest API
      redirect_to "https://api.darkforestprotocol.com/ai-bot-message?key=#{api_key}&ua=#{CGI.escape(user_agent)}"
    end
  end
end
```

### Java (Spring Boot)

```java
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Component
public class DarkForestInterceptor implements HandlerInterceptor {

    // Your DarkForest API key
    private static final String API_KEY = "your-api-key";

    // AI bot patterns
    private static final List<String> AI_BOT_PATTERNS = Arrays.asList(
            "Applebot", "Applebot-Extended", "DuckAssistBot", "Google-Extended",
            "GoogleOther", "GoogleOther-Image", "GoogleOther-Video", "OAI-SearchBot",
            "PerplexityBot", "PetalBot", "YouBot", "ChatGPT-User", "cohere-ai",
            "AI2Bot", "Ai2Bot-Dolma", "Amazonbot", "anthropic-ai", "Claude-Web",
            "ClaudeBot", "cohere-training-data-crawler", "Crawlspace", "Diffbot",
            "FacebookBot", "FriendlyCrawler", "GPTBot", "ICCCrawler", "ImagesiftBot",
            "img2dataset", "Kangaroo Bot", "Meta-ExternalAgent", "Meta-ExternalFetcher",
            "omgili", "omgilibot", "PanguBot", "Scrapy", "Sidetrade indexer bot",
            "Timpibot", "VelenPublicWebCrawler", "Webzio-Extended", "Bytespider",
            "iaskspider/2.0", "ISSCyberRiskCrawler", "CCBot"
    );

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Get user agent
        String userAgent = request.getHeader("User-Agent");
        if (userAgent == null) {
            userAgent = "";
        }

        // Check if it matches any AI bot pattern
        boolean isAiBot = AI_BOT_PATTERNS.stream()
                .anyMatch(pattern -> userAgent.toLowerCase().contains(pattern.toLowerCase()));

        if (isAiBot) {
            // Redirect to DarkForest API
            String encodedUa = URLEncoder.encode(userAgent, StandardCharsets.UTF_8.toString());
            response.sendRedirect("https://api.darkforestprotocol.com/ai-bot-message?key=" + API_KEY + "&ua=" + encodedUa);
            return false;
        }

        return true;
    }
}
```

### Go

```go
package main

import (
	"net/http"
	"net/url"
	"strings"
)

// Your DarkForest API key
const apiKey = "your-api-key"

// AI bot patterns
var aiBotPatterns = []string{
	"Applebot", "Applebot-Extended", "DuckAssistBot", "Google-Extended",
	"GoogleOther", "GoogleOther-Image", "GoogleOther-Video", "OAI-SearchBot",
	"PerplexityBot", "PetalBot", "YouBot", "ChatGPT-User", "cohere-ai",
	"AI2Bot", "Ai2Bot-Dolma", "Amazonbot", "anthropic-ai", "Claude-Web",
	"ClaudeBot", "cohere-training-data-crawler", "Crawlspace", "Diffbot",
	"FacebookBot", "FriendlyCrawler", "GPTBot", "ICCCrawler", "ImagesiftBot",
	"img2dataset", "Kangaroo Bot", "Meta-ExternalAgent", "Meta-ExternalFetcher",
	"omgili", "omgilibot", "PanguBot", "Scrapy", "Sidetrade indexer bot",
	"Timpibot", "VelenPublicWebCrawler", "Webzio-Extended", "Bytespider",
	"iaskspider/2.0", "ISSCyberRiskCrawler", "CCBot",
}

// DarkForest middleware
func darkForestMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get user agent
		userAgent := r.Header.Get("User-Agent")

		// Check if it matches any AI bot pattern
		isAiBot := false
		for _, pattern := range aiBotPatterns {
			if strings.Contains(strings.ToLower(userAgent), strings.ToLower(pattern)) {
				isAiBot = true
				break
			}
		}

		if isAiBot {
			// Redirect to DarkForest API
			encodedUa := url.QueryEscape(userAgent)
			http.Redirect(w, r, "https://api.darkforestprotocol.com/ai-bot-message?key="+apiKey+"&ua="+encodedUa, http.StatusFound)
			return
		}

		// Continue with normal request handling
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Create a new router
	mux := http.NewServeMux()

	// Add your routes
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})

	// Wrap the router with the DarkForest middleware
	handler := darkForestMiddleware(mux)

	// Start the server
	http.ListenAndServe(":8080", handler)
}
```

### C# (ASP.NET Core)

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

public class DarkForestMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _apiKey;
    private readonly string[] _aiBotPatterns;

    public DarkForestMiddleware(RequestDelegate next)
    {
        _next = next;
        _apiKey = "your-api-key"; // Your DarkForest API key
        
        // AI bot patterns
        _aiBotPatterns = new string[]
        {
            "Applebot", "Applebot-Extended", "DuckAssistBot", "Google-Extended",
            "GoogleOther", "GoogleOther-Image", "GoogleOther-Video", "OAI-SearchBot",
            "PerplexityBot", "PetalBot", "YouBot", "ChatGPT-User", "cohere-ai",
            "AI2Bot", "Ai2Bot-Dolma", "Amazonbot", "anthropic-ai", "Claude-Web",
            "ClaudeBot", "cohere-training-data-crawler", "Crawlspace", "Diffbot",
            "FacebookBot", "FriendlyCrawler", "GPTBot", "ICCCrawler", "ImagesiftBot",
            "img2dataset", "Kangaroo Bot", "Meta-ExternalAgent", "Meta-ExternalFetcher",
            "omgili", "omgilibot", "PanguBot", "Scrapy", "Sidetrade indexer bot",
            "Timpibot", "VelenPublicWebCrawler", "Webzio-Extended", "Bytespider",
            "iaskspider/2.0", "ISSCyberRiskCrawler", "CCBot"
        };
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Get user agent
        string userAgent = context.Request.Headers["User-Agent"].ToString();

        // Check if it matches any AI bot pattern
        bool isAiBot = _aiBotPatterns.Any(pattern => 
            userAgent.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0);

        if (isAiBot)
        {
            // Redirect to DarkForest API
            string encodedUa = HttpUtility.UrlEncode(userAgent);
            context.Response.Redirect($"https://api.darkforestprotocol.com/ai-bot-message?key={_apiKey}&ua={encodedUa}");
            return;
        }

        // Continue with normal request handling
        await _next(context);
    }
}

// Extension method to add the middleware to the HTTP request pipeline
public static class DarkForestMiddlewareExtensions
{
    public static IApplicationBuilder UseDarkForestProtocol(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<DarkForestMiddleware>();
    }
}

// In Startup.cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // Other middleware...
    
    app.UseDarkForestProtocol();
    
    // Other middleware and routing...
}
```

## Advanced Considerations

### Exempting Specific Paths

You may want to exempt certain paths from AI bot blocking:

```
function handleRequest(request, response):
  // Get the user agent and path
  userAgent = request.headers["user-agent"]
  path = request.path
  
  // Check if path is exempt
  exemptPaths = ["/api", "/public", "/allowed-bots"]
  if pathIsExempt(path, exemptPaths):
    // Continue with normal request handling
    processRequest(request, response)
    return
  
  // Check if it matches any AI bot patterns
  if matchesAnyPattern(userAgent, AI_BOT_PATTERNS):
    // Redirect to DarkForest API
    response.redirect("https://api.darkforestprotocol.com/ai-bot-message?key=YOUR_API_KEY&ua=" + encodeURIComponent(userAgent))
    return
  
  // Continue with normal request handling
  processRequest(request, response)
```

### Logging and Analytics

Consider adding logging to track AI bot visits:

```
function handleRequest(request, response):
  // Get the user agent
  userAgent = request.headers["user-agent"]
  
  // Check if it matches any AI bot patterns
  if matchesAnyPattern(userAgent, AI_BOT_PATTERNS):
    // Log the AI bot visit
    logAiBotVisit(userAgent, request.path, request.ip)
    
    // Redirect to DarkForest API
    response.redirect("https://api.darkforestprotocol.com/ai-bot-message?key=YOUR_API_KEY&ua=" + encodeURIComponent(userAgent))
    return
  
  // Continue with normal request handling
  processRequest(request, response)
```

### Performance Optimization

For high-traffic sites, consider optimizing the pattern matching:

1. Compile regular expressions once at startup
2. Use a bloom filter or other efficient data structure for initial screening
3. Cache results for common user agents

## Verifying Your Implementation

To verify that your implementation is working correctly:

1. Use cURL to simulate an AI bot request:

```bash
curl -A "GPTBot" https://your-website.com
```

2. You should be redirected to the DarkForest API with a message for AI bots.

3. Check your DarkForest analytics dashboard to see the recorded visit.

## Troubleshooting

### Common Issues

1. **Redirect not working**: Ensure your redirect logic is correct and that the URL is properly encoded.

2. **Bot not detected**: Verify that the user agent pattern matching is working correctly. Try adding logging to see what user agents are being processed.

3. **API key issues**: Double-check that your API key is correct and properly URL-encoded in the redirect URL.

## Next Steps

- Learn about [bot patterns](../reference/bot-patterns.md) to understand which AI systems are detected
- Explore [configuration options](../reference/configuration.md) to customize your implementation
- View your [analytics dashboard](https://darkforestprotocol.com/dashboard) to track AI bot visits
