---
title: "Privacy & Cookie Policy"
date: 2024-01-01T00:00:00Z
draft: false
hiddenFromHomePage: true
hiddenFromSearch: false
---

## Overview

This website ("graef.io") is committed to protecting your privacy. This policy explains how we collect, use, and protect your information when you visit our website.

## Information We Collect

### Analytics Data
We use analytics tools to understand how visitors interact with our website. This helps us improve your experience and optimize our content.

Currently, we use **Microsoft Clarity** for website analytics.

### What Analytics Data We Collect
- Page views and navigation patterns
- Mouse movements, clicks, and scrolls
- Device and browser information
- Geographic location (country/region level)
- Referring websites

## Your Cookie Choices

We respect your right to control your data. When you first visit our site, you'll see a cookie consent banner with these options:

- **Accept All**: Enables full analytics and marketing cookies
- **Accept Necessary**: Only enables essential analytics cookies
- **Reject All**: Disables all non-essential cookies

### Cookie Categories

#### Analytics Cookies
These cookies help us understand how visitors interact with our website by collecting information anonymously through Microsoft Clarity. They help us:
- Improve website performance
- Understand user behavior patterns
- Optimize content and navigation

#### Marketing Cookies
These cookies may be used to build a profile of your interests and show you relevant content. Currently, we primarily use these for enhanced analytics features.

## Data Storage and Retention

- **Microsoft Clarity**: Data is stored according to [Microsoft's Privacy Statement](https://privacy.microsoft.com/privacystatement)
- **Consent Preferences**: Stored locally in your browser for 1 year
- **No Personal Information**: We don't collect names, emails, or other personal identifiers

## Your Rights

You have the right to:
- **Change your preferences**: Click "Reset Preferences" in the cookie banner (available in the footer)
- **Access your data**: Contact Microsoft directly regarding Clarity data
- **Request deletion**: Contact us to request data removal

## Updates to This Policy

We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.

## Contact

If you have questions about this privacy policy, please [contact me through LinkedIn](https://linkedin.com/in/sgraef).

---

## Technical Implementation

This website uses Microsoft Clarity's Consent V2 API to ensure GDPR compliance:

```javascript
window.clarity('consentv2', {
  ad_Storage: "granted|denied",
  analytics_Storage: "granted|denied"
});
```

For users in the EEA, UK, and Switzerland, consent signals are required starting October 31, 2025.

---

*Last updated: September 2, 2025*
