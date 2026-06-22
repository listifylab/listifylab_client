# Installation & Setup Guide

## Prerequisites

- Node.js v20.19+ or v22.12+ (or v21.x with compatibility fixes)
- npm 10.x or higher
- Backend API running on `http://localhost:3000`

## Installation Steps

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

If you encounter Node.js compatibility issues, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Step 4: Open in Browser
Open your browser and navigate to `http://localhost:5173`

## Development Workflow

### Running the Dev Server
```bash
npm run dev
```
- Hot Module Replacement (HMR) enabled
- Real-time code updates
- Development optimizations

### Building for Production
```bash
npm run build
```
- Creates optimized build in `dist/` folder
- Minified and bundled assets
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Preview the production build locally
- Useful for testing before deployment

## Backend Integration

### Ensure Backend is Running
Make sure your Express backend is running:
```bash
# In another terminal, in the backend directory
npm run dev
# or
node src/server.js
```

The backend should be listening on `http://localhost:3000`

### API Proxy Configuration
The Vite config automatically proxies `/api` requests to the backend:
- Frontend requests: `http://localhost:5173/api/listings`
- Forwarded to: `http://localhost:3000/listings`

## File Structure Overview

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ListingCard.jsx
│   │   └── SearchFilter.jsx
│   ├── pages/               # Page components
│   │   ├── ListingPage.jsx
│   │   └── CreateListingPage.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useListings.js
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind CSS setup
├── public/                  # Static assets (if any)
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
└── README.md                # Documentation
```

## Configuration Files

### vite.config.js
- Defines Vite build and dev server settings
- Configures React plugin
- Sets up API proxy to backend
- Dev server port: 5173

### tailwind.config.js
- Tailwind CSS configuration
- Specifies content paths for purging
- Extends default theme (if needed)

### postcss.config.js
- PostCSS plugins configuration
- Includes tailwindcss and autoprefixer

### package.json
- Project metadata
- Dependencies and dev dependencies
- NPM scripts (dev, build, preview)

### .env
- Environment variables
- VITE_API_URL: Backend API URL

## Troubleshooting

### Issue: "Node.js version not supported"
**Solution:** Update Node.js or use `npm install --legacy-peer-deps`

### Issue: Port 5173 already in use
**Solution:** Change port in `vite.config.js`:
```javascript
server: {
  port: 5174  // Change to different port
}
```

### Issue: API requests failing
**Solution:** 
1. Ensure backend is running on port 3000
2. Check VITE_API_URL in .env
3. Check vite.config.js proxy settings
4. Check backend CORS configuration

### Issue: Styles not loading
**Solution:**
1. Ensure PostCSS is installed: `npm install postcss autoprefixer -D`
2. Check tailwind.config.js content paths
3. Clear browser cache and rebuild: `npm run build`

### Issue: Hot reload not working
**Solution:**
1. Check if Vite dev server is running
2. Check browser console for errors
3. Try restarting dev server

## Environment Variables

### Available Variables
```
VITE_API_URL=http://localhost:3000/api
```

### How to Use in Code
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Creating .env.local
For local-only overrides:
```bash
cp .env .env.local
# Edit .env.local with your local settings
```

## Deployment

### Building for Production
```bash
npm run build
```

### Deploying to Static Hosting

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
Update `vite.config.js`:
```javascript
export default {
  base: '/repository-name/',  // Your repo name
  // ... rest of config
}
```

Then deploy `dist/` folder to GitHub Pages.

## Performance Optimization

- Vite uses native ES modules in development (instant HMR)
- Production build is optimized with code splitting
- Tailwind CSS is purged for production (unused styles removed)
- Tree shaking removes unused JavaScript

## Monitoring Builds

### Development
- HMR active: Changes reflect instantly
- Source maps included for debugging
- Full error messages in console

### Production
- Bundle analysis: `npm run build` shows size estimates
- Minification reduces file sizes by ~70%
- Asset compression with gzip recommended

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Open http://localhost:5173
4. ✅ Ensure backend is running
5. ✅ Test listing features
6. ✅ Check API integration
7. ✅ Build for production: `npm run build`

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev/guide/)

## Support

For issues:
1. Check console errors (F12)
2. Review troubleshooting section
3. Check Vite dev server output
4. Review backend API responses

---

Happy coding! 🚀
