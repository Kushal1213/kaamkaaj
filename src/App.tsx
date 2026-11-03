import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookmarkSimple,
  Briefcase,
  Buildings,
  CaretDown,
  Check,
  CheckCircle,
  ClockCounterClockwise,
  FunnelSimple,
  List,
  MagnifyingGlass,
  MapPin,
  ShieldCheck,
  Sparkle,
  UserCircle,
  UsersThree,
  X,
} from '@phosphor-icons/react';
import { Brand } from './components/Brand';
import { JobCard } from './components/JobCard';
import { JobDetail } from './components/JobDetail';
import { jobs, popularSearches } from './data/jobs';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Application, Job, Page } from './types';

const pageLabels: Record<Page, string> = {
  home: 'Home',
  jobs: 'Find jobs',
  saved: 'Saved',
  tracker: 'My applications',
  employers: 'For employers',
};

function App() {
  const [page, setPage] = useState<Page>('home');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('All work types');
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [toast, setToast] = useState('');
  const [savedIds, setSavedIds] = useLocalStorage<string[]>('kaamkaaj:saved', []);
  const [applications, setApplications] = useLocalStorage<Application[]>('kaamkaaj:applications', []);

  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();
    const place = location.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch = !search || [job.title, job.company, ...job.skills].join(' ').toLowerCase().includes(search);
      const matchesPlace = !place || `${job.location} ${job.locality}`.toLowerCase().includes(place);
      const matchesType = jobType === 'All work types' || job.type === jobType || job.mode === jobType;
      return matchesSearch && matchesPlace && matchesType;
    });
  }, [query, location, jobType]);

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const navigate = (next: Page) => {
    setPage(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runSearch = () => {
    setPage('jobs');
    setSelectedJob(filteredJobs[0] ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaved = (id: string) => {
    const isSaved = savedIds.includes(id);
    setSavedIds(isSaved ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id]);
    flash(isSaved ? 'Removed from saved jobs' : 'Job saved');
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!applyJob) return;
    const alreadyApplied = applications.some((application) => application.jobId === applyJob.id);
    if (!alreadyApplied) {
      setApplications([...applications, { jobId: applyJob.id, appliedAt: new Date().toISOString(), status: 'Applied' }]);
    }
    setApplyJob(null);
    flash('Application added to your tracker');
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand-button" onClick={() => navigate('home')}><Brand /></button>
          <nav className="desktop-nav" aria-label="Main navigation">
            {(['jobs', 'saved', 'tracker', 'employers'] as Page[]).map((item) => (
              <button key={item} className={page === item ? 'active' : ''} onClick={() => navigate(item)}>
                {pageLabels[item]}{item === 'saved' && savedIds.length > 0 && <span className="count">{savedIds.length}</span>}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-button">EN <CaretDown size={14} /></button>
            <button className="login-button"><UserCircle size={21} /> Sign in</button>
            <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-expanded={mobileMenu} aria-label="Open navigation">
              {mobileMenu ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {(['jobs', 'saved', 'tracker', 'employers'] as Page[]).map((item) => <button key={item} onClick={() => navigate(item)}>{pageLabels[item]}</button>)}
          </nav>
        )}
      </header>

      <main id="main-content">
        {page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="hero-kicker"><Sparkle size={17} weight="fill" /> Work that fits real life</span>
                  <h1>Find work.<br /><span>Build your way.</span></h1>
                  <p>Clear pay, nearby openings and simple applications. No long forms before you see the job.</p>
                  <div className="hero-proof">
                    <span><ShieldCheck size={20} weight="duotone" /> Verified employer details</span>
                    <span><CheckCircle size={20} weight="duotone" /> Free for job seekers</span>
                  </div>
                </div>
                <div className="search-panel">
                  <div className="search-panel-head">
                    <span>Start your search</span>
                    <small>Demo listings</small>
                  </div>
                  <label>What work are you looking for?</label>
                  <div className="input-wrap"><MagnifyingGlass size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Job title or skill" /></div>
                  <label>Where?</label>
                  <div className="input-wrap"><MapPin size={20} /><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or locality" /></div>
                  <button className="button primary search-cta" onClick={runSearch}>Find jobs <ArrowRight size={19} /></button>
                  <div className="popular-searches">
                    <span>Popular:</span>
                    {popularSearches.slice(0, 3).map((term) => <button key={term} onClick={() => { setQuery(term); setPage('jobs'); }}>{term}</button>)}
                  </div>
                </div>
              </div>
            </section>

            <section className="home-jobs section-wrap">
              <div className="section-heading">
                <div><span className="section-kicker">Fresh opportunities</span><h2>Jobs worth a closer look</h2></div>
                <button className="text-link" onClick={() => navigate('jobs')}>See all jobs <ArrowRight size={18} /></button>
              </div>
              <div className="home-job-layout">
                <div className="job-list compact-list">
                  {jobs.slice(0, 3).map((job) => (
                    <JobCard key={job.id} job={job} saved={savedIds.includes(job.id)} selected={selectedJob?.id === job.id} onSave={toggleSaved} onOpen={setSelectedJob} />
                  ))}
                </div>
                {selectedJob && <JobDetail job={selectedJob} saved={savedIds.includes(selectedJob.id)} applied={applications.some((item) => item.jobId === selectedJob.id)} onSave={toggleSaved} onApply={setApplyJob} />}
              </div>
            </section>

            <section className="how-it-works section-wrap">
              <div className="how-copy"><span className="section-kicker">Built to stay simple</span><h2>From search to shortlist in a few clear steps.</h2><p>KaamKaaj keeps the important details visible, so candidates can decide faster and employers receive better-matched applications.</p></div>
              <ol className="steps">
                <li><span>1</span><div><h3>See the full picture</h3><p>Pay, shift, place and requirements are shown together.</p></div></li>
                <li><span>2</span><div><h3>Save what fits</h3><p>Your shortlist stays on this device for quick access.</p></div></li>
                <li><span>3</span><div><h3>Track every application</h3><p>Know what you applied to and what comes next.</p></div></li>
              </ol>
            </section>

            <section className="employer-band section-wrap">
              <div className="employer-visual" aria-hidden="true"><Buildings size={60} weight="duotone" /><span className="mini-person one"></span><span className="mini-person two"></span><span className="mini-person three"></span></div>
              <div><span className="section-kicker">Hiring a team?</span><h2>Post clear jobs. Meet ready candidates.</h2><p>Start with a focused listing and manage applicants without enterprise software.</p></div>
              <button className="button light" onClick={() => navigate('employers')}>Explore employer tools <ArrowRight size={19} /></button>
            </section>
          </>
        )}

        {page === 'jobs' && (
          <section className="jobs-page section-wrap page-section">
            <div className="page-title"><span className="section-kicker">Demo job board</span><h1>Find your next kaam</h1><p>Search by what you can do, where you want to work and the schedule that suits you.</p></div>
            <div className="jobs-toolbar">
              <div className="input-wrap"><MagnifyingGlass size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs or skills" /></div>
              <div className="input-wrap"><MapPin size={20} /><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or locality" /></div>
              <label className="select-wrap"><FunnelSimple size={20} /><select value={jobType} onChange={(event) => setJobType(event.target.value)}><option>All work types</option><option>Full time</option><option>Part time</option><option>Contract</option><option>Remote</option><option>Hybrid</option></select><CaretDown size={16} /></label>
            </div>
            <div className="results-summary"><strong>{filteredJobs.length} jobs</strong><span>Sample data for the initial product</span></div>
            {filteredJobs.length ? (
              <div className="jobs-layout">
                <div className="job-list">{filteredJobs.map((job) => <JobCard key={job.id} job={job} saved={savedIds.includes(job.id)} selected={selectedJob?.id === job.id} onSave={toggleSaved} onOpen={setSelectedJob} />)}</div>
                {selectedJob && filteredJobs.some((job) => job.id === selectedJob.id) && <JobDetail job={selectedJob} saved={savedIds.includes(selectedJob.id)} applied={applications.some((item) => item.jobId === selectedJob.id)} onSave={toggleSaved} onApply={setApplyJob} />}
              </div>
            ) : <EmptyState icon={<MagnifyingGlass size={44} />} title="No jobs match those filters" text="Try a broader role, another city or all work types." action="Clear filters" onAction={() => { setQuery(''); setLocation(''); setJobType('All work types'); }} />}
          </section>
        )}

        {page === 'saved' && (
          <section className="section-wrap page-section narrow-page">
            <div className="page-title"><span className="section-kicker">Your shortlist</span><h1>Saved jobs</h1><p>Keep the roles you want to compare in one place.</p></div>
            {savedIds.length ? <div className="job-list">{jobs.filter((job) => savedIds.includes(job.id)).map((job) => <JobCard key={job.id} job={job} saved onSave={toggleSaved} onOpen={(item) => { setSelectedJob(item); navigate('jobs'); }} />)}</div> : <EmptyState icon={<BookmarkSimple size={44} />} title="Your shortlist is empty" text="Save a job when it looks promising. It will appear here." action="Browse jobs" onAction={() => navigate('jobs')} />}
          </section>
        )}

        {page === 'tracker' && (
          <section className="section-wrap page-section narrow-page">
            <div className="page-title"><span className="section-kicker">Stay organised</span><h1>Application tracker</h1><p>A simple record of every role you apply to through KaamKaaj.</p></div>
            {applications.length ? <div className="application-list">{applications.map((application) => { const job = jobs.find((item) => item.id === application.jobId); if (!job) return null; return <article key={application.jobId} className="application-row"><span className="company-avatar" style={{ background: job.color }}>{job.initials}</span><div><h2>{job.title}</h2><p>{job.company} · {job.location}</p></div><span className="application-date">Applied {new Date(application.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span><span className="status"><Check size={15} weight="bold" /> {application.status}</span></article>; })}</div> : <EmptyState icon={<ClockCounterClockwise size={44} />} title="No applications yet" text="When you apply to a job, its progress will show here." action="Find jobs" onAction={() => navigate('jobs')} />}
          </section>
        )}

        {page === 'employers' && (
          <section className="employer-page">
            <div className="employer-hero section-wrap"><div><span className="hero-kicker"><UsersThree size={18} weight="fill" /> For growing teams</span><h1>Hire for the work, not the paperwork.</h1><p>Publish a clear role, review candidates and move the right people forward. The initial employer flow is intentionally lean for free-tier operation.</p><button className="button primary" onClick={() => document.getElementById('employer-interest')?.scrollIntoView({ behavior: 'smooth' })}>Post your first job <ArrowRight size={19} /></button></div><div className="employer-board"><div className="board-head"><Brand compact /><span>Candidate matches</span></div>{['Priya Sharma', 'Aman Verma', 'Riya Khan'].map((name, index) => <div className="candidate-row" key={name}><span className={`candidate-avatar shade-${index}`}>{name.split(' ').map((part) => part[0]).join('')}</span><div><strong>{name}</strong><span>{['Customer support · 2 yrs', 'Field sales · 3 yrs', 'Accounts · 1 yr'][index]}</span></div><span className="match">{[92, 87, 81][index]}% match</span></div>)}</div></div>
            <div className="employer-features section-wrap"><div><Briefcase size={28} weight="duotone" /><h2>Clear job posts</h2><p>Use structured fields for pay, location, schedule and essentials.</p></div><div><UsersThree size={28} weight="duotone" /><h2>Useful shortlists</h2><p>Review candidates around fit instead of scanning unstructured messages.</p></div><div><ShieldCheck size={28} weight="duotone" /><h2>Safer hiring</h2><p>Keep employer verification and candidate reporting in the product plan.</p></div></div>
            <form id="employer-interest" className="employer-form section-wrap" onSubmit={(event) => { event.preventDefault(); flash('Interest recorded for this prototype'); (event.currentTarget as HTMLFormElement).reset(); }}><div><span className="section-kicker">Early employer access</span><h2>Tell us what you are hiring for.</h2><p>This prototype stores no employer data. Submission only demonstrates the intended flow.</p></div><div className="form-fields"><label>Work email<input required type="email" placeholder="you@company.com" /></label><label>Role to hire<input required placeholder="e.g. Store supervisor" /></label><button className="button primary" type="submit">Request access <ArrowRight size={18} /></button></div></form>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap"><div><Brand /><p>Practical jobs for real working lives.</p></div><div className="footer-links"><button onClick={() => navigate('jobs')}>Find jobs</button><button onClick={() => navigate('employers')}>For employers</button><button>Privacy</button><button>Terms</button></div></div>
        <div className="footer-bottom section-wrap"><span>© 2026 KaamKaaj</span><span>Initial product prototype · Sample listings only</span></div>
      </footer>

      {applyJob && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setApplyJob(null); }}>
          <div className="apply-modal" role="dialog" aria-modal="true" aria-labelledby="apply-title">
            <button className="detail-close" onClick={() => setApplyJob(null)} aria-label="Close application"><X size={20} /></button>
            <span className="section-kicker">Quick apply</span><h2 id="apply-title">Apply for {applyJob.title}</h2><p>{applyJob.company} · {applyJob.location}</p>
            <form onSubmit={submitApplication}><label>Full name<input required autoFocus placeholder="Your name" /></label><label>Mobile number<input required inputMode="tel" pattern="[0-9]{10}" placeholder="10-digit number" /></label><label>Current city<input required placeholder="Your city" /></label><button className="button primary" type="submit">Add to my applications <ArrowRight size={18} /></button><small>This prototype stores only the application status on your device.</small></form>
          </div>
        </div>
      )}

      {toast && <div className="toast" role="status"><CheckCircle size={20} weight="fill" /> {toast}</div>}
    </div>
  );
}

function EmptyState({ icon, title, text, action, onAction }: { icon: React.ReactNode; title: string; text: string; action: string; onAction: () => void }) {
  return <div className="empty-state"><span>{icon}</span><h2>{title}</h2><p>{text}</p><button className="button primary" onClick={onAction}>{action} <ArrowRight size={18} /></button></div>;
}

export default App;
