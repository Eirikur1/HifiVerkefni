# OSON E-Commerce Website

A modern, responsive e-commerce website built with HTML, Tailwind CSS, and TypeScript.

## Features

- 🛍️ Product catalog with image galleries
- 🛒 Shopping cart functionality with local storage
- ⏱️ Countdown timer for limited-time offers
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 💾 TypeScript for type-safe JavaScript
- 🔔 Toast notifications for user actions
- 📧 Newsletter subscription form

## Project Structure

```
Hifiverkefni/
├── index.html          # Main HTML file
├── products.html       # Products page
├── main.ts            # TypeScript source code
├── main.js            # Compiled JavaScript (for browsers)
├── src/
│   └── input.css      # Tailwind CSS source file
├── dist/
│   └── output.css     # Compiled Tailwind CSS
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## Getting Started

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build Tailwind CSS:

   ```bash
   npm run build
   ```

### Development

Run Tailwind CSS in watch mode to automatically rebuild on changes:

```bash
npm run dev
```

This will watch for changes in your HTML files and CSS source file, automatically rebuilding the CSS.

### TypeScript Development

If you want to modify the TypeScript code:

1. Make changes to `main.ts`

2. Compile TypeScript to JavaScript:

   ```bash
   npm run build:ts
   # or
   tsc
   ```

3. Open `index.html` in your browser to see the changes

## Features Overview

### Shopping Cart

- Add products to cart
- Persistent cart using localStorage
- Real-time cart count update
- Toast notifications on add to cart

### Countdown Timer

- Automatic countdown for limited-time offers
- Updates every second
- Displays days, hours, minutes, and seconds

### Product Display

- Grid layout for products
- Product images, names, prices, and ratings
- "Add to Cart" buttons
- Hover effects on product cards

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Sticky header navigation
- Optimized for all screen sizes

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (with build process)
- **TypeScript**: Type-safe JavaScript development
- **JavaScript**: Browser-compatible compiled code
- **LocalStorage**: Client-side data persistence
- **Node.js**: For development tooling

## Fonts

The project uses the following Google Fonts:

- Inter (primary UI font)
- Roboto Mono (product details)
- Rubik Vinyl (logo)
- Rubik Scribble (hero text)

## Image Assets

The design includes images served from `http://localhost:3845/assets/`. In a production environment, you would replace these with your actual product images hosted on your server or CDN.

To use your own images:

1. Replace the image URLs in `index.html`
2. Update the `src` attributes with your image paths

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors

The project uses Tailwind's default color palette. To customize:

- Edit `tailwind.config.js` to add custom colors, fonts, or extend the theme
- Use Tailwind's built-in color utilities
- After making changes, rebuild CSS with `npm run build`

### Layout

- Adjust max-width values for different screen sizes
- Modify grid columns in product sections
- Change spacing with Tailwind's spacing utilities

## License

This project is open source and available for personal and commercial use.

## Notes

- Images are currently loaded from localhost. Replace with actual image URLs for production.
- The shopping cart data is stored in browser localStorage.
- TypeScript provides type safety during development but compiles to vanilla JavaScript for the browser.
