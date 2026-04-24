/**
 * Pixel Website - Main JavaScript
 * Provides interactive effects and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavigation();
  initScrollEffects();
  initHoverEffects();
  initTypingEffect();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  // Get current page and highlight nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if current page matches the link
    if (currentPath.endsWith(href) || 
        (currentPath.endsWith('/') && href === 'index.html') ||
        (currentPath.endsWith('/pixel-website/') && href === 'index.html')) {
      link.classList.add('active');
    }
    
    // Add click effect
    link.addEventListener('click', function(e) {
      // Create pixel burst effect on click
      createPixelBurst(e);
    });
  });
}

/**
 * Scroll-based effects
 */
function initScrollEffects() {
  // Fade in elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and timeline items
  document.querySelectorAll('.card, .project-card, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Parallax effect for hero section (subtle)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
  }
}

/**
 * Hover effects for interactive elements
 */
function initHoverEffects() {
  // Project cards hover sound effect simulation (visual)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.1s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.2s ease';
    });
  });
  
  // Skill tags interactive effect
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translate(-2px, -2px) rotate(-2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0) rotate(0deg)';
    });
  });
}

/**
 * Typing effect for hero text
 */
function initTypingEffect() {
  const typingElement = document.querySelector('.hero-title');
  if (!typingElement) return;
  
  const text = typingElement.textContent;
  typingElement.textContent = '';
  typingElement.classList.add('typing');
  
  let index = 0;
  const typeSpeed = 150; // milliseconds per character
  
  function typeCharacter() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeCharacter, typeSpeed);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeCharacter, 500);
}

/**
 * Create pixel burst effect on click
 * @param {Event} e - Click event
 */
function createPixelBurst(e) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
  `;
  
  // Create 8 pixel particles
  for (let i = 0; i < 8; i++) {
    const pixel = document.createElement('div');
    const angle = (i / 8) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    const size = 4 + Math.random() * 4;
    const color = ['#5fcde4', '#f4b41b', '#ff6b97'][Math.floor(Math.random() * 3)];
    
    pixel.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      transform: translate(-50%, -50%);
      animation: pixelBurst 0.4s ease-out forwards;
      --tx: ${Math.cos(angle) * distance}px;
      --ty: ${Math.sin(angle) * distance}px;
    `;
    
    container.appendChild(pixel);
  }
  
  document.body.appendChild(container);
  
  // Remove after animation
  setTimeout(() => {
    container.remove();
  }, 500);
}

// Add keyframe animation for pixel burst
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pixelBurst {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) translate(var(--tx), var(--ty));
    }
  }
`;
document.head.appendChild(styleSheet);

/**
 * Utility: Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Random decorative pixel
 */
function createRandomPixel() {
  const pixel = document.createElement('div');
  const colors = ['#5fcde4', '#f4b41b', '#ff6b97', '#5cd4a0'];
  
  pixel.style.cssText = `
    position: fixed;
    width: ${4 + Math.random() * 4}px;
    height: ${4 + Math.random() * 4}px;
    background-color: ${colors[Math.floor(Math.random() * colors.length)]};
    left: ${Math.random() * window.innerWidth}px;
    top: ${Math.random() * window.innerHeight}px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
    animation: floatPixel ${3 + Math.random() * 4}s ease-in-out infinite;
    animation-delay: ${Math.random() * 2}s;
  `;
  
  document.body.appendChild(pixel);
}

// Add floating pixel animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes floatPixel {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.7;
    }
  }
`;
document.head.appendChild(floatStyle);
