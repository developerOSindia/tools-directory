"""
Automated validation for Central Tools Directory portal assets.
"""

import unittest
from pathlib import Path

DIR_ROOT = Path(__file__).resolve().parent.parent


class TestDirectoryPortal(unittest.TestCase):
    def test_essential_files_exist(self):
        self.assertTrue((DIR_ROOT / "index.html").exists(), "index.html missing")
        self.assertTrue((DIR_ROOT / "styles.css").exists(), "styles.css missing")
        self.assertTrue((DIR_ROOT / "app.js").exists(), "app.js missing")
        self.assertTrue((DIR_ROOT / "package.json").exists(), "package.json missing")

    def test_html_contains_critical_anchors(self):
        content = (DIR_ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("DeveloperOS", content)
        self.assertIn("https://developeros.in", content)
        self.assertIn("tool-search", content)
        self.assertIn("tools-container", content)

    def test_app_js_syntax(self):
        js_content = (DIR_ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn("DEFAULT_REGISTRY", js_content)
        self.assertIn("renderTools", js_content)


if __name__ == "__main__":
    unittest.main()
