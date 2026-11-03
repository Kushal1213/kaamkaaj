import { BookmarkSimple, Buildings, CheckCircle, Clock, MapPin, SealCheck } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';
import type { Job } from '../types';

type Props = {
  job: Job;
  saved: boolean;
  selected?: boolean;
  onSave: (id: string) => void;
  onOpen: (job: Job) => void;
};

const money = (value: number) => `₹${Math.round(value / 1000)}k`;

export function JobCard({ job, saved, selected, onSave, onOpen }: Props) {
  const { t } = useLanguage();
  return (
    <article className={`job-card ${selected ? 'is-selected' : ''}`}>
      <button className="card-main" onClick={() => onOpen(job)} aria-label={`${t('View')} ${t(job.title)} · ${job.company}`}>
        <span className="company-avatar" style={{ background: job.color }} aria-hidden="true">{job.initials}</span>
        <span className="job-card-content">
          <span className="job-topline">
            <span className="job-title">{t(job.title)}</span>
            {job.urgent && <span className="urgent">{t('Hiring now')}</span>}
          </span>
          <span className="company-line">
            <Buildings size={16} weight="duotone" /> {job.company}
            {job.verified && <SealCheck size={16} weight="fill" aria-label="Verified employer" />}
          </span>
          <span className="job-meta">
            <span><MapPin size={16} /> {job.locality}, {job.location}</span>
            <span><Clock size={16} /> {t(job.type)}</span>
          </span>
          <span className="salary-row">
            <strong>{money(job.salaryMin)}–{money(job.salaryMax)}</strong>
            <span>{t('per month')}</span>
            <span className="posted">{t(job.posted)}</span>
          </span>
        </span>
      </button>
      <button
        className={`save-button ${saved ? 'is-saved' : ''}`}
        onClick={() => onSave(job.id)}
        aria-label={saved ? `${t('Remove from saved jobs')}: ${t(job.title)}` : `${t('Save')}: ${t(job.title)}`}
      >
        {saved ? <CheckCircle size={21} weight="fill" /> : <BookmarkSimple size={21} />}
      </button>
    </article>
  );
}
