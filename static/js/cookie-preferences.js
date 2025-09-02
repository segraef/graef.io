// Cookie preference management for footer or settings page
window.showCookiePreferences = function() {
  if (window.ClarityConsentManager) {
    window.ClarityConsentManager.resetConsent();
  } else {
    console.warn('Clarity Consent Manager not loaded');
  }
};

// Add a "Manage Cookies" link to footer if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
  // Try to add the manage cookies link to the footer
  const footer = document.querySelector('.footer');
  if (footer && !document.getElementById('manage-cookies-link')) {
    const manageCookiesLink = document.createElement('a');
    manageCookiesLink.id = 'manage-cookies-link';
    manageCookiesLink.href = '#';
    manageCookiesLink.textContent = 'Manage Cookies';
    manageCookiesLink.className = 'footer-link';
    manageCookiesLink.onclick = function(e) {
      e.preventDefault();
      window.showCookiePreferences();
    };

    // Add some styling
    manageCookiesLink.style.cssText = `
      margin-left: 10px;
      color: #6b7280;
      text-decoration: none;
      font-size: 0.875rem;
    `;

    manageCookiesLink.addEventListener('mouseover', function() {
      this.style.textDecoration = 'underline';
    });

    manageCookiesLink.addEventListener('mouseout', function() {
      this.style.textDecoration = 'none';
    });

    // Find a good place to insert it in the footer
    const footerContent = footer.querySelector('.footer-content') || footer;
    footerContent.appendChild(manageCookiesLink);
  }
});
