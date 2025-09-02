# Microsoft Clarity Cookie Consent Implementation

This implementation provides a GDPR-compliant cookie consent solution for Microsoft Clarity in Hugo, using the new Consent V2 API.

## Features

- ✅ **GDPR Compliant**: Implements Microsoft Clarity's Consent V2 API
- ✅ **User-Friendly**: Clean, modern UI with detailed cookie information
- ✅ **Granular Control**: Separate consent for analytics and marketing cookies
- ✅ **Persistent Storage**: Remembers user preferences for 1 year
- ✅ **Accessibility**: ARIA labels and keyboard navigation support
- ✅ **Responsive**: Works on all device sizes
- ✅ **Theme Support**: Respects dark/light theme preferences

## Files Created

### Core Implementation
- `layouts/partials/analytics/clarity-with-consent.html` - Clarity setup with consent management
- `layouts/partials/cookie-consent-banner.html` - Cookie consent UI
- `layouts/partials/head/clarity-consent-head.html` - Head includes for consent system
- `layouts/_default/baseof.html` - Base template override to include consent

### Styling and Scripts
- `static/css/clarity-consent.css` - Consent banner styling
- `static/js/cookie-preferences.js` - Footer "Manage Cookies" functionality

### Content
- `content/privacy-policy.md` - Privacy policy page

## Configuration

Update your `config.toml`:

```toml
[params.analytics]
  enable = true
  [params.analytics.clarity]
    id = "your-clarity-id"
    enable = true

[params.cookieconsent]
  enable = true
  [params.cookieconsent.content]
    header = "🍪 Cookie Preferences"
    message = "We use Microsoft Clarity to analyze how you interact with our website..."
    acceptAll = "Accept All"
    acceptNecessary = "Accept Necessary"
    reject = "Reject All"
    link = "Privacy Policy"
    href = "/privacy-policy/"
```

## User Experience

### First Visit
1. User sees cookie consent banner at bottom of screen
2. Can expand "Cookie Details" to learn about different cookie types
3. Three options:
   - **Accept All**: Enables all tracking
   - **Accept Necessary**: Analytics only, no marketing cookies
   - **Reject All**: No cookies (limited tracking with unique page IDs)

### Return Visits
- Consent preference remembered for 1 year
- Banner doesn't show again unless preferences expire or are reset

### Preference Management
- "Manage Cookies" link automatically added to footer
- Users can change preferences anytime
- "Reset Preferences" button in consent banner

## Technical Details

### Consent States
The implementation uses Microsoft Clarity's Consent V2 API:

```javascript
window.clarity('consentv2', {
  ad_Storage: "granted|denied",      // Marketing cookies
  analytics_Storage: "granted|denied" // Analytics cookies
});
```

### Storage
- Preferences stored in `localStorage` as JSON
- Includes timestamp for expiration checking
- Falls back gracefully if localStorage unavailable

### Compliance
- Required for EEA, UK, and Switzerland users (October 31, 2025+)
- GDPR-compliant consent collection
- Clear cookie categorization and purposes

## Customization

### Styling
Edit `static/css/clarity-consent.css` or use CSS custom properties:

```css
.clarity-consent-banner.theme-custom {
  --consent-bg: your-bg-color;
  --consent-text: your-text-color;
  --consent-btn-bg: your-button-color;
}
```

### Content
Modify text in `config.toml` under `params.cookieconsent.content`.

### Behavior
Adjust consent logic in `layouts/partials/analytics/clarity-with-consent.html`.

## Testing

1. **First Visit**: Clear localStorage and cookies, refresh page
2. **Consent Options**: Test each consent option (Accept All, Necessary, Reject)
3. **Persistence**: Refresh page, ensure banner doesn't reappear
4. **Reset**: Click "Reset Preferences" to show banner again
5. **Footer Link**: Verify "Manage Cookies" link works

## Monitoring

Check browser console for:
- Successful consent API calls
- Any JavaScript errors
- Clarity tracking status

Check Microsoft Clarity dashboard for:
- Session data collection
- Consent signal compliance
- Regional tracking behavior

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Clarity project ID is correct
3. Test in different browsers
4. Review Microsoft Clarity documentation

## Advantages Over Standard Cookie Consent Libraries

1. **Built for Clarity**: Specifically implements Clarity's Consent V2 API
2. **Lightweight**: No external dependencies beyond Clarity
3. **Modern**: Uses current web standards and accessibility practices
4. **Compliant**: Follows Microsoft's latest consent requirements
5. **Integrated**: Seamlessly works with Hugo and your theme
