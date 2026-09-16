# Poker House - Eleventy Edition

A comprehensive repository of poker and card game variants, converted from a Rails application to a static site built with [Eleventy](https://www.11ty.dev/).

**🌐 Live Site:** [https://thatrailsguy.github.io/poker2/](https://thatrailsguy.github.io/poker2/)

## 🎯 About

This project is a static site generator version of the [original Rails Poker app](https://github.com/thatRailsGuy/poker). It provides a browsable catalog of poker games, playing styles, and poker terminology definitions.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

The site will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The compiled site will be in the `_site` directory.

## 📁 Project Structure

```
poker2/
├── .eleventy.js           # Eleventy configuration
├── src/
│   ├── _data/            # JSON data files
│   │   ├── games.json    # Poker game data
│   │   ├── styles.json   # Game style categories
│   │   └── definitions.json # Poker terminology
│   ├── _includes/        # Layout templates
│   │   └── layout.njk    # Base layout
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── *.njk             # Page templates
└── _site/                # Generated static site (after build)
```

## 📝 Data Format

### Games (`src/_data/games.json`)

```json
[
  {
    "id": 1,
    "name": "Texas Hold'em",
    "description": "Most popular poker variant...",
    "style_id": 3,
    "min_players": 2,
    "max_players": 10,
    "num_cards": 7,
    "tags": ["wildcard", "pot-matching"],
    "aliases": ["Hold'em", "Texas Holdem"],
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

`aliases` is optional — a list of alternate names the game is also searchable by.

### Styles (`src/_data/styles.json`)

```json
[
  {
    "id": 1,
    "name": "Draw",
    "description": "Players receive an initial hand...",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

### Definitions (`src/_data/definitions.json`)

```json
[
  {
    "id": 1,
    "word": "Ante",
    "definition": "A small bet all players are required to make...",
    "category": "Betting Actions",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

Definitions are grouped by `category` on the definitions page.

## ✨ Features

- **Browse Games**: View all poker game variants with detailed information
- **Game Styles**: Explore different playing styles (Draw, Stud, Community, etc.)
- **Definitions**: Learn poker terminology
- **Random Game**: Discover new games with a random game generator
- **Search**: Search games by name or description
- **Tag Filtering**: Filter games by tags
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Markdown Support**: Game descriptions support markdown formatting

## 🎨 Customization

### Adding New Games

Edit `src/_data/games.json` and add a new game object:

```json
{
  "id": 999,
  "name": "Your Game Name",
  "description": "## Description\n\nYour game description with **markdown**",
  "style_id": 1,
  "min_players": 2,
  "max_players": 8,
  "num_cards": 5,
  "tags": ["wildcard"],
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Styling

Customize the appearance by editing:
- `src/css/style.css` - Custom styles
- `src/_includes/layout.njk` - Base layout and Bootstrap integration

### Filters and Helpers

Custom Eleventy filters are defined in `.eleventy.js`:
- `markdown` - Render markdown content
- `clickableTag` - Create clickable tag badges
- `sortBy` - Sort arrays by property
- `random` - Get random item from array
- `newest` / `recent` - Get newest/recently updated items

## 🔗 Original Rails App

This project is based on the original Rails application:
- **Repository**: [github.com/thatRailsGuy/poker](https://github.com/thatRailsGuy/poker)
- **Live Demo**: [poker.clintcecil.com](http://poker.clintcecil.com/)

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more games to the database
- Improve the styling
- Add new features
- Fix bugs

---

Built with ❤️ using [Eleventy](https://www.11ty.dev/)

This project was developed with assistance from AI (Claude by Anthropic).
