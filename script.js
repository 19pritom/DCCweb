// Course Eligibility Function
function showEligibleCourses() {
  const qualification = document.getElementById('qualification');
  const courseOptions = document.getElementById('courseOptions');
  
  if (!qualification || !courseOptions) return;
  
  const q = qualification.value;
  let courses = '';
  
  if (q === "10th/12th") {
    courses = `
      <div class="alert alert-info">
        <strong>Eligible Courses:</strong> CCA, DCA, ADCA, TALLY, DIA
      </div>
      <p class="text-muted">*Basic computer knowledge recommended</p>
    `;
  } else if (q === "graduate") {
    courses = `
      <div class="alert alert-success">
        <strong>Eligible Courses:</strong> You are eligible for all courses
      </div>
    `;
  }
  
  courseOptions.innerHTML = courses;
}

// Smooth Scrolling for Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate offset based on navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Form Submission Handling
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
      // Show loading state
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual fetch/axios call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success mt-3';
      alertDiv.textContent = 'Thank you! Your message has been sent successfully.';
      this.appendChild(alertDiv);
      
      // Reset form
      this.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-danger mt-3';
      alertDiv.textContent = 'There was an error submitting your form. Please try again.';
      this.appendChild(alertDiv);
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      // Remove alert after 5 seconds
      setTimeout(() => {
        const alert = this.querySelector('.alert');
        if (alert) alert.remove();
      }, 5000);
    }
  });
});
// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const responseDiv = document.getElementById('formResponse');
  
  // Show loading state
  submitText.textContent = 'Sending...';
  submitSpinner.classList.remove('d-none');
  submitBtn.disabled = true;
  responseDiv.innerHTML = '';
  
  try {
    const formData = new FormData(form);
    
    const response = await fetch('save_to_excel.php', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      responseDiv.innerHTML = `
        <div class="alert alert-success">${result.message}</div>
      `;
      form.reset();
    } else {
      responseDiv.innerHTML = `
        <div class="alert alert-danger">${result.message}</div>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
    responseDiv.innerHTML = `
      <div class="alert alert-danger">There was an error submitting your form. Please try again.</div>
    `;
  } finally {
    // Reset button state
    submitText.textContent = 'Send Message';
    submitSpinner.classList.add('d-none');
    submitBtn.disabled = false;
  }
});