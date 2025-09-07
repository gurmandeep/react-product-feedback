# Feedback Portal

A **React-based Feedback Portal** that allows users to submit, view and comment on feedback. Built with **React**, **Vite**, and **Tailwind CSS**, this project demonstrates a dynamic, responsive front-end application with API integration.

---

## Features

- **Submit Feedback:** Users can submit new feedback with a title, description, and category.
- **View Feedback:** Display feedback in a clean, card-style UI with categories and user details.
- **Comment on Feedback:** Users can add comments to individual feedback items, enabling discussions and clarifications.
- **Responsive Design:** Mobile-first layout with Tailwind CSS.
- **Authentication:** Login and register functionality.
- **API Integration:** Connects with a backend to fetch and create feedback.

---

## Tech Stack

- **React** – Front-end library
- **Vite** – Development and build tool for fast HMR
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React Router** – Client-side routing
- **Fetch** – API calls

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

1. Clone the repository:

git clone https://github.com/gurmandeep/react-product-feedback.git
cd react-product-feedback

2. Install dependencies:

```bash
npm install

# or

yarn
```

3. Copy the example environment file, then open the new `.env` file and update your server URL:

```bash
   cp .env.example .env
```

In your .env file, set the API base URL:

```bash
   VITE_BASE_URL=http://your-server-domain.com/api
```

4. Start the development server:

```bash
npm run dev


# or

yarn dev
```

4. Open your browser at http://localhost:5173
