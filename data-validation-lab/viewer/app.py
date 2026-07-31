import io
import csv
import re
from pathlib import Path
from flask import Flask, render_template, abort
import markdown as md

# Try to load from embedded data.py (serverless deploy); fall back to filesystem
try:
    from data import METHODS, SCHEMAS
    _USE_DATA_PY = True
except ImportError:
    _USE_DATA_PY = False
    BASE = Path(__file__).parent.parent
    METHODS_DIR = BASE / "methods"
    SCHEMAS_DIR = BASE / "schemas"

app = Flask(__name__)

CATEGORY_LABELS = {
    "M01_Completeness": "M01 — Completeness",
    "M02_Uniqueness": "M02 — Uniqueness",
    "M03_Referential_Integrity": "M03 — Referential Integrity",
    "M04_Format_Pattern": "M04 — Format & Pattern",
    "M05_Range_Boundary": "M05 — Range & Boundary",
    "M06_Consistency": "M06 — Consistency",
    "M07_Business_Rules": "M07 — Business Rules",
    "M08_Reconciliation": "M08 — Reconciliation",
    "M09_Temporal": "M09 — Temporal",
    "M10_Statistical": "M10 — Statistical",
}

SEVERITY_COLORS = {
    "Critical": "#dc2626",
    "High": "#ea580c",
    "Medium": "#d97706",
    "Low": "#65a30d",
    "Info": "#2563eb",
}


def _method_text(cat: str, slug: str) -> str | None:
    key = f"{cat}/{slug}"
    if _USE_DATA_PY:
        return METHODS.get(key)
    path = METHODS_DIR / cat / (slug + ".md")
    return path.read_text(encoding="utf-8") if path.exists() else None


def _schema_text(name: str) -> str | None:
    if _USE_DATA_PY:
        return SCHEMAS.get(name)
    path = SCHEMAS_DIR / name
    return path.read_text(encoding="utf-8") if path.exists() else None


def _list_methods():
    if _USE_DATA_PY:
        # key format: "M01_Completeness/M01-E1_slug"
        items = {}
        for key in sorted(METHODS.keys()):
            cat, slug = key.split("/", 1)
            items.setdefault(cat, []).append(slug)
        return items
    result = {}
    for folder in sorted(METHODS_DIR.iterdir()):
        if folder.is_dir():
            result[folder.name] = [f.stem for f in sorted(folder.glob("*.md"))]
    return result


def _list_schemas():
    if _USE_DATA_PY:
        return [k for k in sorted(SCHEMAS.keys()) if k.endswith(".csv")]
    return [f.name for f in sorted(SCHEMAS_DIR.glob("*.csv"))]


def get_nav():
    nav = []
    for cat_folder, slugs in _list_methods().items():
        label = CATEGORY_LABELS.get(cat_folder, cat_folder)
        examples = []
        for slug in slugs:
            text = _method_text(cat_folder, slug) or ""
            title = next(
                (l[2:].strip() for l in text.splitlines() if l.startswith("# ")),
                slug
            )
            examples.append({"slug": slug, "cat": cat_folder, "title": title})
        nav.append({"folder": cat_folder, "label": label, "examples": examples})
    return nav


def extract_severity(text: str) -> tuple[str, str]:
    m = re.search(r"\*\*Severity:\*\*\s+\*\*(.+?)\*\*", text)
    if m:
        label = m.group(1)
        color = SEVERITY_COLORS.get(label.split()[0], "#6b7280")
        return label, color
    return "", "#6b7280"


def render_md(text: str) -> str:
    return md.markdown(
        text,
        extensions=["fenced_code", "tables", "codehilite", "toc"],
        extension_configs={"codehilite": {"css_class": "highlight", "guess_lang": False}},
    )


@app.route("/")
def index():
    nav = get_nav()
    all_methods = []
    for cat in nav:
        for ex in cat["examples"]:
            text = _method_text(ex["cat"], ex["slug"]) or ""
            severity, color = extract_severity(text)
            all_methods.append({**ex, "severity": severity, "color": color,
                                 "cat_label": cat["label"]})
    return render_template("index.html", nav=nav, methods=all_methods)


@app.route("/method/<cat>/<slug>")
def method(cat, slug):
    text = _method_text(cat, slug)
    if text is None:
        abort(404)
    severity, color = extract_severity(text)
    html = render_md(text)
    nav = get_nav()
    flat = [(e["cat"], e["slug"]) for c in nav for e in c["examples"]]
    idx = next((i for i, x in enumerate(flat) if x == (cat, slug)), None)
    prev_link = flat[idx - 1] if idx and idx > 0 else None
    next_link = flat[idx + 1] if idx is not None and idx < len(flat) - 1 else None
    return render_template("method.html", html=html, nav=nav,
                           severity=severity, color=color,
                           prev_link=prev_link, next_link=next_link,
                           cat_label=CATEGORY_LABELS.get(cat, cat))


@app.route("/schema/<name>")
def schema(name):
    text = _schema_text(name)
    if text is None:
        abort(404)
    if name.endswith(".csv"):
        reader = csv.DictReader(io.StringIO(text))
        headers = reader.fieldnames or []
        rows = list(reader)
        ref_text = _schema_text("SCHEMA_REFERENCE.md") or ""
        ref_html = render_md(ref_text) if ref_text else ""
        nav = get_nav()
        return render_template("schema.html", name=name, headers=headers,
                               rows=rows, ref_html=ref_html, nav=nav)
    elif name.endswith(".md"):
        html = render_md(text)
        nav = get_nav()
        return render_template("method.html", html=html, nav=nav,
                               severity="", color="", prev_link=None,
                               next_link=None, cat_label="Schema Reference")
    abort(404)


@app.route("/schemas")
def schemas():
    files = [type("F", (), {"name": n})() for n in _list_schemas()]
    nav = get_nav()
    return render_template("schemas_list.html", files=files, nav=nav)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
