# tender-recommendation-api
This repository contains a Node.js application built with Express.js that demonstrates RESTful API routing with support for route parameters and query parameters. It includes examples of handling dynamic routes with single and multiple parameters, as well as parsing query strings for flexible client requests. 

##  Features

- **Bidder-based recommendations** using cosine similarity of embeddings
- **Dynamic filtering** via query parameters: `bidderId`, `country`, `state`, `min_value`, `currency`, `page`, `limit`
- **Paginated results**, ranked by `match_score`
- Simple MongoDB + Mongoose backend with dummy data support for quick start and testing


## API Usage

### Endpoint

```
GET /api/v1/recommendations/tenders
```

### Query Parameters

| Parameter   | Type   | Description                                 |
| ----------- | ------ | ------------------------------------------- |
| `bidderId`  | string | Unique identifier for the bidder (required) |
| `country`   | string | ISO country code filter (optional)          |
| `state`     | string | State/province filter (optional)            |
| `min_value` | number | Minimum tender value (optional)             |
| `currency`  | string | Currency filter using ISO code (optional)   |
| `page`      | number | Page number for pagination (default: `1`)   |
| `limit`     | number | Items per page (default: `10`, max: `100`)  |

### Sample Request

```
GET http://localhost:5000/api/v1/recommendations/tenders?bidderId=user_12345&country=IN&min_value=10000000&currency=INR&limit=15
```


## How It Works (Controller)

1. Fetch the bidder by `bidderId`, return error if not found or incomplete.
2. Query and filter tenders in MongoDB based on provided parameters.
3. Compute cosine similarity between bidder's embedding and each tender’s embedding.
4. Sort tenders by relevance (`match_score`).
5. Apply pagination (`page`, `limit`) and respond with recommended tenders.

---

## Testing & Development

* Inserted dummy bidders and tenders (with `profile_embedding` and `vectorEmbedding` arrays) into MongoDB.
* Tested endpoints using Postman, Thunder Client, or curl:


## Tech Stack

* **Node.js** with **Express** for API server
* **MongoDB** + **Mongoose** for data modeling
* Manual cosine similarity computation

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/6f52d429-246e-4723-a496-f4070c1896cf" />
