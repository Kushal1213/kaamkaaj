import { ArrowRight, BookmarkSimple, CheckCircle, MapPin, ShieldCheck, X } from '@phosphor-icons/react';
import type { Job } from '../types';

type Props = {
  job: Job;
  saved: boolean;
  applied: boolean;
  onSave: (id: string) => void;
  onApply: (job: Job) => void;
  onClose?: () => void;
};

export function JobDetail({ job, saved, applied, onSave, onApply, onClose }: Props) {
  return (
    <aside className="job-detail" aria-label={`${job.title} details`}>
      {onClose && <button className="detail-close" onClick={onClose} aria-label="Close job details"><X size={20} /></button>}
      <div className="detail-company">
        <span className="company-avatar large" style={{ background: job.color }} aria-hidden="true">{job.initials}</span>
        <span>{job.company}</span>
      </div>
      <h2>{job.title}</h2>
      <p className="detail-location"><MapPin size={18} /> {job.locality}, {job.location} · {job.mode}</p>
      <div className="detail-pay">
        <strong>₹{job.salaryMin.toLocaleString('en-IN')}–₹{job.salaryMax.toLocaleString('en-IN')}</strong>
        <span>per month</span>
      </div>
      <div className="detail-actions">
        <button className="button primary" onClick={() => onApply(job)} disabled={applied}>
          {applied ? <><CheckCircle size={20} weight="fill" /> Applied</> : <>Apply now <ArrowRight size={19} /></>}
        </button>
        <button className={`button secondary ${saved ? 'is-saved' : ''}`} onClick={() => onSave(job.id)}>
          <BookmarkSimple size={19} weight={saved ? 'fill' : 'regular'} /> {saved ? 'Saved' : 'Save'}
        </button>
      </div>
      <div className="trust-note"><ShieldCheck size={20} weight="duotone" /><span>Never pay money to apply. KaamKaaj listings show role details before you share your profile.</span></div>
      <section className="detail-section">
        <h3>About this job</h3>
        <p>{job.description}</p>
      </section>
      <section className="detail-section">
        <h3>What you will need</h3>
        <div className="skill-list">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </section>
      <dl className="job-facts">
        <div><dt>Experience</dt><dd>{job.experience}</dd></div>
        <div><dt>Work type</dt><dd>{job.type}</dd></div>
        <div><dt>Work mode</dt><dd>{job.mode}</dd></div>
      </dl>
    </aside>
  );
}
