// Main JavaScript for Poker House

document.addEventListener('DOMContentLoaded', function() {
  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Handle search functionality on games page
  const gameSearchInput = document.getElementById('game-search');
  const searchResults = document.getElementById('search-results');

  if (gameSearchInput) {
    // Get search term from URL
    const searchTerm = getUrlParameter('search');
    if (searchTerm) {
      gameSearchInput.value = searchTerm;
      performSearch(searchTerm);
    }

    // Add search input listener
    gameSearchInput.addEventListener('input', function(e) {
      performSearch(e.target.value);
    });
  }

  function performSearch(searchTerm) {
    const rows = document.querySelectorAll('table tbody tr');
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;

    rows.forEach(row => {
      if (!term) {
        row.style.display = '';
        visibleCount++;
        return;
      }

      // Search in name (first cell) and tags (last cell)
      const name = row.querySelector('td:first-child')?.textContent.toLowerCase() || '';
      const tags = row.querySelector('td:last-child')?.textContent.toLowerCase() || '';
      const style = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';

      if (name.includes(term) || tags.includes(term) || style.includes(term)) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    // Update search results message
    if (searchResults) {
      if (term && visibleCount === 0) {
        searchResults.textContent = 'No games found matching your search.';
        searchResults.classList.remove('d-none', 'alert-info');
        searchResults.classList.add('alert-warning');
      } else if (term && visibleCount > 0) {
        searchResults.textContent = `Found ${visibleCount} game${visibleCount !== 1 ? 's' : ''} matching "${searchTerm}"`;
        searchResults.classList.remove('d-none', 'alert-warning');
        searchResults.classList.add('alert-info');
      } else {
        searchResults.classList.add('d-none');
      }
    }
  }

  // Handle tag filtering
  const tagParam = getUrlParameter('tag');
  if (tagParam && window.location.pathname.includes('/games/')) {
    // If there's a tag parameter and a search input, use it
    if (gameSearchInput) {
      gameSearchInput.value = tagParam;
      performSearch(tagParam);
    } else {
      // Fallback for pages without search input
      const rows = document.querySelectorAll('table tbody tr');
      rows.forEach(row => {
        const tags = row.querySelector('td:last-child');
        if (tags && !tags.textContent.includes(tagParam)) {
          row.style.display = 'none';
        }
      });
    }
  }

  // Table sorting functionality
  const gamesTable = document.getElementById('games-table');
  if (gamesTable) {
    const headers = gamesTable.querySelectorAll('th.sortable');
    let sortDirection = {};

    headers.forEach(header => {
      const columnIndex = parseInt(header.dataset.column);
      sortDirection[columnIndex] = 'asc';

      header.style.cursor = 'pointer';
      header.addEventListener('click', function() {
        sortTable(columnIndex);
      });
    });

    function sortTable(columnIndex) {
      const tbody = gamesTable.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      // Toggle sort direction
      const isAsc = sortDirection[columnIndex] === 'asc';
      sortDirection[columnIndex] = isAsc ? 'desc' : 'asc';

      // Update sort indicators
      headers.forEach(h => {
        const indicator = h.querySelector('.sort-indicator');
        if (parseInt(h.dataset.column) === columnIndex) {
          indicator.textContent = isAsc ? ' ▲' : ' ▼';
        } else {
          indicator.textContent = '';
        }
      });

      // Sort rows
      rows.sort((a, b) => {
        const aCell = a.querySelectorAll('td')[columnIndex];
        const bCell = b.querySelectorAll('td')[columnIndex];

        let aValue = aCell.textContent.trim();
        let bValue = bCell.textContent.trim();

        // Try to parse as numbers for numeric columns
        if (columnIndex >= 2 && columnIndex <= 4) {
          aValue = parseInt(aValue) || 0;
          bValue = parseInt(bValue) || 0;
        }

        if (aValue < bValue) return isAsc ? -1 : 1;
        if (aValue > bValue) return isAsc ? 1 : -1;
        return 0;
      });

      // Re-append rows in sorted order
      rows.forEach(row => tbody.appendChild(row));
    }
  }

  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll('.alert:not(.alert-info)');
  alerts.forEach(alert => {
    if (alert.textContent.trim()) {
      setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }, 5000);
    }
  });
});
