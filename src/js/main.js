// Main JavaScript for Poker House

document.addEventListener('DOMContentLoaded', function() {
  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Handle search functionality
  const searchInput = document.querySelector('input[name="search"]');
  if (searchInput) {
    const searchTerm = getUrlParameter('search');
    if (searchTerm) {
      searchInput.value = searchTerm;
    }
  }

  // Handle tag filtering
  const tagParam = getUrlParameter('tag');
  if (tagParam && window.location.pathname.includes('/games/')) {
    // Filter games by tag client-side
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
      const tags = row.querySelector('td:last-child');
      if (tags && !tags.textContent.includes(tagParam)) {
        row.style.display = 'none';
      }
    });
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
