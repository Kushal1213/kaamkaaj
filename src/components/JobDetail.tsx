import { ArrowRight, BookmarkSimple, CheckCircle, MapPin, ShieldCheck, X } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';
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
  const { t } = useLanguage();
  return (
    <aside className="job-detail" aria-label={`${t(job.title)} ${t('details')}`}>
      {onClose && <button className="detail-close" onClick={onClose} aria-label="Close job details"><X size={20} /></button>}
      <div className="detail-company">
        <span className="company-avatar large" style={{ background: job.color }} aria-hidden="true">{job.initials}</span>
        <span>{job.company}</span>
      </div>
      <h2>{t(job.title)}</h2>
      <p className="detail-location"><MapPin size={18} /> {job.locality}, {job.location} · {t(job.mode)}</p>
      <div className="detail-pay">
        <strong>₹{job.salaryMin.toLocaleString('en-IN')}–₹{job.salaryMax.toLocaleString('en-IN')}</strong>
        <span>{t('per month')}</span>
      </div>
      <div className="detail-actions">
        <button className="button primary" onClick={() => onApply(job)} disabled={applied}>
          {applied ? <><CheckCircle size={20} weight="fill" /> {t('Applied')}</> : <>{t('Apply now')} <ArrowRight size={19} /></>}
        </button>
        <button className={`button secondary ${saved ? 'is-saved' : ''}`} onClick={() => onSave(job.id)}>
          <BookmarkSimple size={19} weight={saved ? 'fill' : 'regular'} /> {saved ? t('Saved') : t('Save')}
        </button>
      </div>
      <div className="trust-note"><ShieldCheck size={20} weight="duotone" /><span>{t('Never pay money to apply. KaamKaaj listings show role details before you share your profile.')}</span></div>
      <section className="detail-section">
        <h3>{t('About this job')}</h3>
        <p>{t(job.description)}</p>
      </section>
      <section className="detail-section">
        <h3>{t('What you will need')}</h3>
        <div className="skill-list">{job.skills.map((skill) => <span key={skill}>{t(skill)}</span>)}</div>
      </section>
      <dl className="job-facts">
        <div><dt>{t('Experience')}</dt><dd>{t(job.experience)}</dd></div>
        <div><dt>{t('Work type')}</dt><dd>{t(job.type)}</dd></div>
        <div><dt>{t('Work mode')}</dt><dd>{t(job.mode)}</dd></div>
      </dl>
    </aside>
  );
}
