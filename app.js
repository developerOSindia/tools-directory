/**
 * DeveloperOS Central Directory Portal Application
 * Zero-dependency, client-side dynamic search and suite filter.
 */

// Embedded fallback data ensuring static hosting works standalone out-of-the-box
const DEFAULT_REGISTRY = {
  suites: [
    { id: "suite-web-craft", name: "Web Craft", category: "web" },
    { id: "suite-api-network", name: "API & Network", category: "api" },
    { id: "suite-crypto-security", name: "Crypto & Security", category: "security" },
    { id: "suite-data-convert", name: "Data Convert", category: "data" },
    { id: "suite-cloud-devops", name: "Cloud & DevOps", category: "devops" },
    { id: "suite-code-refactor", name: "Code Refactor", category: "code" },
    { id: "suite-db-sql", name: "Database & SQL", category: "database" },
    { id: "suite-media-assets", name: "Media & Assets", category: "media" },
    { id: "suite-doc-specs", name: "Docs & Specs", category: "documentation" },
    { id: "suite-perf-testing", name: "Performance", category: "performance" }
  ],
  tools: [
    {
      id: "web-meta-tag-generator",
      name: "OpenGraph & Meta Tag Generator",
      description: "Generate and preview valid HTML meta tags, OpenGraph cards, and Twitter Cards.",
      suite_id: "suite-web-craft",
      category: "web",
      tags: ["seo", "opengraph", "html", "meta"],
      status: "active",
      url: "https://web.toolkit.developeros.in"
    },
    {
      id: "api-curl-to-python",
      name: "cURL Command to Code Converter",
      description: "Parse raw cURL commands into clean Python (requests/httpx) and JavaScript (fetch) code.",
      suite_id: "suite-api-network",
      category: "api",
      tags: ["curl", "python", "javascript", "http"],
      status: "active",
      url: "https://api.toolkit.developeros.in"
    },
    {
      id: "crypto-hash-generator",
      name: "Multi-Algorithm Hash Generator",
      description: "Compute SHA-256, SHA-512, MD5, and Blake2 hashes from text strings or files.",
      suite_id: "suite-crypto-security",
      category: "security",
      tags: ["hash", "sha256", "checksum", "cryptography"],
      status: "active",
      url: "https://crypto.toolkit.developeros.in"
    },
    {
      id: "data-json-yaml-converter",
      name: "JSON <-> YAML <-> TOML Converter",
      description: "Convert, format, and validate structured data between JSON, YAML, and TOML schemas.",
      suite_id: "suite-data-convert",
      category: "data",
      tags: ["json", "yaml", "toml", "converter"],
      status: "active",
      url: "https://data.toolkit.developeros.in"
    },
    {
      id: "cloud-cron-parser",
      name: "Cron Expression Explainer & Schedule Calculator",
      description: "Translate complex crontab schedules into human language and forecast upcoming execution timestamps.",
      suite_id: "suite-cloud-devops",
      category: "devops",
      tags: ["cron", "schedule", "devops", "cloud"],
      status: "active",
      url: "https://devops.toolkit.developeros.in"
    },
    {
      id: "code-regex-tester",
      name: "Regular Expression Tester & Match Explainer",
      description: "Test regex patterns with visual match group highlighting and ReDoS protection.",
      suite_id: "suite-code-refactor",
      category: "code",
      tags: ["regex", "pattern", "python", "matcher"],
      status: "active",
      url: "https://code.toolkit.developeros.in"
    },
    {
      id: "db-sql-formatter",
      name: "SQL Query Formatter & Minifier",
      description: "Format and beautify complex SQL queries across PostgreSQL, MySQL, SQLite, and Snowflake dialects.",
      suite_id: "suite-db-sql",
      category: "database",
      tags: ["sql", "database", "postgres", "format"],
      status: "active",
      url: "https://sql.toolkit.developeros.in"
    },
    {
      id: "media-base64-converter",
      name: "Base64 Image & Data URI Encoder/Decoder",
      description: "Convert PNG, JPEG, SVG, WebP images to ready-to-use CSS data URIs and vice versa.",
      suite_id: "suite-media-assets",
      category: "media",
      tags: ["base64", "image", "datauri", "media"],
      status: "active",
      url: "https://media.toolkit.developeros.in"
    },
    {
      id: "doc-markdown-editor",
      name: "Markdown Editor & Realtime GitHub Previewer",
      description: "Full-featured Markdown and GFM live previewer with table generator and math formula support.",
      suite_id: "suite-doc-specs",
      category: "documentation",
      tags: ["markdown", "docs", "gfm", "preview"],
      status: "active",
      url: "https://docs.toolkit.developeros.in"
    },
    {
      id: "perf-payload-estimator",
      name: "API Payload Size & Compression Estimator",
      description: "Analyze raw payload sizes and estimate Gzip, Brotli, and Zstandard compressed transfer sizes.",
      suite_id: "suite-perf-testing",
      category: "performance",
      tags: ["gzip", "brotli", "compression", "performance"],
      status: "active",
      url: "https://perf.toolkit.developeros.in"
    }
  ]
};

