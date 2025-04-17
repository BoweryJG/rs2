// RepSpheres Homepage JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initializeAnimations();
  
  // Initialize intersection observers for scroll animations
  initializeScrollAnimations();
  
  // Initialize navigation interactions
  initializeNavigation();
  
  // Initialize pricing toggle
  initializePricingToggle();
  
  // Initialize testimonial carousel
  initializeTestimonialCarousel();
  
  // Initialize dashboard interaction
  initializeDashboardInteraction();
  
  // Initialize sphere card hover effects
  initializeSphereCards();
});

// Navigation and header interactions
function initializeNavigation() {
  const header = document.querySelector('header');
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.classList.add('mobile-menu-toggle');
  mobileMenuToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  `;
  
  const nav = document.querySelector('nav');
  const headerActions = document.querySelector('.header-actions');
  
  // Add mobile menu toggle to header
  document.querySelector('.header-content').prepend(mobileMenuToggle);
  
  // Handle scroll behavior for header
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    if (scrollTop > 100) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
      } else {
        // Scrolling up
        header.classList.remove('header-hidden');
      }
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
    headerActions.classList.toggle('actions-open');
    mobileMenuToggle.classList.toggle('toggle-active');
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          nav.classList.remove('nav-open');
          headerActions.classList.remove('actions-open');
          mobileMenuToggle.classList.remove('toggle-active');
        }
      }
    });
  });
}

// Initialize animations
function initializeAnimations() {
  // Add animation classes to elements
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-fade-in');
  });
  
  document.querySelectorAll('.sphere-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-fade-in');
  });
  
  document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-fade-in');
  });
  
  // Hero section animations
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent && heroImage) {
    heroContent.classList.add('animate-slide-in-left');
    heroImage.classList.add('animate-slide-in-right');
  }
}

// Initialize scroll animations using Intersection Observer
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('element-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    animatedElements.forEach(element => {
      element.classList.add('element-visible');
    });
  }
  
  // Counter animation for statistics
  const statValueElements = document.querySelectorAll('.stat-card-value');
  
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    statValueElements.forEach(element => {
      statObserver.observe(element);
    });
  }
}

// Counter animation function
function animateCounter(element) {
  const targetValue = parseFloat(element.textContent);
  const suffix = element.textContent.replace(/[0-9.]/g, '');
  const decimal = element.textContent.includes('.');
  const duration = 2000; // ms
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = duration / frameRate;
  
  let currentFrame = 0;
  let currentValue = 0;
  
  const animate = () => {
    currentFrame++;
    const progress = currentFrame / totalFrames;
    const easedProgress = ease(progress);
    
    currentValue = targetValue * easedProgress;
    
    if (decimal) {
      element.textContent = currentValue.toFixed(1) + suffix;
    } else {
      element.textContent = Math.round(currentValue) + suffix;
    }
    
    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
}

// Easing function
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Initialize pricing toggle
function initializePricingToggle() {
  // Create pricing toggle elements
  const pricingSection = document.querySelector('.pricing-grid');
  
  if (!pricingSection) return;
  
  const pricingToggleContainer = document.createElement('div');
  pricingToggleContainer.classList.add('pricing-toggle-container');
  
  pricingToggleContainer.innerHTML = `
    <div class="pricing-toggle">
      <span class="pricing-period-label active">Monthly</span>
      <label class="toggle-switch">
        <input type="checkbox" id="pricing-toggle">
        <span class="toggle-slider"></span>
      </label>
      <span class="pricing-period-label">Annual <span class="discount-label">Save 20%</span></span>
    </div>
  `;
  
  // Insert toggle before pricing grid
  pricingSection.parentNode.insertBefore(pricingToggleContainer, pricingSection);
  
  // Monthly and annual pricing data
  const pricingData = {
    standard: {
      monthly: 199,
      annual: 159
    },
    premium: {
      monthly: 349,
      annual: 279
    }
  };
  
  // Get pricing elements
  const standardPriceElement = document.querySelector('.pricing-card:nth-child(1) .pricing-value');
  const premiumPriceElement = document.querySelector('.pricing-card:nth-child(2) .pricing-value');
  const standardPeriodElement = document.querySelector('.pricing-card:nth-child(1) .pricing-period');
  const premiumPeriodElement = document.querySelector('.pricing-card:nth-child(2) .pricing-period');
  
  // Toggle functionality
  const toggle = document.getElementById('pricing-toggle');
  const monthlyLabel = document.querySelector('.pricing-period-label:nth-child(1)');
  const annualLabel = document.querySelector('.pricing-period-label:nth-child(3)');
  
  toggle.addEventListener('change', function() {
    if (this.checked) {
      // Annual pricing
      standardPriceElement.textContent = `$${pricingData.standard.annual}`;
      premiumPriceElement.textContent = `$${pricingData.premium.annual}`;
      standardPeriodElement.textContent = 'per user / month (billed annually)';
      premiumPeriodElement.textContent = 'per user / month (billed annually)';
      monthlyLabel.classList.remove('active');
      annualLabel.classList.add('active');
    } else {
      // Monthly pricing
      standardPriceElement.textContent = `$${pricingData.standard.monthly}`;
      premiumPriceElement.textContent = `$${pricingData.premium.monthly}`;
      standardPeriodElement.textContent = 'per user / month';
      premiumPeriodElement.textContent = 'per user / month';
      monthlyLabel.classList.add('active');
      annualLabel.classList.remove('active');
    }
  });
  
  // Click event for labels
  monthlyLabel.addEventListener('click', function() {
    toggle.checked = false;
    toggle.dispatchEvent(new Event('change'));
  });
  
  annualLabel.addEventListener('click', function() {
    toggle.checked = true;
    toggle.dispatchEvent(new Event('change'));
  });
}

// Initialize testimonial carousel
function initializeTestimonialCarousel() {
  const testimonialSection = document.querySelector('.testimonial-section');
  
  if (!testimonialSection) return;
  
  // Create testimonial data
  const testimonials = [
    {
      text: "RepSpheres has transformed how our sales team operates. We've seen a 32% increase in engagement rates and our reps are closing more deals with less effort.",
      author: "Sarah Johnson",
      title: "VP of Sales, MedTech Innovations",
      image: "/api/placeholder/48/48"
    },
    {
      text: "The Intelligence Vault gives us insights that would have taken months of market research to compile. It's like having a crystal ball for healthcare trends.",
      author: "Michael Chen",
      title: "Director of Marketing, PharmaGlobal",
      image: "/api/placeholder/48/48"
    },
    {
      text: "Our team's productivity improved dramatically within the first month. The AI recommendations help our reps prioritize their time and focus on high-value accounts.",
      author: "Jennifer Wilson",
      title: "Sales Operations Manager, BioTech Solutions",
      image: "/api/placeholder/48/48"
    }
  ];
  
  // Create carousel navigation
  const carouselNav = document.createElement('div');
  carouselNav.classList.add('carousel-nav');
  
  carouselNav.innerHTML = `
    <button class="carousel-prev">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
    </button>
    <div class="carousel-indicators"></div>
    <button class="carousel-next">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
  `;
  
  // Create indicators
  const indicatorsContainer = carouselNav.querySelector('.carousel-indicators');
  
  testimonials.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.setAttribute('data-index', index);
    indicatorsContainer.appendChild(indicator);
  });
  
  // Add carousel navigation to testimonial section
  testimonialSection.appendChild(carouselNav);
  
  // Get testimonial elements
  const testimonialText = testimonialSection.querySelector('.testimonial-text');
  const authorName = testimonialSection.querySelector('.author-info h4');
  const authorTitle = testimonialSection.querySelector('.author-info p');
  const authorAvatar = testimonialSection.querySelector('.author-avatar img');
  
  // Initialize current index
  let currentIndex = 0;
  
  // Functions to update testimonial
  function updateTestimonial(index) {
    // Fade out
    testimonialSection.classList.add('testimonial-fade-out');
    
    setTimeout(() => {
      // Update content
      testimonialText.textContent = testimonials[index].text;
      authorName.textContent = testimonials[index].author;
      authorTitle.textContent = testimonials[index].title;
      authorAvatar.src = testimonials[index].image;
      
      // Update indicators
      document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
      
      // Fade in
      testimonialSection.classList.remove('testimonial-fade-out');
      currentIndex = index;
    }, 300);
  }
  
  function nextTestimonial() {
    const newIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(newIndex);
  }
  
  function prevTestimonial() {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(newIndex);
  }
  
  // Add event listeners
  carouselNav.querySelector('.carousel-next').addEventListener('click', nextTestimonial);
  carouselNav.querySelector('.carousel-prev').addEventListener('click', prevTestimonial);
  
  // Add event listeners to indicators
  document.querySelectorAll('.carousel-indicator').forEach(indicator => {
    indicator.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      updateTestimonial(index);
    });
  });
  
  // Auto-rotate testimonials
  let intervalId = setInterval(nextTestimonial, 5000);
  
  // Pause auto-rotation on hover
  testimonialSection.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });
  
  testimonialSection.addEventListener('mouseleave', () => {
    intervalId = setInterval(nextTestimonial, 5000);
  });
}

// Initialize dashboard interaction
function initializeDashboardInteraction() {
  const dashboardPreview = document.querySelector('.dashboard-preview');
  
  if (!dashboardPreview) return;
  
  // Add hover interactions
  dashboardPreview.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;
    
    const maxRotation = 8;
    const xRotation = -yPercent * maxRotation;
    const yRotation = xPercent * maxRotation;
    
    this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  });
  
  dashboardPreview.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg)';
  });
}

// Initialize sphere card interactions
function initializeSphereCards() {
  const sphereCards = document.querySelectorAll('.sphere-card');
  
  sphereCards.forEach(card => {
    const overlay = card.querySelector('.upgrade-overlay');
    
    if (!overlay) return;
    
    // Add hover effect to show overlay with slight delay
    card.addEventListener('mouseenter', function() {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 200);
    });
    
    // Add hover effect for action button
    const upgradeBtn = overlay.querySelector('.btn-premium');
    
    if (upgradeBtn) {
      upgradeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      
      upgradeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  });
}

// Add CSS styles dynamically
function addDynamicStyles() {
  const styleElement = document.createElement('style');
  
  styleElement.textContent = `
    /* Animation Classes */
    .animate-fade-in {
      opacity: 0;
      animation: fadeIn 0.8s ease forwards;
    }
    
    .animate-slide-in-left {
      opacity: 0;
      transform: translateX(-30px);
      animation: slideInLeft 0.8s ease forwards;
    }
    
    .animate-slide-in-right {
      opacity: 0;
      transform: translateX(30px);
      animation: slideInRight 0.8s ease forwards;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .element-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Animation Keyframes */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    /* Header Scroll Styles */
    .header-scrolled {
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 0.5rem 0;
      transition: all 0.3s ease;
    }
    
    .header-hidden {
      transform: translateY(-100%);
      transition: transform 0.4s ease;
    }
    
    /* Mobile Menu Styles */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--text);
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    /* Pricing Toggle Styles */
    .pricing-toggle-container {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .pricing-toggle {
      display: inline-flex;
      align-items: center;
      background-color: var(--bg-light);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      box-shadow: var(--shadow-sm);
    }
    
    .pricing-period-label {
      font-size: 0.875rem;
      color: var(--text-light);
      cursor: pointer;
      padding: 0 1rem;
      transition: color 0.2s;
    }
    
    .pricing-period-label.active {
      color: var(--primary);
      font-weight: 600;
    }
    
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 24px;
    }
    
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .toggle-slider {
      background-color: var(--primary);
    }
    
    input:checked + .toggle-slider:before {
      transform: translateX(24px);
    }
    
    .discount-label {
      background-color: var(--accent);
      color: white;
      font-size: 0.7rem;
      padding: 0.1rem 0.4rem;
      border-radius: 1rem;
      margin-left: 0.5rem;
      font-weight: 600;
    }
    
    /* Testimonial Carousel Styles */
    .testimonial-fade-out {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .carousel-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
    }
    
    .carousel-prev,
    .carousel-next {
      background: none;
      border: none;
      color: var(--text-light);
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: color 0.2s, background-color 0.2s;
      border-radius: 50%;
    }
    
    .carousel-prev:hover,
    .carousel-next:hover {
      color: var(--primary);
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .carousel-indicators {
      display: flex;
      gap: 0.5rem;
      margin: 0 1rem;
    }
    
    .carousel-indicator {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: var(--text-light);
      opacity: 0.3;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
    }
    
    .carousel-indicator.active {
      opacity: 1;
      background-color: var(--primary);
      transform: scale(1.2);
    }
    
    /* Media Queries */
    @media (max-width: 1024px) {
      .mobile-menu-toggle {
        display: block;
      }
      
      nav, .header-actions {
        display: none;
      }
      
      nav.nav-open, .header-actions.actions-open {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      
      nav.nav-open ul {
        flex-direction: column;
        width: 100%;
        text-align: center;
      }
      
      nav.nav-open li {
        margin: 0.5rem 0;
      }
      
      .header-content {
        flex-wrap: wrap;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}

// Call the function to add dynamic styles
addDynamicStyles();