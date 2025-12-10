const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
  // Markdown setup
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs);

  // Custom filter for rendering markdown
  eleventyConfig.addFilter('markdown', (content) => {
    if (!content) return '';
    return markdownLibrary.render(content);
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
    dataTemplateEngine: 'njk'
  };
};
