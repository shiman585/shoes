// NAVBAR START
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const dropdowns = document.querySelectorAll('.dropdown');
        const dropdownLinks = document.querySelectorAll('.dropdown-content a');
        const navItems = document.querySelectorAll('.nav-links > li:not(.dropdown)');
        const isMobile = () => window.innerWidth <= 992;

        // Toggle mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            toggleMenuIcon();
        });

        // Handle dropdowns
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');

            // Click handler for mobile
            link.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all dropdowns first
                    dropdowns.forEach(d => d.classList.remove('active'));
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                    }
                }
            });

            // Hover handlers for desktop
            if (!isMobile()) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });

                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Close dropdowns when clicking on regular nav items (mobile)
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (isMobile()) {
                    dropdowns.forEach(d => d.classList.remove('active'));
                }
            });
        });

        // Close dropdowns when clicking on dropdown links (mobile)
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMobile()) {
                    dropdowns.forEach(d => d.classList.remove('active'));
                    navLinks.classList.remove('active');
                    toggleMenuIcon(false);
                }
            });
        });

        // Close all when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (isMobile()) {
                if (!e.target.closest('.navbar')) {
                    dropdowns.forEach(d => d.classList.remove('active'));
                    navLinks.classList.remove('active');
                    toggleMenuIcon(false);
                }
            }
        });

        // Reset on resize
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                navLinks.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
                toggleMenuIcon(false);
            }
        });

        function toggleMenuIcon(active) {
            const icon = menuToggle.querySelector('i');
            if (typeof active === 'undefined') {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            } else {
                icon.classList.remove('fa-bars', 'fa-times');
                icon.classList.add(active ? 'fa-times' : 'fa-bars');
            }
        }
    });
    // NAVBAR END

  