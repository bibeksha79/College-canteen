// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuBtns = document.querySelectorAll('.menu-btn');
const menuItems = document.querySelectorAll('.menu-item');
const contactForm = document.getElementById('contactForm');

// Page Navigation System
function showPage(targetPageId) {
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(targetPageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${targetPageId}`) {
      link.classList.add('active');
    }
  });
  
  // Close mobile menu if open
  navMenu.classList.remove('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Navigation Click Handlers
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPageId = link.getAttribute('href').substring(1);
    showPage(targetPageId);
  });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// Menu Filter System
function filterMenuItems(category) {
  menuItems.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
      item.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      item.style.display = 'none';
    }
  });
}

// Menu Button Click Handlers
menuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    menuBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter menu items
    const category = btn.getAttribute('data-category');
    filterMenuItems(category);
  });
});

// Contact Form Handler
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields!', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address!', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: white;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `;
  
  // Set background color based on type
  switch (type) {
    case 'success':
      notification.style.background = '#27ae60';
      break;
    case 'error':
      notification.style.background = '#e74c3c';
      break;
    default:
      notification.style.background = '#3498db';
  }
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
  
  // Close button handler
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    showPage(targetId);
  }
});

// Animation on scroll (for better UX)
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
    }
  });
}

// Scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  // Show home page by default
  showPage('home');
  
  // Initialize animations
  animateOnScroll();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(44, 62, 80, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Add some interactive effects
document.addEventListener('mouseover', (e) => {
  // Add hover effects for menu items
  if (e.target.closest('.menu-item')) {
    e.target.closest('.menu-item').style.transform = 'translateY(-5px) scale(1.02)';
  }
  
  // Add hover effects for gallery items
  if (e.target.closest('.gallery-item')) {
    e.target.closest('.gallery-item').style.transform = 'translateY(-10px)';
  }
});

document.addEventListener('mouseout', (e) => {
  // Remove hover effects for menu items
  if (e.target.closest('.menu-item')) {
    e.target.closest('.menu-item').style.transform = 'translateY(0) scale(1)';
  }
  
  // Remove hover effects for gallery items
  if (e.target.closest('.gallery-item')) {
    e.target.closest('.gallery-item').style.transform = 'translateY(0)';
  }
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn, .menu-btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn, .menu-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
  }
`;
document.head.appendChild(style);
