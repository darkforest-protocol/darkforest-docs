---
sidebar_position: 2
---

# API Reference

This page provides detailed documentation for the DarkForest Protocol API endpoints.

## Overview

The DarkForest Protocol API is a simple REST API that provides endpoints for:

1. Registering for an API key
2. Displaying messages to AI bots
3. Viewing analytics about AI bot visits

All API requests are made to the base URL: `https://api.darkestforest.xyz`

## Authentication

Most API endpoints require authentication using your API key. You can include your API key in one of two ways:

1. As a query parameter: `?key=your-api-key`
2. As an HTTP header: `X-DarkForest-Key: your-api-key`

## Endpoints

### Register for an API Key

```
POST /register
```

Register for a new API key.

#### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Your email address |
| `website` | string | No | Your website domain |

#### Example Request

```bash
curl -X POST https://api.darkestforest.xyz/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "website": "example.com"}'
```

#### Example Response

```json
{
  "success": true,
  "apiKey": "df_1234567890abcdef"
}
```

### AI Bot Message

```
GET /ai-bot-message
```

Display a message to AI bots. This is the endpoint that your website will redirect AI bots to.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Your API key |
| `ua` | string | No | The user agent of the AI bot (automatically included when redirecting) |

#### Example Request

```bash
curl https://api.darkestforest.xyz/ai-bot-message?key=your-api-key&ua=GPTBot
```

#### Example Response

```json
{
  "message": "This website participates in the DarkForest Protocol. Visit https://darkestforest.xyz to sign up for lawful, efficient access to our network.",
  "protocolVersion": "1.0"
}
```

### Public Stats (Under Development)

```
GET /stats/public
```

Get public statistics about the DarkForest Protocol network.

#### Example Request

```bash
curl https://api.darkestforest.xyz/stats/public
```

#### Example Response

```json
{
  "totalUsers": 1250,
  "totalVisits": 75000,
  "dailyVisits": [
    {
      "date": "2025-02-26",
      "count": 3500
    },
    {
      "date": "2025-02-27",
      "count": 3750
    }
  ],
  "weeklyVisits": [
    {
      "week": "2025-W08",
      "count": 24500
    },
    {
      "week": "2025-W09",
      "count": 26000
    }
  ]
}
```

### User Stats (Under Development)

```
GET /stats/user
```

Get statistics about AI bot visits to your website.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Your API key |

#### Example Request

```bash
curl https://api.darkestforest.xyz/stats/user?key=your-api-key
```

#### Example Response

```json
{
  "totalVisits": 1250,
  "visitsToday": 75,
  "visitsThisWeek": 450,
  "visitsThisMonth": 1200,
  "botTypes": {
    "GPTBot": 350,
    "ClaudeBot": 275,
    "PerplexityBot": 225,
    "Other": 400
  },
  "dailyVisits": [
    {
      "date": "2025-02-26",
      "count": 65
    },
    {
      "date": "2025-02-27",
      "count": 75
    }
  ],
  "weeklyVisits": [
    {
      "week": "2025-W08",
      "count": 425
    },
    {
      "week": "2025-W09",
      "count": 450
    }
  ]
}
```

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request.

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created (for successful registration) |
| 400 | Bad Request - The request was invalid |
| 401 | Unauthorized - Invalid or missing API key |
| 404 | Not Found - The requested resource was not found |
| 409 | Conflict - Resource already exists (e.g., email already registered) |
| 500 | Internal Server Error - Something went wrong on the server |

Error responses include a JSON object with an `error` field that provides more information about the error.

```json
{
  "error": "Invalid API key"
}
```

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for all endpoints, allowing you to make requests from your frontend applications.

## Webhooks

DarkForest Protocol can also supports webhooks for real-time notifications about AI bot visits. To set up webhooks, contact us at [hello@darkestforest.xyz](mailto:hello@darkestforest.xyz).

## Next Steps

- [Get an API key](../getting-started/quick-start.md#getting-an-api-key) if you haven't already
- Choose an [integration method](../getting-started/integration-options.md) for your website
- Explore the [analytics dashboard](https://darkestforest.xyz/dashboard) to track AI bot visits
