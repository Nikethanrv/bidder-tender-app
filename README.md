# Tender Recommendation & AI Proposal Generator

A full-stack application that recommends relevant tenders to registered bidders based on vector embeddings and automatically generates AI-powered bid proposals.
NOTE: AI Proposal Maker module is functional; design/UI is basic, and some edge cases are not handled yet. Remaining modules and deployment will be completed in next iterations

## 🔹 Features

### Backend

* Node.js + Express REST API
* MongoDB for storing bidder profiles and tender data
* Vector similarity-based tender recommendation (cosine similarity)
* Supports query parameters for filtering tenders (country, state, min\_value, currency)
* Pagination of results
* Integration with Google Gemini API for AI-generated bid proposals

### Frontend

* React.js single-page application
* Displays recommended tenders first based on bidder embeddings
* Fetch bidder and tender details from backend
* Generates professional proposals in structured JSON
* Optional: Download proposal as PDF

---
##     Screenshots
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/a5e3dd5f-54b6-4eca-95ba-5f2d000c7bc0" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0d144c70-29bb-44b3-a087-e472e78a7ff2" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0c1f54db-5495-46d7-80e2-478353a33448" />



## 🔹 API Endpoints

### Tender Recommendation

**GET** `/api/v1/recommendations/tenders`

**Query Parameters:**

| Parameter  | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| bidderId   | String | Authenticated bidder's ID       |
| country    | String | ISO 3166-1 alpha-2 country code |
| state      | String | State or province filter        |
| min\_value | Number | Minimum tender value            |
| currency   | String | Currency code (ISO 4217)        |
| page       | Number | Pagination page number          |
| limit      | Number | Results per page                |

**Example Request:**

```http
GET http://localhost:5000/api/v1/recommendations/tenders?bidderId=user_12345&country=IN&state=Tamil Nadu&min_value=10000000&currency=INR&limit=10
```

**Success Response (200):**

```json
{
  "status": "success",
  "results": 25,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "match_score": 0.925,
      "tenderId": "tend_f4a8b1c9",
      "sourceUrl": "...",
      "tenderDetails": { ... }
    }
  ]
}
```

---

### Bid Proposal Generation

**POST** `/api/v1/proposals/generate`

**Body:**

```json
{
  "bidderId": "user_12345",
  "tenderId": "tend_f4a8b1c9"
}
```

**Success Response (200):**

```json
{
  "status": "success",
  "proposal": {
    "executive_summary": "...",
    "technical_approach": "...",
    "timeline": "...",
    "compliance": "...",
    "conclusion": "..."
  }
}
```

---

## 🔹 Project Setup

### Prerequisites

* Node.js >= 18
* MongoDB (Atlas or local)
* Google Gemini API Key (for AI proposal generation)
* React.js (frontend)

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Nikethanrv/tender-recommendation-api.git
cd tender-recommendation-api
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with MongoDB URI and Gemini API key:

```env
MONGO_URI=mongodb://localhost:27017/tender-recommendationDB
GOOGLE_API_KEY=your_api_key_here
```

4. Start the backend server:

```bash
npm run dev  # using nodemon
```

### Frontend Setup

1. Navigate to frontend folder (if separate):

```bash
cd frontend
npm install
npm start
```

2. Open in browser at `http://localhost:5173` (or configured port)



## 🔹 Tech Stack

* **Backend:** Node.js, Express, MongoDB
* **Frontend:** React.js, Axios, React Router
* **AI Integration:** Google Gemini API
* **Others:** TailwindCSS (optional), nodemon

---

## 🔹 Notes

* Ensure `profile_embedding` and `vectorEmbedding` fields are properly populated in MongoDB.
* Gemini API generates structured proposals in JSON for easy rendering.
* Paginated recommendations improve performance for large tender datasets.
