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
    let initialPageId = 'home';
const path = window.location.pathname.replace(/^\/+|\/+$/g, ''); // Get and clean the path (e.g., 'personal-published-books')
const hash = window.location.hash.substring(1); // Get the hash (e.g., 'personal-published-books')

if (hash) {
    // 1. Priority: If a hash exists (from a click or a hash link paste), use it.
    initialPageId = hash;
} else if (path && path !== 'index.html') {
    // 2. Secondary: If no hash, but there's a path (from a direct clean URL paste), use the path.
    initialPageId = path;
    
    // IMPORTANT: Update the browser URL to use the hash now.
    // This makes sure future internal clicks and history tracking work correctly.
    // Without this, the browser back button can get confused.
    window.history.replaceState(null, null, '#' + path);

    // After replacing state, the window.location.hash will be updated for the showPage call.

} 

// 3. Display the determined page
showPage(initialPageId);

// Ensure the correct nav link is active on initial load
const activeIdForNav = initialPageId; // Use the determined ID to activate the nav link
const initialNavLink = document.querySelector(`[data-page="${activeIdForNav}"]`);
if (initialNavLink && initialNavLink.classList.contains('nav-link')) {
    initialNavLink.classList.add('active');
}
// Handle the home link separately if active
if (activeIdForNav === 'home' && fixedHomeLink) {
    // Remove active from any other nav link
    navLinks.forEach(link => link.classList.remove('active'));
}

});
