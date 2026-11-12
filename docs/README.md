# Santa App Documentation

This directory contains the documentation for the AKS Store Demo application, published as GitHub Pages.

## 📚 Documentation Structure

- **[index.md](index.md)** - Main landing page with overview and quick start
- **[architecture.md](architecture.md)** - Detailed architecture and design patterns
- **[deployment.md](deployment.md)** - Complete deployment guide for all platforms
- **[development.md](development.md)** - Local development setup and guidelines
- **[services.md](services.md)** - Individual service documentation
- **[troubleshooting.md](troubleshooting.md)** - Common issues and solutions
- **[azd.md](azd.md)** - Azure Developer CLI deployment guide

## 🌐 Published Documentation

The documentation is automatically published to GitHub Pages at:
**https://massimoc.github.io/aks-store-demo**

## 🛠️ Building Locally

To build and preview the documentation locally:

### Prerequisites
- Ruby 3.2+
- Bundler

### Setup

```bash
cd docs
bundle install
```

### Build and Serve

```bash
bundle exec jekyll serve
```

Then open http://localhost:4000/aks-store-demo in your browser.

### Build Only

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## 📝 Contributing to Documentation

When contributing to the documentation:

1. **Follow the existing structure**: Use the same YAML front matter format
2. **Use relative links**: Link to other docs using relative paths (e.g., `[Architecture](architecture.md)`)
3. **Add navigation order**: Set `nav_order` in the front matter for proper navigation
4. **Test locally**: Build and preview locally before submitting PR
5. **Check links**: Ensure all links work correctly

### Front Matter Template

```yaml
---
layout: default
title: Your Page Title
nav_order: X
---
```

## 🎨 Theme

This documentation uses the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) Jekyll theme.

Features:
- Clean, professional design
- Built-in search
- Mobile-responsive
- Code syntax highlighting
- Easy navigation

## 🔄 Automatic Deployment

Documentation is automatically deployed to GitHub Pages when:
- Changes are pushed to the `main` branch in the `docs/` directory
- The GitHub Actions workflow completes successfully

The workflow is defined in `.github/workflows/github-pages.yml`.

## 📋 License

This documentation is part of the AKS Store Demo project and is licensed under the MIT License.
