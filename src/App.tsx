import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowRight, ArrowUpRight, BookOpen, Bookmark, BookmarkCheck, Check,
  CheckCircle2, ChevronRight, CircleDot, ClipboardList, Clock3,
  Code2, ExternalLink, FileText, Github, GraduationCap, Layers3,
  LayoutDashboard, LibraryBig, Map, Menu, Search, ShieldCheck,
  Sparkles, Target, X,
} from 'lucide-react';
import { glossary, lessonText, lessons, modules, publishedCount, stages, type Lesson } from './catalog';

type Page = 'dashboard' | 'roadmap' | 'lessons' | 'glossary' | 'development' | 'lesson';

type NavEntry = {
  label: string;
  icon: typeof LayoutDashboard;
  route: string;
};

const navigation: NavEntry[] = [
  { label: 'Overview', icon: LayoutDashboard, route: '/' },
  { label: 'Learning roadmap', icon: Map, route: '/roadmap' },
  { label: 'Course lessons', icon: BookOpen, route: '/lessons' },
  { label: 'Jargon library', icon: LibraryBig, route: '/glossary' },
  { label: 'Development stages', icon: Code2, route: '/development' },
];

const repo = 'https://github.com/earl2k22/prompt-to-agent-academy';

function getRoute(): string {
  return window.location.hash.slice(1) || '/';
}

function useSavedSet(key: string): [string[], (id: string) => void] {
  const [values, setValues] = useState<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(values));
    } catch {
      // Storage may be unavailable; in-memory state still works.
    }
  }, [key, values]);
  const toggle = (id: string) => setValues((current) => current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]);
  return [values, toggle];
}

function linkTo(path: string): string {
  return '#' + path;
}

