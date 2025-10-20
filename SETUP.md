# Tailwind CSS Setup Guide

## What's Been Done

✅ Replaced CDN-based Tailwind CSS with a proper build setup  
✅ Created Tailwind configuration file (`tailwind.config.js`)  
✅ Set up CSS source file (`src/input.css`)  
✅ Configured build scripts in `package.json`  
✅ Updated both `index.html` and `products.html` to use compiled CSS  
✅ Added custom font configurations for your project fonts  
✅ Created `.gitignore` for node_modules and build files

## Quick Start

### First Time Setup

```bash
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

### Production Build

```bash
npm run build
```

This creates a minified CSS file for production.

## Custom Configuration

The `tailwind.config.js` file includes:

- Custom fonts (Inter, Rubik Vinyl, Rubik Scribble, Roboto Mono)
- Custom max-width for 1440px
- Custom brand blue color (#2686ca)
- Content paths for HTML and JS files

## File Structure

```
src/input.css       → Tailwind source file (modify this)
dist/output.css     → Compiled CSS (don't edit directly)
tailwind.config.js  → Tailwind configuration
```

## Benefits of This Setup

1. **Smaller file size**: Only CSS you use is included
2. **Better performance**: Minified production builds
3. **Customizable**: Easy to extend with custom utilities
4. **Development tools**: Watch mode for instant updates
5. **Version control**: Lock specific Tailwind version
6. **No CDN dependency**: Works offline

## Making Style Changes

1. Edit `src/input.css` for custom CSS
2. Modify `tailwind.config.js` for theme customization
3. Run `npm run dev` to see changes live
4. Or run `npm run build` for production builds

## Notes

- The compiled CSS is in `dist/output.css` (referenced in HTML files)
- Don't edit `dist/output.css` directly - it will be overwritten
- All your existing Tailwind classes still work the same way
- Custom font classes are preserved (font-roboto-mono, etc.)

