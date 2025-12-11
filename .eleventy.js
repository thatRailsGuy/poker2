const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
  // Markdown setup
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs);

  // Get path prefix from environment
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || '';

  // Custom filter for rendering markdown with game links and card images
  eleventyConfig.addFilter('markdown', (content, games) => {
    if (!content) return '';

    // Replace [game:Game Name] with links to game pages
    let processed = content.replace(/\[game:([^\]]+)\]/g, (match, gameName) => {
      // Find the game by name
      const game = games?.find(g => g.name === gameName);
      if (game) {
        return `[${gameName}](${pathPrefix}/games/${game.id}/)`;
      }
      return gameName; // Fallback to just the name if game not found
    });

    // Replace [card:rank of suit] with card images
    processed = processed.replace(/\[card:([^\]]+)\]/g, (match, cardName) => {
      // Parse card name (e.g., "ace of clubs", "2 of diamonds")
      const parts = cardName.toLowerCase().trim().match(/^(.+?)\s+of\s+(.+)$/);
      if (parts) {
        const rank = parts[1];
        const suit = parts[2];

        // Map rank names to card codes
        const rankMap = {
          'ace': 'A', 'a': 'A',
          '2': '2', 'two': '2',
          '3': '3', 'three': '3',
          '4': '4', 'four': '4',
          '5': '5', 'five': '5',
          '6': '6', 'six': '6',
          '7': '7', 'seven': '7',
          '8': '8', 'eight': '8',
          '9': '9', 'nine': '9',
          '10': '0', 'ten': '0',
          'jack': 'J', 'j': 'J',
          'queen': 'Q', 'q': 'Q',
          'king': 'K', 'k': 'K'
        };

        // Map suit names to suit codes
        const suitMap = {
          'spades': 'S', 'spade': 'S',
          'hearts': 'H', 'heart': 'H',
          'diamonds': 'D', 'diamond': 'D',
          'clubs': 'C', 'club': 'C'
        };

        const rankCode = rankMap[rank];
        const suitCode = suitMap[suit];

        if (rankCode && suitCode) {
          // Use deckofcardsapi.com for card images
          const cardCode = `${rankCode}${suitCode}`;
          // Create descriptive alt text
          const rankName = rank.charAt(0).toUpperCase() + rank.slice(1);
          const suitName = suit.charAt(0).toUpperCase() + suit.slice(1);
          return `<img src="https://deckofcardsapi.com/static/img/${cardCode}.png" alt="${rankName} of ${suitName}" class="card-img" role="img">`;
        }
      }
      return cardName; // Fallback to text if parsing fails
    });

    return markdownLibrary.render(processed);
  });

  // Custom filter for clickable tags
  eleventyConfig.addFilter('clickableTag', (tag) => {
    return `<a href="/games/?tag=${encodeURIComponent(tag)}" class="badge badge-primary">${tag}</a>`;
  });

  // Custom filter for array includes check
  eleventyConfig.addFilter('includes', (array, value) => {
    return array && array.includes(value);
  });

  // Filter for getting style name by ID
  eleventyConfig.addFilter('getStyleById', (styles, styleId) => {
    const style = styles.find(s => s.id === styleId);
    return style ? style.name : '';
  });

  // Filter for getting style object by ID
  eleventyConfig.addFilter('getStyleObjById', (styles, styleId) => {
    return styles.find(s => s.id === styleId);
  });

  // Filter for sorting
  eleventyConfig.addFilter('sortBy', (array, property) => {
    return [...array].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  });

  // Filter to get random item
  eleventyConfig.addFilter('random', (array) => {
    return array[Math.floor(Math.random() * array.length)];
  });

  // Filter to get recent items
  eleventyConfig.addFilter('recent', (array, limit = 5) => {
    return [...array]
      .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
      .slice(0, limit);
  });

  // Filter to get newest items
  eleventyConfig.addFilter('newest', (array, limit = 5) => {
    return [...array]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
  });

  // Filter for unique tags from games
  eleventyConfig.addFilter('getAllTags', (games) => {
    const tags = new Set();
    games.forEach(game => {
      if (game.tags && Array.isArray(game.tags)) {
        game.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  });

  // Filter for filtering games by tag
  eleventyConfig.addFilter('filterByTag', (games, tag) => {
    if (!tag) return games;
    return games.filter(game => game.tags && game.tags.includes(tag));
  });

  // Filter for filtering games by search term
  eleventyConfig.addFilter('search', (games, searchTerm) => {
    if (!searchTerm) return games;
    const term = searchTerm.toLowerCase();
    return games.filter(game => {
      return (game.name && game.name.toLowerCase().includes(term)) ||
             (game.description && game.description.toLowerCase().includes(term));
    });
  });

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');

  // Set custom directories
  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    },
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || '/'
  };
};
