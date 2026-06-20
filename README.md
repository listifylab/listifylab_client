# Listing Frontend

Modern React + Vite + Tailwind CSS listing application.

## Features

- **React 18** with Vite for fast development and build
- **Tailwind CSS** for modern styling
- **Custom Hooks** for API interactions and state management
- **Component-Based Architecture** with reusable components
- **Search & Filter** functionality for listings
- **Create Listings** with form validation
- **Responsive Design** that works on all devices

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── ListingCard.jsx
│   └── SearchFilter.jsx
├── pages/             # Page components
│   ├── ListingPage.jsx
│   └── CreateListingPage.jsx
├── hooks/             # Custom React hooks
│   └── useListings.js
├── utils/             # Utility functions
├── App.jsx            # Main App component
├── main.jsx           # Entry point
└── index.css          # Tailwind CSS imports
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## API Integration

The frontend is configured to proxy API requests to `http://localhost:3000/api`. Make sure your backend is running on port 3000.

## Custom Hooks

### `useListings()`
Fetches all listings from the API
- Returns: `{ listings, loading, error, refetch }`

### `useCreateListing()`
Creates a new listing
- Returns: `{ createListing, loading, error }`

### `useListing(id)`
Fetches a single listing by ID
- Returns: `{ listing, loading, error }`

## Technologies Used

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS
- Autoprefixer
