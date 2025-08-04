// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    // Get the fixed home button link
    const fixedHomeLink = document.querySelector('.home-icon-link');
    // Get all content sections
    const pageContents = document.querySelectorAll('.page-content');

    // Function to show a specific page and hide others
    function showPage(pageId) {
        // Hide all page content sections
        pageContents.forEach(section => {
            section.classList.remove('active');
        });

        // Show the requested page content
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            // Scroll to the top of the main content area when a new page is displayed
            document.querySelector('main').scrollTop = 0;
        }

        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked navigation link
        // Check if the clicked element is a nav-link or the fixed-home-link
        const clickedNavLink = document.querySelector(`[data-page="${pageId}"]`);
        if (clickedNavLink && clickedNavLink.classList.contains('nav-link')) {
            clickedNavLink.classList.add('active');
        }
        // Special handling for the fixed home button if it's the active one
        if (pageId === 'home' && fixedHomeLink) {
            // No 'active' class on fixedHomeLink itself, but ensure other nav links are not active
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Add click event listener to the fixed home button
    if (fixedHomeLink) {
        fixedHomeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    }

    // Initialize: Show the home page when the script loads
    // Check if there's a hash in the URL (e.g., #personal-published-books)
    // If so, navigate to that section; otherwise, default to 'home'.
    const initialPageId = window.location.hash ? window.location.hash.substring(1) : 'home';
    showPage(initialPageId);

    // Also, ensure the correct nav link is active on initial load if a hash exists
    const initialNavLink = document.querySelector(`.nav-link[data-page="${initialPageId}"]`);
    if (initialNavLink) {
        initialNavLink.classList.add('active');
    }
});