let currentRegistry = DEFAULT_REGISTRY;
let activeSuiteFilter = "all";
let currentSearchQuery = "";

async function init() {
  try {
    const res = await fetch("tools_registry.json");
    if (res.ok) {
      currentRegistry = await res.json();
    }
  } catch (e) {
    // Gracefully fallback to embedded data
    console.info("Using embedded registry data.");
  }

  renderFilters();
  setupSearch();
  renderTools();
}

function renderFilters() {
  const container = document.getElementById("suite-filters");
  if (!container) return;

  const buttonsHtml = [
    `<button class="filter-btn active" data-suite="all">All Suites</button>`
  ];

  currentRegistry.suites.forEach(suite => {
    buttonsHtml.push(
      `<button class="filter-btn" data-suite="${suite.id}">${suite.name}</button>`
    );
  });

  container.innerHTML = buttonsHtml.join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSuiteFilter = btn.getAttribute("data-suite") || "all";
      renderTools();
    });
  });
}

function setupSearch() {
  const input = document.getElementById("tool-search");
  if (!input) return;

  input.addEventListener("input", (e) => {
    currentSearchQuery = (e.target.value || "").trim().toLowerCase();
    renderTools();
  });
}

let toastTimer = null;
window.triggerToast = function (message) {
  let toast = document.getElementById("quick-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "quick-toast";
    toast.className = "quick-toast";
    toast.innerHTML = `<span class="quick-toast-icon">✓</span><span id="quick-toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  const msgEl = document.getElementById("quick-toast-msg");
  if (msgEl) msgEl.textContent = message;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
};

window.copyToolLink = function (url, name, event) {
  if (event) event.stopPropagation();
  navigator.clipboard.writeText(url).then(() => {
    window.triggerToast(`Copied ${name} link! 📋`);
  }).catch(() => {
    window.triggerToast(`Link: ${url}`);
  });
};

window.copyCliCommand = function (id, event) {
  if (event) event.stopPropagation();
  const cmd = `devos ${id}`;
  navigator.clipboard.writeText(cmd).then(() => {
    window.triggerToast(`Copied CLI: ${cmd} 🚀`);
  }).catch(() => {
    window.triggerToast(`CLI: ${cmd}`);
  });
};

function renderTools() {
  const container = document.getElementById("tools-container");
  const countBadge = document.getElementById("tool-count");
  if (!container) return;

  const filtered = currentRegistry.tools.filter(tool => {
    const matchesSuite = (activeSuiteFilter === "all" || tool.suite_id === activeSuiteFilter);
    const matchesSearch = !currentSearchQuery || (
      tool.name.toLowerCase().includes(currentSearchQuery) ||
      tool.description.toLowerCase().includes(currentSearchQuery) ||
      (tool.tags && tool.tags.some(t => t.toLowerCase().includes(currentSearchQuery)))
    );
    return matchesSuite && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} utility${filtered.length === 1 ? '' : 'ies'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #94a3b8;">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No tools found matching your search.</p>
        <p style="font-size: 0.9rem;">Try searching for another keyword or select "All Suites".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tool => {
    const statusClass = tool.status === "active" ? "status-active" : "status-planned";
    const statusLabel = tool.status === "active" ? "Active" : "In Roadmap";
    const targetUrl = tool.url || "#";
    const safeName = tool.name.replace(/'/g, "\\'");

    return `
      <div class="tool-card">
        <div class="card-top">
          <span class="card-category">${tool.category || 'tool'}</span>
          <span class="status-badge ${statusClass}">${statusLabel}</span>
        </div>
        <h3 class="card-title">${tool.name}</h3>
        <p class="card-desc">${tool.description}</p>
        <div class="card-footer">
          ${(tool.tags || []).map(tag => `<span class="tool-tag">#${tag}</span>`).join("")}
        </div>
        <div class="card-actions">
          <a href="${targetUrl}" target="_blank" rel="noopener" class="btn-launch">⚡ Launch Tool ↗</a>
          <button type="button" class="btn-quick-copy" onclick="copyToolLink('${targetUrl}', '${safeName}', event)" title="Copy Direct Link">
            📋 Copy Link
          </button>
          <button type="button" class="btn-cli-copy" onclick="copyCliCommand('${tool.id}', event)" title="Copy CLI Command">
            &gt;_ CLI
          </button>
        </div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", init);
