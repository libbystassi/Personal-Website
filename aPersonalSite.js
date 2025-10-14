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
        const clickedNavLink = document.querySelector(`[data-page="${pageId}"]`);
        if (clickedNavLink && clickedNavLink.classList.contains('nav-link')) {
            clickedNavLink.classList.add('active');
        }
        // Special handling for the fixed home button if it's the active one
        if (pageId === 'home' && fixedHomeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const pageId = this.getAttribute('data-page');
            
            // IMPORTANT: Setting the hash triggers the 'hashchange' listener below
            window.location.hash = pageId; 
            
            // We still call showPage directly to ensure instant update in all browsers/scenarios
            showPage(pageId); 
        });
    });

    // Add click event listener to the fixed home button
    if (fixedHomeLink) {
        fixedHomeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const pageId = this.getAttribute('data-page');
            
            // IMPORTANT: Setting the hash triggers the 'hashchange' listener below
            window.location.hash = pageId;
            
            showPage(pageId);
        });
    }

    // ====================================================================
    // NEW FEATURE: INSTANT PAGE UPDATE ON HASH CHANGE
    // This solves the problem of manually changing the URL hash and pressing Enter.
    // ====================================================================
    window.addEventListener('hashchange', function() {
        // When the hash changes (e.g., from #page-A to #page-B), update the content.
        const newPageId = window.location.hash.substring(1) || 'home';
        showPage(newPageId);
    });


    // ====================================================================
    // INITIALIZATION LOGIC (THE DEFINITIVE FIX FOR DIRECT URL PASTES)
    // ====================================================================

    function initializePage() {
        let initialPageId = 'home';
        const hash = window.location.hash.substring(1); 
        
        // 1. Get the current URL pathname
        let path = window.location.pathname.replace(/^\/+|\/+$/g, ''); 

        // 2. Decode the path to handle URL encoding (%20 for space, %21 for !)
        try {
            path = decodeURIComponent(path);
        } catch (e) {
            // Handle decode error if path is malformed
        }
        
        if (hash) {
            // Priority 1: If a hash exists, use it.
            initialPageId = hash;
        } 
        else if (path && path !== 'index.html' && path !== '') {
            // Priority 2: If there's a clean path (from a direct paste), use it.
            initialPageId = path;
            
            // CRITICAL: Update the browser URL to use the hash now.
            // This corrects the address bar without causing a reload.
            window.history.replaceState(null, null, '#' + path); 
        } 

        // 3. Display the determined page
        showPage(initialPageId);

        // 4. Update the navigation bar 'active' state
        const activeIdForNav = initialPageId; 
        const initialNavLink = document.querySelector(`[data-page="${activeIdForNav}"]`);

        // Ensure all nav links are cleaned first before setting active state
        navLinks.forEach(link => link.classList.remove('active'));

        if (initialNavLink && initialNavLink.classList.contains('nav-link')) {
            initialNavLink.classList.add('active');
        }
    }

    // Run the final, working initialization function
    initializePage(); 

});