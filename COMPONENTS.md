# React Components & Hooks Documentation

## Components

### ListingCard Component
Displays a single listing item with details.

```jsx
import ListingCard from './components/ListingCard'

const listing = {
  _id: '1',
  title: 'iPhone 13',
  description: 'Used iPhone 13, excellent condition',
  price: 599,
  category: 'electronics',
  location: 'New York',
  status: 'active',
  featured: true
}

<ListingCard listing={listing} />
```

**Props:**
- `listing` (object) - Listing data object

### SearchFilter Component
Provides search and category filter UI.

```jsx
import SearchFilter from './components/SearchFilter'

const handleSearch = (term) => {
  console.log('Search:', term)
}

const handleFilter = (category) => {
  console.log('Filter:', category)
}

<SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
```

**Props:**
- `onSearch` (function) - Called when search term changes
- `onFilter` (function) - Called when category changes

## Pages

### ListingPage
Main page that displays all listings with search and filter.

```jsx
import ListingPage from './pages/ListingPage'

<ListingPage />
```

Features:
- Displays listings in responsive grid
- Search functionality
- Category filter
- Loading state
- Error handling
- Pagination info

### CreateListingPage
Form page for creating new listings.

```jsx
import CreateListingPage from './pages/CreateListingPage'

<CreateListingPage setCurrentPage={setCurrentPage} />
```

**Props:**
- `setCurrentPage` (function) - Callback to switch pages

Form fields:
- Title (required)
- Description (required)
- Price (required, number)
- Category (required)
- Location (required)
- Featured (checkbox)

## Custom Hooks

### useListings()
Fetches all listings from the API.

```jsx
import { useListings } from './hooks/useListings'

function MyComponent() {
  const { listings, loading, error, refetch } = useListings()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {listings.map(listing => (
        <div key={listing._id}>{listing.title}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

**Returns:**
- `listings` (array) - Array of listing objects
- `loading` (boolean) - True while fetching
- `error` (string) - Error message if request failed
- `refetch` (function) - Function to manually fetch again

### useCreateListing()
Creates a new listing via API.

```jsx
import { useCreateListing } from './hooks/useListings'

function MyComponent() {
  const { createListing, loading, error } = useCreateListing()

  const handleCreate = async (formData) => {
    try {
      const result = await createListing(formData)
      console.log('Created:', result)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div>
      <button 
        onClick={() => handleCreate({
          title: 'New Item',
          description: 'Description',
          price: 100,
          category: 'electronics',
          location: 'NYC',
          featured: false
        })}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
      {error && <div>Error: {error}</div>}
    </div>
  )
}
```

**Returns:**
- `createListing` (function) - Function to create listing
- `loading` (boolean) - True while creating
- `error` (string) - Error message if failed

**Function params:**
- `formData` (object) with:
  - `title` (string)
  - `description` (string)
  - `price` (number)
  - `category` (string)
  - `location` (string)
  - `featured` (boolean)

### useListing(id)
Fetches a single listing by ID.

```jsx
import { useListing } from './hooks/useListings'

function MyComponent({ listingId }) {
  const { listing, loading, error } = useListing(listingId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!listing) return <div>Not found</div>

  return <div>{listing.title}</div>
}
```

**Params:**
- `id` (string) - Listing ID

**Returns:**
- `listing` (object) - Listing data
- `loading` (boolean) - True while fetching
- `error` (string) - Error message if failed

## App Structure

```
App.jsx
├── Navigation (top bar with page navigation)
├── ListingPage (when currentPage === 'listings')
│   ├── SearchFilter
│   └── Grid of ListingCard components
└── CreateListingPage (when currentPage === 'create')
    └── Create listing form
```

## Data Flow

### Fetching Listings
1. Component mounts
2. `useListings()` hook called
3. API request to `GET /api/listings`
4. Response processed and stored in state
5. Component re-renders with data

### Creating Listing
1. User fills form
2. Form validation
3. `createListing()` called with form data
4. API request to `POST /api/listings`
5. Success/error feedback shown
6. Page navigates back to listings

### Filtering/Searching
1. User types in search input
2. Search term passed to ListingPage
3. useMemo filters listings locally
4. Grid re-renders with filtered results

## Styling with Tailwind CSS

All components use Tailwind CSS utility classes. Key classes used:

- Layout: `flex`, `grid`, `max-w-7xl`, `mx-auto`
- Colors: `bg-white`, `text-gray-900`, `bg-blue-600`
- Spacing: `px-4`, `py-2`, `mb-4`, `gap-4`
- Effects: `shadow`, `hover:shadow-lg`, `rounded-lg`
- Responsive: `md:`, `lg:` prefixes for breakpoints
- States: `disabled:`, `focus:`, `hover:`

## Integration with Backend

The vite.config.js includes a proxy configuration:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

This forwards all `/api/*` requests to `http://localhost:3000`.

## Form Validation

The CreateListingPage includes validation for:
- Title (required, non-empty)
- Description (required, non-empty)
- Price (required, number, >= 0)
- Category (required, must select)
- Location (required, non-empty)

Error messages shown for invalid inputs.