function Tag({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={'tag tag-' + tone}>{children}</span>;
}

function LessonRow({ lesson, done, saved, onSave }: {
  lesson: Lesson;
  done: boolean;
  saved: boolean;
  onSave: (id: string) => void;
}) {
  return (
    <div className="lesson-row">
      <a className="lesson-row-main" href={linkTo('/lesson/' + lesson.id)}>
        <span className={'lesson-index ' + (done ? 'lesson-index-done' : '')}>
          {done ? <Check size={17} /> : lesson.id}
        </span>
        <span className="lesson-copy">
          <strong>{lesson.title}</strong>
          <small>{lesson.target}</small>
        </span>
      </a>
      <div className="lesson-row-actions">
        <Tag tone={lesson.published ? 'mint' : 'neutral'}>{lesson.published ? 'Published' : 'Outline'}</Tag>
        <button className="icon-button bookmark-button" type="button" aria-pressed={saved} aria-label={saved ? 'Remove bookmark for ' + lesson.title : 'Bookmark ' + lesson.title} onClick={() => onSave(lesson.id)}>
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
        <a className="subtle-chevron" href={linkTo('/lesson/' + lesson.id)} aria-label={'Open ' + lesson.title}><ChevronRight size={19} /></a>
      </div>
    </div>
  );
}

function ModuleCard({ moduleNumber, complete }: { moduleNumber: number; complete: string[] }) {
  const module = modules.find((item) => item.number === moduleNumber);
  if (!module) return null;
  const completed = module.lessons.filter((lesson) => complete.includes(lesson.id)).length;
  const percent = Math.round(100 * completed / (module.lessons.length || 1));
  return (
    <a href={linkTo('/roadmap#module-' + module.number)} className="module-card">
      <div className="module-card-top">
        <span className="module-num">{String(module.number).padStart(2, '0')}</span>
        <Tag>{module.week}</Tag>
      </div>
      <h3>{module.title}</h3>
      <p>{module.objective}</p>
      <div className="module-card-footer">
        <span>{completed}/{module.lessons.length} lessons completed</span>
        <span>{percent}%</span>
      </div>
      <div className="track"><div style={{ width: percent + '%' }} /></div>
    </a>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [completed, toggleComplete] = useSavedSet('pta.completed.v1');
  const [bookmarks, toggleBookmark] = useSavedSet('pta.bookmarks.v1');
  const [search, setSearch] = useState('');
  const [termCategory, setTermCategory] = useState('All');
  const [lessonModule, setLessonModule] = useState('All');

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      setMobileMenu(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const selected = route.startsWith('/lesson/') ? route.split('/')[2] : '';
  const currentLesson = lessons.find((lesson) => lesson.id === selected);
  const page: Page = currentLesson || route.startsWith('/lesson/') ? 'lesson'
    : route.startsWith('/roadmap') ? 'roadmap'
    : route.startsWith('/lessons') ? 'lessons'
    : route.startsWith('/glossary') ? 'glossary'
    : route.startsWith('/development') ? 'development'
    : 'dashboard';

  const completeCount = lessons.filter((lesson) => completed.includes(lesson.id) && lesson.published).length;
  const progress = Math.round(completeCount / Math.max(lessons.length, 1) * 100);
  const filteredTerms = useMemo(() => glossary.filter((entry) =>
    (termCategory === 'All' || entry.category === termCategory) &&
    (entry.term + ' ' + entry.definition + ' ' + entry.example).toLowerCase().includes(search.toLowerCase())
  ), [search, termCategory]);
  const filteredLessons = useMemo(() => lessons.filter((lesson) =>
    (lessonModule === 'All' || String(lesson.module) === lessonModule) &&
    (lesson.title + ' ' + lesson.target + ' ' + lesson.id).toLowerCase().includes(search.toLowerCase())
  ), [search, lessonModule]);
  const categories = ['All', ...Array.from(new Set(glossary.map((entry) => entry.category)))];
  const nextPublished = lessons.find((lesson) => lesson.published && !completed.includes(lesson.id));
  const activeModule = currentLesson && modules.find((item) => item.number === currentLesson.module);

  const sectionTitle = {
    dashboard: 'Overview',
    roadmap: 'Learning roadmap',
    lessons: 'Course lessons',
    glossary: 'Jargon library',
    development: 'Development stages',
    lesson: currentLesson ? 'Lesson ' + currentLesson.id : 'Lesson',
  }[page];

  return (
    <div className="app js">
      <a className="skip-link" href="#academy-content" onClick={(event) => { event.preventDefault(); document.getElementById('academy-content')?.focus(); }}>Skip to content</a>
      {mobileMenu && <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}
      <aside className={'sidebar ' + (mobileMenu ? 'sidebar-open' : '')}>
        <button className="mobile-close icon-button" type="button" aria-label="Close navigation" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        <a className="brand" href="#/" onClick={() => setMobileMenu(false)}>
          <span className="brand-mark"><GraduationCap size={25} strokeWidth={2.2} /></span>
          <span><strong>Prompt to Agent</strong><small>Academy</small></span>
        </a>
        <p className="sidebar-label">Workspace</p>
        <nav id="academy-navigation" className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, route: path }) => (
            <a key={path} href={linkTo(path)} aria-current={(path === '/' ? route === '/' : route.startsWith(path)) ? 'page' : undefined} className={'nav-link ' + (page !== 'lesson' && (path === '/' ? route === '/' : route.startsWith(path)) ? 'active' : '')}>
              <Icon size={18} /><span>{label}</span>
              {path === '/lessons' && <small>{lessons.length}</small>}
            </a>
          ))}
        </nav>
        <p className="sidebar-label sidebar-label-second">Learning path</p>
        <div className="sidebar-modules">
          {modules.map((module) => (
            <a key={module.number} href={linkTo('/roadmap#module-' + module.number)}>
              <span>{String(module.number).padStart(2, '0')}</span><small>{module.title}</small>
            </a>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-callout">
            <Sparkles size={17} />
            <strong>Learn by building</strong>
            <p>Turn prompts into reliable engineering workflows, one lesson at a time.</p>
          </div>
          <a className="github-link" href={repo} target="_blank" rel="noopener noreferrer"><Github size={18} /> View GitHub repository <ExternalLink size={14} /></a>
        </div>
      </aside>

      <main className="main" id="academy-content" tabIndex={-1}>
        <header className="topbar">
          <div className="topbar-start">
            <button className="mobile-trigger icon-button" type="button" aria-label="Open navigation" aria-expanded={mobileMenu} aria-controls="academy-navigation" onClick={() => setMobileMenu(true)}><Menu size={22} /></button>
            <div className="crumbs"><span>Academy</span><ChevronRight size={15} /><strong>{sectionTitle}</strong></div>
          </div>
          <div className="topbar-end"><span className="release-chip">Alpha v0.1</span><a className="topbar-github" href={repo} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository"><Github size={19}/></a></div>
        </header>

        <div className="main-content">
          {page === 'dashboard' && <>
            <section className="hero">
              <div className="hero-main">
                <h1>From better prompts<br />to better agents.</h1>
                <p>Learn prompting, context engineering and AI workflows. Practice, then verify.</p>
                <div className="hero-actions">
                  <a className="button button-primary" href={linkTo('/lesson/1.1')}>Start learning <ArrowRight size={17} /></a>
                  <a className="button button-outline" href={linkTo('/roadmap')}>Explore roadmap <Map size={17} /></a>
                </div>
              </div>

                <section className="content-panel focus-panel">
                  <h2>{nextPublished ? 'Continue learning' : 'All published lessons complete'}</h2>
                  {nextPublished ? <>
                    <h3>{nextPublished.title}</h3>
                    <span className="focus-number">Lesson {nextPublished.id}</span>
                    <p>{nextPublished.target}</p>
                    <a href={linkTo('/lesson/' + nextPublished.id)} className="button button-primary button-block">Open lesson <ArrowRight size={16}/></a>
                  </> : <p>New lessons are published incrementally. Browse the roadmap to preview what comes next.</p>}
                </section>

            </section>
            <section className="stats-grid" aria-label="Academy statistics">
              <div className="stat-card"><strong>{modules.length}</strong><small>Learning modules</small></div>
              <div className="stat-card"><strong>{lessons.length}</strong><small>Planned lessons</small></div>
              <div className="stat-card"><strong>{glossary.length}</strong><small>Engineering terms</small></div>
              <div className="stat-card"><strong>{progress}%</strong><small>Course completed</small></div>
            </section>
            <div className="dashboard-grid">
              <section className="content-panel">
                <div className="panel-heading"><div><h2>Your curriculum</h2></div><a className="text-link" href={linkTo('/roadmap')}>View all <ArrowUpRight size={16}/></a></div>
                <div className="module-grid">
                  {modules.slice(0,4).map((module) => <ModuleCard key={module.number} moduleNumber={module.number} complete={completed} />)}
                </div>
              </section>
              <div className="dashboard-aside">
                <section className="content-panel progress-panel">
                  <div className="panel-heading"><h2>Course progress</h2><Target size={19}/></div>
                  <div className="progress-overview"><strong>{completeCount}<span> / {lessons.length}</span></strong><span>{progress}% complete</span></div>
                  <div className="track track-large"><div style={{ width: progress + '%' }} /></div>
                  <p>Progress is saved in this browser, not synced across devices.</p>
                </section>
              </div>
            </div>
            <div className="bottom-banner"><div><h3>Built in public, improved one milestone at a time.</h3><p>Explore the feature roadmap, implementation stages and source code on GitHub.</p></div><a className="button button-outline" href={linkTo('/development')}>Development roadmap <ArrowRight size={16}/></a></div>
          </>}

          {page === 'roadmap' && <>
            <div className="page-intro"><h1>Your learning roadmap</h1><p>Eight focused weeks, forty lessons, and a practical checkpoint at every step. Preview all outlines and open published lessons.</p></div>
            <div className="roadmap-timeline">
              {modules.map((module) => (
                <section className="roadmap-module content-panel" key={module.number} id={'module-' + module.number}>
                  <div className="roadmap-module-heading"><span className="roadmap-bubble">{String(module.number).padStart(2, '0')}</span><div><h2>{module.title}</h2><span className="module-week">{module.week}, module {module.number}</span><p>{module.objective}</p></div><Tag>{module.lessons.length} lessons</Tag></div>
                  <div className="lesson-list">{module.lessons.map((lesson) => <LessonRow key={lesson.id} lesson={lesson} done={completed.includes(lesson.id)} saved={bookmarks.includes(lesson.id)} onSave={toggleBookmark}/>)}</div>
                </section>
              ))}
            </div>
          </>}

          {page === 'lessons' && <>
            <div className="page-intro"><h1>Explore the lessons</h1><p>Every lesson has a permanent ID. Only fully prepared lessons are labelled Published; the rest are transparent learning outlines.</p></div>
            <div className="content-panel library-panel">
              <div className="filter-row">
                <label className="search-box"><Search size={18}/><input aria-label="Search lessons" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by lesson, ID, or topic..." /></label>
                <select aria-label="Filter lessons by module" value={lessonModule} onChange={(e) => setLessonModule(e.target.value)}><option value="All">All modules</option>{modules.map((module) => <option key={module.number} value={module.number}>{'Module ' + module.number}</option>)}</select>
              </div>
              <div className="library-meta">{filteredLessons.length} results, {publishedCount} published lesson{publishedCount === 1 ? '' : 's'}</div>
              <div className="lesson-list">{filteredLessons.map((lesson) => <LessonRow key={lesson.id} lesson={lesson} done={completed.includes(lesson.id)} saved={bookmarks.includes(lesson.id)} onSave={toggleBookmark}/>)}</div>
              {!filteredLessons.length && <p className="empty-message">No lessons match this search. Try a shorter keyword or a different module.</p>}
            </div>
          </>}

          {page === 'glossary' && <>
            <div className="page-intro"><h1>The jargon library</h1><p>Technical vocabulary is useful when it expresses a real engineering requirement, not when it merely sounds impressive. Learn what each term means and how to apply it.</p></div>
            <section className="content-panel glossary-panel">
              <label className="search-box glossary-search"><Search size={18}/><input aria-label="Search glossary" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search definitions, terms, or examples..." /></label>
              <div className="category-tabs" role="group" aria-label="Glossary categories">{categories.map((category) => <button key={category} type="button" aria-pressed={termCategory === category} className={termCategory === category ? 'selected' : ''} onClick={() => setTermCategory(category)}>{category}</button>)}</div>
              <div className="glossary-count">{filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'} found</div>
              <div className="glossary-grid">{filteredTerms.map((term) => <article className="glossary-card" key={term.term}><div className="glossary-card-head"><h2>{term.term}</h2><Tag>{term.category}</Tag></div><p>{term.definition}</p><div className="glossary-example"><span>Use it like this</span><em>“{term.example}”</em></div></article>)}</div>
              {!filteredTerms.length && <p className="empty-message">Nothing matched. Try another term or select All.</p>}
            </section>
          </>}

          {page === 'development' && <>
            <div className="page-intro"><h1>Development roadmap</h1><p>Separate product development from the learning curriculum. Every stage has a deliverable, exit criterion and copyable plan in GitHub.</p></div>
            <div className="development-list">
              {stages.map((stage) => <article className="content-panel development-stage" key={stage.number}>
                <span className="stage-index">{String(stage.number).padStart(2, '0')}</span>
                <div className="stage-content"><div className="stage-heading"><h2>{stage.title}</h2><Tag tone={stage.status === 'Done' ? 'mint' : stage.status === 'In progress' ? 'blue' : 'neutral'}>{stage.status}</Tag></div><p>{stage.deliverables}</p><div className="stage-criterion"><CheckCircle2 size={17}/><span>{stage.criterion}</span></div></div>
              </article>)}
            </div>
            <div className="bottom-banner"><div><h3>Pick up any stage from another conversation.</h3><p>Session prompts and current status are versioned in the repository.</p></div><a className="button button-outline" href={repo + '/blob/main/docs/SESSION_PROMPTS.md'} target="_blank" rel="noopener noreferrer">Open session prompts <ExternalLink size={16}/></a></div>
          </>}

          {page === 'lesson' && <>
            {currentLesson ? <>
              <div className="lesson-detail-header">
                <a className="back-link" href={linkTo('/lessons')}>All lessons</a>
                <h1>{currentLesson.id}: {currentLesson.title}</h1>
                <div className="lesson-detail-meta"><Tag tone="blue">Module {currentLesson.module}</Tag><Tag tone={currentLesson.published ? 'mint' : 'neutral'}>{currentLesson.published ? 'Published' : 'Outline'}</Tag></div>
                <p>{currentLesson.target}</p>
                <div className="detail-actions">
                  <button className="button button-outline" type="button" onClick={() => toggleBookmark(currentLesson.id)}>{bookmarks.includes(currentLesson.id) ? <BookmarkCheck size={17}/> : <Bookmark size={17}/>} {bookmarks.includes(currentLesson.id) ? 'Bookmarked' : 'Bookmark lesson'}</button>
                  {currentLesson.published && <button className={'button ' + (completed.includes(currentLesson.id) ? 'button-muted' : 'button-primary')} type="button" onClick={() => toggleComplete(currentLesson.id)}>{completed.includes(currentLesson.id) ? <><CheckCircle2 size={17}/> Mark as incomplete</> : <><Check size={17}/> Mark complete</>}</button>}
                </div>
              </div>
              <div className="lesson-detail-layout">
                <article className="content-panel article-content">
                  {currentLesson.published && lessonText[currentLesson.id] ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonText[currentLesson.id]}</ReactMarkdown> : <>
                    <p className="outline-status">Lesson outline, full content pending</p>
                    <h2>What you will learn</h2><p>{currentLesson.target}</p>
                    <h2>Planned hands-on lab</h2><p>{currentLesson.lab}</p>
                    <div className="outline-notice"><Clock3 size={20}/><span>This is a syllabus outline, not a finished lesson. Request this lesson by its ID when you are ready to expand it into a full chapter.</span></div>
                  </>}
                </article>
                <aside className="lesson-detail-aside"><div className="content-panel lesson-aside-panel"><h3>Module {currentLesson.module}</h3><p>{activeModule?.title}</p><div className="track"><div style={{width: Math.round((activeModule?.lessons.filter((l) => completed.includes(l.id)).length ?? 0) / 5 * 100) + '%'}}/></div><a className="text-link" href={linkTo('/roadmap#module-' + currentLesson.module)}>View module <ArrowRight size={15}/></a></div><div className="content-panel lesson-aside-panel"><h3>Practical activity</h3><p>{currentLesson.lab}</p><small>Verify your work against the checkpoint before marking a published lesson complete.</small></div></aside>
              </div>
            </> : <div className="content-panel not-found"><FileText size={32}/><h1>Lesson not found</h1><p>Check the ID or return to the lesson library.</p><a className="button button-primary" href={linkTo('/lessons')}>Browse lessons <ArrowRight size={16}/></a></div>}
          </>}

          <footer className="site-footer"><span>Prompt to Agent Academy. Learn with purpose. Build with evidence.</span><span><a href={repo + '/blob/main/docs/STATUS.md'} target="_blank" rel="noopener noreferrer">Project status <ArrowUpRight size={13}/></a><a href={repo} target="_blank" rel="noopener noreferrer"><Github size={15}/> GitHub</a></span></footer>
        </div>
      </main>
    </div>
  );
}
