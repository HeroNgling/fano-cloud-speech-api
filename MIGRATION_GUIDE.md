# Fano Speech API - GitBook to Mintlify Migration Guide

This guide provides step-by-step instructions for migrating your documentation from GitBook to Mintlify.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [File Structure](#file-structure)
4. [Migration Steps](#migration-steps)
5. [Customization](#customization)
6. [Deployment](#deployment)
7. [Post-Migration Checklist](#post-migration-checklist)

---

## Overview

This migration package converts your Fano Speech API documentation from GitBook format to Mintlify format. The package includes:

- `mint.json` - Main configuration file
- Documentation pages (`.mdx` files)
- API reference pages
- Release notes

### What's Included

```
mintlify-migration/
├── mint.json                          # Main configuration
├── docs/
│   ├── overview.mdx                   # Home/Overview page
│   ├── get-started/
│   │   ├── transcribe-pre-recorded-audio.mdx
│   │   └── transcribe-streaming-audio.mdx
│   ├── features/
│   │   ├── keyword-biasing.mdx
│   │   └── punctuation.mdx
│   └── model-and-language/
│       └── model-and-supported-language.mdx
├── api-reference/
│   ├── introduction.mdx
│   ├── authentication.mdx
│   ├── pre-recorded/
│   │   └── transcribe.mdx
│   └── streaming/
│       └── websocket-connection.mdx
├── release-notes/
│   ├── overview.mdx
│   └── changelog.mdx
├── logo/                              # Add your logo files here
│   ├── light.svg
│   └── dark.svg
├── images/                            # Add any images here
└── MIGRATION_GUIDE.md                 # This file
```

---

## Prerequisites

Before starting the migration:

1. **Node.js**: Install Node.js 18+ (https://nodejs.org)
2. **Mintlify CLI**: Install the Mintlify CLI
   ```bash
   npm install -g mintlify
   ```
3. **Git**: Ensure Git is installed for version control

---

## File Structure

### Configuration (mint.json)

The `mint.json` file is the central configuration. Key sections to customize:

```json
{
  "name": "Fano Speech API",           // Your documentation title
  "logo": {...},                        // Logo paths
  "colors": {...},                      // Brand colors
  "navigation": [...],                  // Page hierarchy
  "api": {
    "baseUrl": "https://api.fano.ai"   // Your API base URL
  }
}
```

### Page Format (MDX)

All pages use MDX format (Markdown + JSX components). Key frontmatter:

```yaml
---
title: 'Page Title'
description: 'Page description for SEO'
icon: 'icon-name'                      # Optional: FontAwesome icon
---
```

---

## Migration Steps

### Step 1: Download This Package

Copy all files from this migration package to your local machine or repository.

### Step 2: Add Your Logo

1. Export your logo in SVG format (recommended) or PNG
2. Create two versions:
   - `logo/light.svg` - For light mode (dark logo)
   - `logo/dark.svg` - For dark mode (light logo)
3. Add a favicon as `favicon.svg` or `favicon.png`

### Step 3: Update Brand Colors

Edit `mint.json` to match your brand:

```json
"colors": {
  "primary": "#YOUR_PRIMARY_COLOR",
  "light": "#YOUR_LIGHT_COLOR",
  "dark": "#YOUR_DARK_COLOR"
}
```

### Step 4: Update Content

**IMPORTANT**: The content in this package is template/placeholder content based on what was visible from the GitBook overview page. You need to:

1. **Review each `.mdx` file** and update with your actual content
2. **Copy content from GitBook** for each page:
   - Open your GitBook page
   - Copy the content
   - Paste into the corresponding `.mdx` file
   - Update formatting as needed (see Format Conversion below)

### Step 5: Format Conversion Reference

| GitBook Element | Mintlify Equivalent |
|-----------------|---------------------|
| `# Heading` | `# Heading` (same) |
| Code blocks | Code blocks with `<CodeGroup>` for multiple languages |
| Hints/Callouts | `<Info>`, `<Warning>`, `<Tip>`, `<Note>` |
| Tabs | `<Tabs>` component |
| Cards | `<Card>` and `<CardGroup>` |
| API Parameters | `<ParamField>` component |
| Expandable | `<Accordion>` and `<AccordionGroup>` |

#### Example Conversions

**GitBook Hint → Mintlify Callout**
```markdown
<!-- GitBook -->
{% hint style="info" %}
This is an info hint
{% endhint %}

<!-- Mintlify -->
<Info>
This is an info hint
</Info>
```

**GitBook Tabs → Mintlify Tabs**
```markdown
<!-- GitBook -->
{% tabs %}
{% tab title="Python" %}
python code here
{% endtab %}
{% endtabs %}

<!-- Mintlify -->
<CodeGroup>
```python Python
python code here
```
</CodeGroup>
```

### Step 6: Update API Reference

If you have an OpenAPI/Swagger specification:

1. Export your OpenAPI spec as `openapi.yaml` or `openapi.json`
2. Place it in the root directory
3. Update `mint.json`:
   ```json
   "openapi": "openapi.yaml"
   ```

### Step 7: Local Testing

Test your documentation locally:

```bash
cd mintlify-migration
mintlify dev
```

This starts a local server at `http://localhost:3000`

### Step 8: Fix Any Issues

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| Broken links | Update internal links to use relative paths without `.mdx` extension |
| Missing images | Add images to `/images` folder and update paths |
| Formatting errors | Check MDX syntax and component usage |
| Navigation not showing | Verify `navigation` in `mint.json` matches file paths |

---

## Customization

### Adding New Pages

1. Create a new `.mdx` file in the appropriate directory
2. Add frontmatter with title and description
3. Add the page path to `mint.json` navigation

### Adding Icons

Mintlify supports FontAwesome icons. Use them like:
- In frontmatter: `icon: 'rocket'`
- In text: Not directly supported, use Card/other components

### Custom Components

Mintlify provides many built-in components:
- `<Card>`, `<CardGroup>` - Feature cards
- `<Accordion>`, `<AccordionGroup>` - Collapsible content
- `<CodeGroup>` - Multi-language code examples
- `<Steps>` - Step-by-step instructions
- `<ParamField>` - API parameter documentation
- `<ResponseField>` - API response documentation

See: https://mintlify.com/docs/components

---

## Deployment

### Option 1: Mintlify Hosting (Recommended)

1. Create account at https://mintlify.com
2. Connect your GitHub repository
3. Mintlify auto-deploys on push

### Option 2: Custom Domain

1. Deploy to Mintlify
2. Add custom domain in Mintlify dashboard
3. Update DNS records as instructed

### Option 3: Self-Hosted

Export static files and host on your own infrastructure.

---

## Post-Migration Checklist

- [ ] All pages migrated from GitBook
- [ ] Logo and favicon added
- [ ] Brand colors updated
- [ ] All internal links working
- [ ] All images displaying correctly
- [ ] Code examples tested
- [ ] API reference accurate
- [ ] Release notes up to date
- [ ] Search functionality working
- [ ] Mobile responsive layout verified
- [ ] Analytics/tracking configured (if needed)
- [ ] Custom domain configured (if needed)
- [ ] Old GitBook redirects set up (if needed)

---

## Support

- **Mintlify Documentation**: https://mintlify.com/docs
- **Mintlify Discord**: https://mintlify.com/community
- **Fano Support**: hello@fano.ai

---

## Notes for Non-Technical Users

### What You Need to Do

1. **Content Review**: Go through each `.mdx` file and verify/update the content
2. **Brand Assets**: Provide logo files to add to the `/logo` folder
3. **API Details**: Verify all API endpoints, parameters, and examples are correct
4. **Screenshots**: If you have screenshots to add, place them in `/images`

### What a Developer Can Help With

1. Setting up the Mintlify account and deployment
2. Configuring custom domain
3. Adding the OpenAPI specification
4. Setting up CI/CD for automatic deployments
5. Adding analytics tracking

### Getting Help

If you encounter issues:
1. Check Mintlify's documentation
2. Use Mintlify's community Discord for quick help
3. Contact Mintlify support for hosting issues
