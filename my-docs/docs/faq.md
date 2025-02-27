---
sidebar_position: 4
---

# Frequently Asked Questions

This page answers common questions about implementing and using DarkForest Protocol.

## General Questions

### What is DarkForest Protocol?

DarkForest Protocol is a system that helps websites manage and redirect AI bot traffic. It provides a way to identify AI crawlers and bots, control their access to your content, and collect analytics about their visits.

### Is DarkForest Protocol free to use?

Yes, DarkForest Protocol is free to implement. You only need to register for an API key.

### How does DarkForest Protocol detect AI bots?

DarkForest Protocol uses user agent pattern matching to identify known AI crawlers and bots. The list of patterns is regularly updated to include new AI systems as they emerge.

## Implementation Questions

### Which integration method should I choose?

- **Reverse Proxy**: Choose this if you're using Nginx, Apache, Cloudflare, or another proxy server and want the simplest implementation.
- **Middleware**: Choose this if you're using a supported web framework like Express, Next.js, or Vercel Edge.
- **Universal**: Choose this if you need a custom implementation for a different language or framework.

### Do I need to modify my website's content?

No, DarkForest Protocol works at the request/response level and doesn't require any changes to your website's content.

### Will implementing DarkForest Protocol slow down my website?

No, DarkForest Protocol is designed to be lightweight and only activates when an AI bot is detected. Regular user traffic is unaffected.

### Can I customize the message shown to AI bots?

Currently, the message is standardized across the network to maintain consistency. However, you can customize other aspects of the implementation, such as which paths are exempt from blocking.

## Technical Questions

### What happens when an AI bot visits my site?

When an AI bot visits your site, DarkForest Protocol:
1. Detects the bot based on its user agent
2. Redirects it to the DarkForest API with your API key
3. Records the visit in your analytics
4. Returns a standardized message to the bot

### Can I see which AI bots are visiting my site?

Yes, you can access analytics about bot visits through the DarkForest dashboard or API.

### What if a bot changes its user agent to avoid detection?

DarkForest Protocol is continuously updated to detect new and modified user agents. Additionally, the collective nature of the network means that new patterns can be quickly identified and added to the detection system.

### Can I block only specific AI bots?

Yes, you can configure DarkForest Protocol to block specific categories of bots while allowing others.

## Troubleshooting

### My implementation isn't blocking AI bots

Check the following:
1. Ensure your API key is correct
2. Verify that the integration is properly installed
3. Confirm that the path being accessed isn't in the exempt paths list
4. Check that the user agent is in the blocked patterns list

### I'm seeing errors in my logs

Common errors include:
- Invalid API key
- Network connectivity issues
- Misconfigured integration

If you're seeing specific error messages, check the relevant integration guide for troubleshooting steps.

### How do I update to the latest version?

For npm-based installations:
```bash
npm update darkforest-blocker
```

For other integration methods, refer to the specific integration guide.

## Getting Help

If you have questions not answered here, you can:
- Join our community Discord
- Open an issue on GitHub
- Contact support at support@darkforestprotocol.com
