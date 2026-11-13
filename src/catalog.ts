import curriculumSource from '../docs/CURRICULUM.md?raw';
import glossarySource from '../docs/AGENTIC_GLOSSARY.md?raw';
import roadmapSource from '../docs/DEVELOPMENT_PLAN.md?raw';

export type Lesson = {
  id: string;
  title: string;
  target: string;
  lab: string;
  published: boolean;
  module: number;
};

export type AcademyModule = {
  number: number;
  title: string;
  week: string;
  objective: string;
  lessons: Lesson[];
};

export type GlossaryEntry = {
  term: string;
  category: string;
  definition: string;
  example: string;
};

export type DevelopmentStage = {
  number: number;
  title: string;
  deliverables: string;
  criterion: string;
  status: string;
};

function field(text: string, label: string): string {
  const escaped = label.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&');
  return text.match(new RegExp('\\*\\*' + escaped + ':\\*\\*\\s*(.+)'))?.[1]?.trim() ?? '';
}

function parseModules(markdown: string): AcademyModule[] {
  return markdown.split(/(?=^## Module \d+ — )/m).flatMap((part) => {
    const match = part.match(/^## Module (\d+) — (.+?) \((Week \d+)\)/m);
    if (!match) return [];
    const number = Number(match[1]);
    const objective = field(part, 'Objective');
    const lessons = part.split(/(?=^### \d+\.\d+ )/m).slice(1).flatMap((segment) => {
      const title = segment.match(/^### (\d+\.\d+) (.+)$/m);
      if (!title) return [];
      return [{
        id: title[1],
        title: title[2],
        target: field(segment, 'Target'),
        lab: field(segment, 'Lab'),
        published: field(segment, 'Publication status') === 'Published',
        module: number,
      }];
    });
    return [{ number, title: match[2], week: match[3], objective, lessons }];
  });
}

function parseGlossary(markdown: string): GlossaryEntry[] {
  return markdown.split(/(?=^## [^\n]+$)/m).flatMap((part) => {
    const title = part.match(/^## (.+)$/m);
    if (!title) return [];
    return [{
      term: title[1],
      category: field(part, 'Domain'),
      definition: field(part, 'Meaning'),
      example: field(part, 'Use in a prompt').replace(/^"|"$/g, ''),
    }];
  });
}

function parseStages(markdown: string): DevelopmentStage[] {
  return markdown.split(/(?=^### Stage \d+ — )/m).flatMap((part) => {
    const heading = part.match(/^### Stage (\d+) — (.+)$/m);
    if (!heading) return [];
    return [{
      number: Number(heading[1]),
      title: heading[2],
      deliverables: field(part, 'Deliverables'),
      criterion: field(part, 'Exit criterion'),
      status: field(part, 'Status at kickoff'),
    }];
  });
}

const lessonFiles = import.meta.glob('../content/lessons/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const lessonText: Record<string, string> = Object.fromEntries(
  Object.entries(lessonFiles).flatMap(([path, content]) => {
    const match = path.match(/(\d+)-(\d+)\.md$/);
    return match ? [[match[1] + '.' + match[2], content]] : [];
  }),
);

export const modules = parseModules(curriculumSource);
export const lessons = modules.flatMap((module) => module.lessons).map((lesson) => ({
  ...lesson,
  published: lesson.published && !!lessonText[lesson.id],
}));
export const glossary = parseGlossary(glossarySource);
export const stages = parseStages(roadmapSource);
export const publishedCount = lessons.filter((lesson) => lesson.published).length;
