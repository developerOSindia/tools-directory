# DeveloperOS Central Tools Directory

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ecosystem: DeveloperOS](https://img.shields.io/badge/Ecosystem-DeveloperOS-6366f1.svg)](https://developeros.in)
[![Tools Directory](https://img.shields.io/badge/Tools%20Directory-Online-10b981.svg)](https://tools.developeros.in)
[![Privacy: Client--Side](https://img.shields.io/badge/Privacy-Zero--Storage-10b981.svg)](https://developeros.in/privacy)
[![CI](https://github.com/developerOSindia/tools-directory/actions/workflows/ci.yml/badge.svg)](https://github.com/developerOSindia/tools-directory/actions)

The official centralized search directory and web portal for all DeveloperOS open-source developer tools.

---

## 🖥️ Interface Preview

```
┌─────────────────────────────────────────────────────────────┐
│ 🛠️ DeveloperOS — Open-Source Developer Tools Ecosystem    │
│ Search 100+ offline utilities... [ 🔍 Filter by category ] │
├─────────────────────────────────────────────────────────────┤
│ [Web Craft]      [API Sentinel]     [DevUtils Suite]        │
│ [Data Forge]     [Diagram Studio]   [Crypto & Security]     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌟 Application Overview & Features

- **Client-Side & Offline-First**: All data is processed in-memory. Zero server logging or third-party telemetry.
- **Decoupled Business Logic**: Pure algorithm implementations isolated from the user interface.
- **DeveloperOS Design System**: Official styling, dark theme, and accessible contrast compliance.
- **Single-Click Exports**: Copy outputs directly to clipboard or download formatted artifacts.

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
- Python 3.12+ (or modern browser/node runtime for web frontends)
- Standard development tools (`git`, `pip`)

### 2. Quickstart
```bash
# Clone the repository
git clone https://github.com/developerOSindia/tools-directory.git
cd tools-directory

# Install dependencies (if applicable)
pip install -r requirements.txt

# Run the local application
python3 -m http.server 8080
```

---

## 🧪 Automated Testing

Run the automated test suite locally:
```bash
python3 -m unittest discover -s tests
```
Continuous integration runs on every push and pull request via GitHub Actions.

---

## 🚢 Deployment Guidelines

This project is configured for standalone deployment to:
**Cloudflare Pages (`https://tools.developeros.in`)**

For containerized environments, standard Dockerfiles and Compose configurations are supported.

---

## 🔒 Security & Privacy

This application processes all user input **strictly in-memory** with zero persistence:
- Read our full [Security Policy](SECURITY.md)
- For vulnerability reports, contact: **`security@developeros.in`**

---

## 🤝 Contributing

Contributions are warmly welcomed! Please read our [Contributing Guidelines](CONTRIBUTING.md) and check out open issues.

---

## 🏷️ Recommended GitHub Topics

When configuring this repository on GitHub, apply these topics:
`tools-directory` `developer-utilities` `web-portal` `cloudflare-pages` `offline-first` `developeros`

---

## 📜 License & Ecosystem

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

- **Main Website**: [https://developeros.in](https://developeros.in)
- **Tools Portal**: [https://tools.developeros.in](https://tools.developeros.in)
- **GitHub Organization**: [https://github.com/developerOSindia](https://github.com/developerOSindia)
