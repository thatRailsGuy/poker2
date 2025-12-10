# Quick Start Guide

## Run the Site (Already Done!)

The development server is already running at http://localhost:8080

You can view:
- **Home**: http://localhost:8080/
- **Games**: http://localhost:8080/games/
- **Styles**: http://localhost:8080/styles/
- **Definitions**: http://localhost:8080/definitions/
- **Random Game**: http://localhost:8080/games/random/

## Common Tasks

### Stop the Development Server
```bash
# Press Ctrl+C in the terminal where npm start is running
```

### Restart the Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

The output will be in the `_site/` directory.

## Sample Data

The site currently has sample data with:
- 3 poker games (Five Card Draw, Texas Hold'em, Seven Card Stud)
- 6 game styles (Draw, Stud, Community, Passing, Counting, Other)
- 5 poker definitions (Ante, Blind, Flop, River, Turn)

## Import Real Data

To import the actual database from the original Rails app:

1. Get the `latest.dump` file from https://github.com/thatRailsGuy/poker
2. See **DATABASE_IMPORT.md** for complete instructions
3. Run: `node scripts/convert-db-to-json.js`

## Edit Content

All data is in JSON files:
- `src/_data/games.json` - Poker games
- `src/_data/styles.json` - Game styles
- `src/_data/definitions.json` - Poker terms

After editing, the dev server will automatically reload!

## Deploy

Build the site and deploy the `_site` folder to:
- Netlify (drag & drop or GitHub integration)
- Vercel (import repository)
- GitHub Pages
- Any static hosting

## Need Help?

See:
- **README.md** - Full documentation
- **DATABASE_IMPORT.md** - Database conversion guide
- **CONVERSION_SUMMARY.md** - What was built

---

Happy coding! 🎲
