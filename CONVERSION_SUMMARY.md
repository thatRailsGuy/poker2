# Poker House Eleventy Conversion - Summary

## ✅ Conversion Complete!

I've successfully converted the Rails Poker app to an Eleventy.js static site. Here's what was created:

## 📦 What's Included

### Core Configuration
- **.eleventy.js** - Eleventy configuration with custom filters for markdown, tags, sorting, and search
- **package.json** - Updated with scripts and dependencies

### Data Files (src/_data/)
- **games.json** - Sample poker games (3 examples)
- **styles.json** - 6 game styles (Draw, Stud, Community, Passing, Counting, Other)
- **definitions.json** - 5 poker term definitions

### Templates (src/)
- **index.njk** - Welcome page with recently added, updated, and random games
- **games.njk** - Games listing page
- **game-detail.njk** - Individual game detail pages
- **styles.njk** - Styles listing page
- **style-detail.njk** - Individual style pages with related games
- **definitions.njk** - Definitions listing
- **random.njk** - Random game page
- **layout.njk** - Base layout with Bootstrap 5 navigation

### Assets
- **src/css/style.css** - Custom styling
- **src/js/main.js** - JavaScript for search, filtering, and interactivity

### Documentation
- **README.md** - Complete project documentation
- **DATABASE_IMPORT.md** - Step-by-step guide for importing the PostgreSQL dump
- **.gitignore** - Ignore file for version control

### Scripts
- **scripts/convert-db-to-json.js** - Database conversion utility

## 🚀 Getting Started

The development server is running at: http://localhost:8080

### Available Commands:
```bash
npm start      # Start development server with live reload
npm run build  # Build production site to _site/
npm run clean  # Remove _site/ directory
```

## 📊 Features Implemented

✅ Game browsing with sortable tables
✅ Individual game detail pages
✅ Style categorization
✅ Poker term definitions
✅ Random game generator
✅ Search functionality (client-side)
✅ Tag filtering
✅ Markdown support for descriptions
✅ Responsive Bootstrap 5 design
✅ Mobile-friendly navigation

## 🔄 Converting the Real Database

To use the actual data from the Rails app's `latest.dump`:

1. Download `latest.dump` from https://github.com/thatRailsGuy/poker
2. Restore to PostgreSQL: `pg_restore --verbose --clean --no-acl --no-owner -d poker_temp latest.dump`
3. Install pg client: `npm install pg`
4. Run conversion: `node scripts/convert-db-to-json.js`
5. Rebuild site: `npm run build`

See **DATABASE_IMPORT.md** for detailed instructions.

## 🎨 Customization

### Adding Games
Edit `src/_data/games.json` and add new game objects.

### Styling
- Modify `src/css/style.css` for custom styles
- Layout uses Bootstrap 5 (CDN)
- Edit `src/_includes/layout.njk` for structure changes

### Adding Features
- Custom filters: `.eleventy.js`
- New pages: Create `.njk` files in `src/`
- Data: Add JSON files to `src/_data/`

## 📝 Differences from Rails App

### What's the Same:
- All core data models (Games, Styles, Definitions)
- Page structure and navigation
- Markdown support for descriptions
- Search and filtering

### What's Different:
- Static site (no backend/database)
- Client-side search/filtering
- No admin authentication (static content)
- Data stored in JSON files instead of PostgreSQL
- No form submissions (read-only)

## 🌐 Deployment Options

This static site can be deployed to:
- **Netlify** - Drop the `_site` folder or connect GitHub
- **Vercel** - Import repository and deploy
- **GitHub Pages** - Push `_site` to gh-pages branch
- **AWS S3** - Upload `_site` contents
- Any static hosting service

## 📁 Project Structure

```
poker2/
├── .eleventy.js              # Eleventy config
├── package.json              # Dependencies & scripts
├── README.md                 # Main documentation
├── DATABASE_IMPORT.md        # Import guide
├── .gitignore               # Git ignore file
├── scripts/
│   └── convert-db-to-json.js # DB converter
├── src/
│   ├── _data/               # JSON data files
│   │   ├── games.json
│   │   ├── styles.json
│   │   └── definitions.json
│   ├── _includes/           # Layouts
│   │   └── layout.njk
│   ├── css/                 # Stylesheets
│   │   └── style.css
│   ├── js/                  # JavaScript
│   │   └── main.js
│   └── *.njk                # Page templates
└── _site/                   # Generated output (gitignored)
```

## 🎯 Next Steps

1. **Import Real Data**: Follow DATABASE_IMPORT.md to convert the PostgreSQL dump
2. **Customize Design**: Modify CSS and layouts to match your preferences
3. **Add Content**: Expand games, styles, and definitions
4. **Deploy**: Choose a hosting platform and deploy your site
5. **Enhance**: Add features like advanced search, game comparisons, etc.

## 📚 Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Language](https://mozilla.github.io/nunjucks/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Original Rails App](https://github.com/thatRailsGuy/poker)
- [Live Demo (Original)](http://poker.clintcecil.com/)

---

Enjoy your new static Poker House site! 🎲🃏
