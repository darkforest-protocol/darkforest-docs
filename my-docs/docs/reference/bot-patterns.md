---
sidebar_position: 1
---

# Bot Patterns Reference

This page provides a comprehensive list of AI bot user agent patterns detected by DarkForest Protocol.

## Overview

DarkForest Protocol detects AI bots by matching their user agent strings against known patterns. These patterns are categorized into three groups:

1. **AI Search Bots**: Bots used by AI-powered search engines
2. **AI Crawl Bots**: Bots used for AI training data collection
3. **Open Data Crawlers**: Bots used for open data collection

The patterns are regularly updated to include new AI systems as they emerge.

## AI Search Bots

These bots are used by AI-powered search engines to index content for search results and AI-assisted search features.

| Bot Name | User Agent Pattern | Company | Purpose |
|----------|-------------------|---------|---------|
| Applebot | `Applebot` | Apple | Web crawler for Apple services like Siri and Spotlight Suggestions |
| Applebot-Extended | `Applebot-Extended` | Apple | Extended version of Applebot for additional Apple services |
| DuckAssistBot | `DuckAssistBot` | DuckDuckGo | Crawler for DuckDuckGo's AI-assisted search features |
| Google-Extended | `Google-Extended` | Google | Extended Google crawler for AI features |
| GoogleOther | `GoogleOther` | Google | Specialized Google crawler for various services |
| GoogleOther-Image | `GoogleOther-Image` | Google | Google crawler for image content |
| GoogleOther-Video | `GoogleOther-Video` | Google | Google crawler for video content |
| OAI-SearchBot | `OAI-SearchBot` | OpenAI | Crawler for OpenAI's search features |
| PerplexityBot | `PerplexityBot` | Perplexity | Crawler for Perplexity AI search engine |
| PetalBot | `PetalBot` | Petal (Huawei) | Web crawler for Huawei's search services |
| YouBot | `YouBot` | You.com | Crawler for You.com AI search engine |
| ChatGPT-User | `ChatGPT-User` | OpenAI | Browser extension for ChatGPT web browsing |
| Cohere AI | `cohere-ai` | Cohere | Crawler for Cohere's AI services |

## AI Crawl Bots

These bots are used by AI companies to collect training data for large language models and other AI systems.

| Bot Name | User Agent Pattern | Company | Purpose |
|----------|-------------------|---------|---------|
| AI2 Bot | `AI2Bot` | Allen Institute for AI | Research data collection |
| AI2 Bot Dolma | `Ai2Bot-Dolma` | Allen Institute for AI | Dolma dataset collection |
| Amazonbot | `Amazonbot` | Amazon | Data collection for Amazon AI services |
| Anthropic AI | `anthropic-ai` | Anthropic | Data collection for Claude and other models |
| Claude Web | `Claude-Web` | Anthropic | Web browsing feature for Claude |
| ClaudeBot | `ClaudeBot` | Anthropic | General crawler for Anthropic services |
| Cohere AI | `cohere-ai` | Cohere | Data collection for Cohere models |
| Cohere Training Crawler | `cohere-training-data-crawler` | Cohere | Specific crawler for model training data |
| Crawlspace | `Crawlspace` | Various | Generic AI crawler |
| Diffbot | `Diffbot` | Diffbot | Structured data extraction for AI |
| FacebookBot | `FacebookBot` | Meta | Data collection for Meta AI services |
| FriendlyCrawler | `FriendlyCrawler` | Various | Generic AI crawler |
| GPTBot | `GPTBot` | OpenAI | Data collection for GPT models |
| ICCCrawler | `ICCCrawler` | Various | Research data collection |
| ImagesiftBot | `ImagesiftBot` | Various | Image data collection |
| img2dataset | `img2dataset` | Various | Image dataset collection tool |
| Kangaroo Bot | `Kangaroo Bot` | Various | Research data collection |
| Meta External Agent | `Meta-ExternalAgent` | Meta | External data collection for Meta AI |
| Meta External Fetcher | `Meta-ExternalFetcher` | Meta | External data fetching for Meta AI |
| Omgili | `omgili` | Omgili | Web data collection service |
| Omgilibot | `omgilibot` | Omgili | Bot for Omgili data collection |
| PanguBot | `PanguBot` | Huawei | Data collection for Pangu models |
| Scrapy | `Scrapy` | Various | Popular web scraping framework |
| Sidetrade Indexer | `Sidetrade indexer bot` | Sidetrade | Business data collection |
| Timpibot | `Timpibot` | Various | Research data collection |
| Velen Public Crawler | `VelenPublicWebCrawler` | Velen | Public web data collection |
| Webzio Extended | `Webzio-Extended` | Webzio | Extended data collection service |
| Bytespider | `Bytespider` | ByteDance | Data collection for ByteDance AI |
| iaskspider | `iaskspider/2.0` | iask | Data collection for iask services |
| ISS Cyber Risk Crawler | `ISSCyberRiskCrawler` | ISS | Security and risk assessment crawler |

## Open Data Crawlers

These bots are used for collecting data for open datasets and research purposes.

| Bot Name | User Agent Pattern | Company | Purpose |
|----------|-------------------|---------|---------|
| CCBot | `CCBot` | Common Crawl | Web crawler for the Common Crawl dataset |

## How Bot Detection Works

DarkForest Protocol uses substring matching to detect AI bots. If a user agent string contains any of the patterns listed above, it will be identified as an AI bot.

For example, a user agent string like `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot; +https://openai.com/gptbot)` would be detected as an AI bot because it contains the `GPTBot` pattern.

## Customizing Bot Detection

You can customize which categories of bots are blocked by configuring the `presetCategories` option in your DarkForest Protocol implementation:

```javascript
// Block only AI search bots
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots']
});

// Block both AI search bots and AI crawl bots
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots']
});

// Block all categories
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots', 'open-data-crawlers']
});
```

You can also add custom patterns to block additional user agents:

```javascript
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  customBlockedUserAgents: ['custom-bot-pattern', 'another-pattern']
});
```

## Exempting Specific Paths

You may want to allow AI bots to access certain parts of your website, such as your robots.txt file or public API. You can configure exempt paths in your DarkForest Protocol implementation:

```javascript
const darkforestMiddleware = createExpressBlocker({
  apiKey: 'your-api-key',
  presetCategories: ['ai-search-bots', 'ai-crawl-bots'],
  exemptPaths: ['/robots.txt', '/sitemap.xml', '/api/public']
});
```

## Staying Updated

The list of AI bot patterns is regularly updated as new AI systems emerge. When you update the DarkForest Protocol package, you'll automatically get the latest patterns.

For npm-based installations:

```bash
npm update darkforest-blocker
```

For other integration methods, refer to the specific integration guide.

## References

The bot patterns used by DarkForest Protocol are based on research from various sources, including:

- [AI Robots.txt Project](https://github.com/ai-robots-txt/ai.robots.txt/blob/main/table-of-bot-metrics.md)
- Official documentation from AI companies
- Community contributions and research

If you discover a new AI bot pattern that should be added to our list, please [contact us](https://darkforestprotocol.com/contact) or open an issue on our GitHub repository.
