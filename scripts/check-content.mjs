import fs from 'node:fs';

function read(file) {
  return fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
}

const curriculum = read('docs/CURRICULUM.md');
const glossary = read('docs/AGENTIC_GLOSSARY.md');
const plan = read('docs/DEVELOPMENT_PLAN.md');

const modules = [...curriculum.matchAll(/^## Module (\d+) — /gm)].map((item) => item[1]);
const lessons = [...curriculum.matchAll(/^### (\d+)\.(\d+) (.+)$/gm)].map((item) => item[1] + '.' + item[2]);
const published = curriculum.split(/(?=^### \d+\.\d+ )/m).slice(1).flatMap((section) => {
  const match = section.match(/^### (\d+)\.(\d+) /);
  return match && /- \*\*Publication status:\*\* Published/.test(section)
    ? [match[1] + '-' + match[2]]
    : [];
});
const terms = [...glossary.matchAll(/^## (.+)$/gm)].map((item) => item[1]);
const stages = [...plan.matchAll(/^### Stage (\d+) — /gm)].map((item) => item[1]);

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

ensure(modules.length === 8, 'Expected 8 curriculum modules');
ensure(lessons.length === 40, 'Expected 40 lesson outlines');
ensure(new Set(lessons).size === lessons.length, 'Duplicate lesson IDs');
ensure(terms.length >= 38, 'Missing foundational glossary entries');
ensure(new Set(terms).size === terms.length, 'Duplicate glossary terms');
ensure(stages.length === 9, 'Expected development stages 0–8');

for (const id of published) {
  const location = new URL('../content/lessons/' + id + '.md', import.meta.url);
  ensure(fs.existsSync(location), 'Published lesson missing file: ' + location.pathname);
}

console.log('Content check passed: ' + modules.length + ' modules, ' + lessons.length + ' lessons, ' + published.length + ' published, ' + terms.length + ' terms, ' + stages.length + ' stages.');
