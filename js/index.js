// Fix browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// NAVBAR START
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');
  const navItems = document.querySelectorAll('.nav-links > li:not(.dropdown)');
  const isMobile = () => window.innerWidth <= 992;

  // Toggle mobile menu
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    toggleMenuIcon();
  });

  // Handle dropdowns
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');

    link.addEventListener('click', function (e) {
      if (isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = dropdown.classList.contains('active');
        dropdowns.forEach(d => d.classList.remove('active'));
        if (!isActive) dropdown.classList.add('active');
      }
    });

    if (!isMobile()) {
      dropdown.addEventListener('mouseenter', function () {
        dropdown.classList.add('active');
      });
      dropdown.addEventListener('mouseleave', function () {
        dropdown.classList.remove('active');
      });
    }
  });

  // Close dropdowns when clicking on nav items
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (isMobile()) {
        dropdowns.forEach(d => d.classList.remove('active'));
      }
    });
  });

  dropdownLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (isMobile()) {
        dropdowns.forEach(d => d.classList.remove('active'));
        navLinks.classList.remove('active');
        toggleMenuIcon(false);
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (isMobile() && !e.target.closest('.navbar')) {
      dropdowns.forEach(d => d.classList.remove('active'));
      navLinks.classList.remove('active');
      toggleMenuIcon(false);
    }
  });

  window.addEventListener('resize', function () {
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



// HERO SLIDER START
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevArrow = document.querySelector('.slider-arrow.left');
  const nextArrow = document.querySelector('.slider-arrow.right');

  let currentIndex = 0;
  const slideCount = slides.length;
  let slideInterval;

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;

    resetInterval();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  function initSlider() {
    if (!slider) return;

    nextArrow?.addEventListener('click', nextSlide);
    prevArrow?.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    startInterval();

    slider.parentElement?.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    slider.parentElement?.addEventListener('mouseleave', () => {
      startInterval();
    });
  }

  initSlider();
});
// HERO SLIDER END



// AOS ANIMATION START
// GLOBAL ENHANCEMENTS
document.addEventListener('DOMContentLoaded', function () {
  // AOS init
 AOS.init({
  startEvent: 'DOMContentLoaded',
  once: false,               // animation bar bar repeat hogi
  offset: 120,
  disableMutationObserver: true
});


  // Fix scroll jump after AOS loads
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, 100);

  // Prevent anchor href="#" scroll
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });
});
// AOS ANIMATION END



 // TOP PICK SECTION START
  const products = {
      men: [
        { name: "Nike Air Max", price: "£120", image: "PRODUCTS/MP/MP1.webp" },
        { name: "Adidas Run Falcon", price: "£95", image: "PRODUCTS/MP/MP2.webp" },
        { name: "Puma Classic", price: "£80", image: "PRODUCTS/MP/MP3.webp" },
        { name: "adidas Trefoil Tracksuit Children", price: "£35", image: "PRODUCTS/MP/MP4.webp" }
      ],
      women: [
        { name: "Reebok Classic", price: "£70", image: "PRODUCTS/WP/WP1.jpg" },
        { name: "Puma Cali Bold", price: "£85", image: "PRODUCTS/WP/WP2.webp" },
        { name: "Adidas Originals", price: "£90", image: "PRODUCTS/WP/WB3.webp" },
        { name: "adidas Trefoil Tracksuit Children", price: "£35", image: "PRODUCTS/WP/WP4.webp" }
      ],
      kids: [
        { name: "Nike Dunk Low Children", price: "£60", image: "PRODUCTS/BP/BP1.jpg" },
        { name: "adidas Originals Handball Spezial Junior", price: "£70", image: "PRODUCTS/BP/BP2.jpg" },
        { name: "MONTIREX Girls’ Trail Box T-Shirt Junior", price: "£23", image: "PRODUCTS/BP/BP3.jpg" },
        { name: "adidas Trefoil Tracksuit Children", price: "£35", image: "PRODUCTS/BP/BP4.jpg" }
      ]
    };

    const buttons = document.querySelectorAll(".cat-btns button");
    const productGrid = document.getElementById("productGrid");

    function showCategory(category) {
      // Update active button
      buttons.forEach(btn => btn.classList.remove("active"));
      document.getElementById(`${category}Btn`).classList.add("active");

      // Fade-out animation (optional)
      productGrid.innerHTML = "";

      products[category].forEach((item, i) => {
        const card = document.createElement("div");
        card.className = "item-card";
       card.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <div class="price">${item.price}</div>
  <div class="title">${item.name}</div>
  <button class="add-to-cart-btn">
    <i class="fas fa-shopping-cart"></i> Add to Cart
  </button>
`;

        productGrid.appendChild(card);

        // Smooth fade-in
        setTimeout(() => card.classList.add("loaded"), 50 * i);
      });
    }

    // Default load
    showCategory('kids');
  // TOP PICK SECTION END



// <!-- REEL VIDEO SECTION START-->
 // JavaScript to ensure perfect seamless looping
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.marquee-track');
            const content = track.innerHTML;
            track.innerHTML = content + content; // Double the content for smoother looping
        });
// <!-- REEL VIDEO SECTION END -->



// FOOTER SECTION START
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            // Here you would typically send the email to your server
            alert('Thank you for subscribing!');
            emailInput.value = '';
        });
    }
    // FOOTER SECTION END