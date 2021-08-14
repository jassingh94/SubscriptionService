# SubscriptionService
This service houses rest services for a subscription model

## Prerequisites

> Node.js v14+

> Mongo (optional) 

- **Note : Will break unexpectedly on Node.js v12 or below. Due to use of optional chaining.**
- **Supports <u>In-memory mongo hosting</u>**
  - Data will be lost once service is stopped, if using in memory hosting

## How to run

> Hosted at http://localhost:3000

> Run using hosted mongo instnace 

    - Update .env , if required
        MONGO_HOST=<mongo uri>
    - Run Command

    > npm start

> Run using in-memory mongo
    
    - Run Command
    
    > npm run dev

    <Mongo uri, of in memory hosted mongo would be printed>


## APIs

| Route | Method | Payload | Response |
|----|----|----|----|
|`/user/:user` | PUT | - | [Response](#insert-user-response) |
|`/user/:user` | GET | - | [Response](#get-user-response) |
|`/subscription` | POST | [Payload](#request-subscription) | [Response](#request-subscription-response) |
|`/subscription/:user/:date` | GET | - | [Response](#get-active-subscription ) |
|`/subscription/:user` | GET | - | [Response](#get-all-subscriptions) |


### Insert user response 

```json
{
"status": "SUCCESS"
}
```

### Get user response 

```json
{
    "user_name":"test",
    "created_at":"2021-08-14T08:39:14.671Z"
}
```

### Request Subscription

```json
{
  "user_name" : "<username>",
  "plan_id" : "<plan-id>",
  "start_date" : "<date YYYY-MM-DD>"
}
```

### Request Subscription Response

```json
{
    "state": "SUCCESS",
    "amount": -100
}
```

### Get active subscription 

```json
{
    "plan_id":"LITE_1M",
    "days_left":1
}
```

### Get all subscriptions

```json
[
    {
        "plan_id":"LITE_1M",
        "start_date":"2020-05-05",
        "valid_till":"2020-06-04"
    }
]
```