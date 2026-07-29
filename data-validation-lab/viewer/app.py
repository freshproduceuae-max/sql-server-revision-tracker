import os
import csv
import re
from pathlib import Path
from flask import Flask, render_template, abort
import markdown as md

app = Flask(__name__)

BASE = Path(__file__).parent.parent
METHODS_DIR = BASE / "methods"
SCHEMAS_DIR = BASE / "schemas"

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


def get_nav():
    nav = []
    for folder in sorted(METHODS_DIR.iterdir()):
        if not folder.is_dir():
            continue
        label = CATEGORY_LABELS.get(folder.name, folder.name)
        examples = []
        for f in sorted(folder.glob("*.md")):
            title = extract_h1(f)
            examples.append({"slug": f.stem, "cat": folder.name, "title": title})
        nav.append({"folder": folder.name, "label": label, "examples": examples})
    return nav


def extract_h1(path: Path) -> str:
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem


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
            path = METHODS_DIR / ex["cat"] / (ex["slug"] + ".md")
            text = path.read_text(encoding="utf-8")
            severity, color = extract_severity(text)
            all_methods.append({**ex, "severity": severity, "color": color,
                                 "cat_label": cat["label"]})
    return render_template("index.html", nav=nav, methods=all_methods)


@app.route("/method/<cat>/<slug>")
def method(cat, slug):
    path = METHODS_DIR / cat / (slug + ".md")
    if not path.exists():
        abort(404)
    text = path.read_text(encoding="utf-8")
    severity, color = extract_severity(text)
    html = render_md(text)
    nav = get_nav()
    # find prev/next
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
    path = SCHEMAS_DIR / name
    if not path.exists():
        abort(404)
    if path.suffix == ".csv":
        with open(path, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames or []
            rows = list(reader)
        ref_path = SCHEMAS_DIR / "SCHEMA_REFERENCE.md"
        ref_html = ""
        if ref_path.exists():
            ref_html = render_md(ref_path.read_text(encoding="utf-8"))
        nav = get_nav()
        return render_template("schema.html", name=name, headers=headers,
                               rows=rows, ref_html=ref_html, nav=nav)
    elif path.suffix == ".md":
        html = render_md(path.read_text(encoding="utf-8"))
        nav = get_nav()
        return render_template("method.html", html=html, nav=nav,
                               severity="", color="", prev_link=None,
                               next_link=None, cat_label="Schema Reference")
    abort(404)


@app.route("/schemas")
def schemas():
    files = sorted(SCHEMAS_DIR.glob("*.csv"))
    nav = get_nav()
    return render_template("schemas_list.html", files=files, nav=nav)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
